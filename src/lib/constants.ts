const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
if (!formspreeId) {
  console.warn("[magnivo] VITE_FORMSPREE_ID is not set. Forms will not submit.");
}
export const FORMSPREE_ENDPOINT = formspreeId ? `https://formspree.io/f/${formspreeId}` : "";
