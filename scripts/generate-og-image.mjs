import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #1B3A2D;
    font-family: Georgia, "Times New Roman", serif;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative;
  }
  .bg-grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(245,242,236,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .glow {
    position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
    width: 900px; height: 500px;
    background: radial-gradient(ellipse at center top, rgba(196,146,42,0.18), transparent 65%);
    filter: blur(32px);
  }
  .container { position: relative; z-index: 1; text-align: center; padding: 60px 80px; }
  .eyebrow {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase;
    color: #C4922A; margin-bottom: 28px; font-weight: 700;
  }
  h1 {
    font-size: 80px; font-weight: 700; line-height: 1.04;
    color: #F5F2EC; margin-bottom: 28px;
  }
  h1 span { color: #C4922A; }
  .sub {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px; color: rgba(245,242,236,0.7);
    font-weight: 400; line-height: 1.55;
    max-width: 680px; margin: 0 auto 52px;
  }
  .logo-row {
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .logo-mark {
    width: 40px; height: 40px; border-radius: 8px; background: #C4922A;
    display: flex; align-items: center; justify-content: center;
    font-family: Georgia, serif; font-weight: 700; font-size: 22px; color: #1B3A2D;
  }
  .logo-text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px; font-weight: 700; color: #F5F2EC; letter-spacing: 0.02em;
  }
  .logo-text span { color: #C4922A; }
</style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="glow"></div>
  <div class="container">
    <div class="eyebrow">The AI GTM Operating System</div>
    <h1>The AI Brain Behind<br><span>Your GTM OS.</span></h1>
    <p class="sub">One autonomous system for pipeline, conversion, and retention.<br>Built for B2B revenue teams at $500K–$5M ARR.</p>
    <div class="logo-row">
      <div class="logo-mark">M</div>
      <div class="logo-text">Magnivo<span>.ai</span></div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: "domcontentloaded" });
const outPath = join(__dirname, "../public/og-image.png");
await page.screenshot({ path: outPath, type: "png" });
await browser.close();

console.log(`✓ og-image.png written to public/og-image.png`);
