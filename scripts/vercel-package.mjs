/**
 * Post-build script: packages TanStack Start's Vite output into
 * Vercel Build Output API format (.vercel/output/).
 *
 * Run via: npm run vercel-build
 */

import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

console.log('[vercel] Packaging for Vercel Build Output API...')

// Clean previous output
const outDir = join(root, '.vercel/output')
if (existsSync(outDir)) rmSync(outDir, { recursive: true })

const funcDir = join(outDir, 'functions/index.func')
const staticDir = join(outDir, 'static')

mkdirSync(funcDir, { recursive: true })
mkdirSync(staticDir, { recursive: true })

// 1. Bundle dist/server/server.js + all node_modules into a single ESM file
console.log('[vercel] Bundling server...')

await esbuild.build({
  entryPoints: [join(root, 'dist/server/server.js')],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: join(funcDir, 'bundle.mjs'),
  // Inject require() shim so CJS packages (react-dom, etc.) can call require('util') etc.
  banner: {
    js: `import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);`,
  },
  external: [
    'node:*',
    'async_hooks',
    'crypto',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'stream',
    'tty',
    'url',
    'util',
    'zlib',
    'perf_hooks',
    'worker_threads',
    'events',
    'buffer',
    'string_decoder',
    'querystring',
    'diagnostics_channel',
  ],
  logLevel: 'warning',
})

// 2. Write the Vercel function entry point
// Adapts TanStack Start's Web Fetch API handler to Vercel's Node.js format
writeFileSync(
  join(funcDir, 'index.mjs'),
  `import server from './bundle.mjs'

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] ?? 'https'
  const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost'
  const url = new URL(req.url, \`\${protocol}://\${host}\`)

  const headers = new Headers()
  for (const [key, val] of Object.entries(req.headers)) {
    if (val != null) headers.set(key, Array.isArray(val) ? val.join(',') : String(val))
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  let body
  if (hasBody) {
    const chunks = []
    await new Promise((resolve, reject) => {
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', resolve)
      req.on('error', reject)
    })
    if (chunks.length > 0) body = Buffer.concat(chunks)
  }

  const request = new Request(url, { method: req.method, headers, body })
  const response = await server.fetch(request)

  res.statusCode = response.status
  for (const [key, val] of response.headers.entries()) {
    res.setHeader(key, val)
  }

  if (response.body) {
    const reader = response.body.getReader()
    const pump = async () => {
      const { done, value } = await reader.read()
      if (done) return res.end()
      res.write(value)
      return pump()
    }
    await pump()
  } else {
    res.end()
  }
}
`
)

// 3. Write Vercel function config
writeFileSync(
  join(funcDir, '.vc-config.json'),
  JSON.stringify(
    {
      runtime: 'nodejs22.x',
      handler: 'index.mjs',
      launcherType: 'Nodejs',
      shouldAddHelpers: false,
    },
    null,
    2
  )
)

// 4. Write Vercel routing config
writeFileSync(
  join(outDir, 'config.json'),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Canonicalize host: www.magnivo.ai -> magnivo.ai (permanent, 308).
        {
          src: '/(.*)',
          has: [{ type: 'host', value: 'www.magnivo.ai' }],
          headers: { Location: 'https://magnivo.ai/$1' },
          status: 308,
        },
        // Strip trailing slash (permanent, 308), e.g. /platform/ -> /platform.
        // Excludes the root "/" since it has no path segment to trim.
        {
          src: '^/(.+)/$',
          headers: { Location: '/$1' },
          status: 308,
        },
        { handle: 'filesystem' },
        { src: '/(.*)', dest: '/index' },
      ],
    },
    null,
    2
  )
)

// 5. Copy static client assets
console.log('[vercel] Copying static assets...')
cpSync(join(root, 'dist/client'), staticDir, { recursive: true })

console.log('[vercel] ✓ Done. Output at .vercel/output/')
