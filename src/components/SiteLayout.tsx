import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";
import { CustomCursor } from "./CustomCursor";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative overflow-x-clip">
        <CustomCursor />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
      <a
        href="https://wa.me/message/xyz"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex max-w-[calc(100vw-2rem)] items-center justify-center gap-2 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium hidden sm:block">Chat with us on WhatsApp</span>
      </a>
    </>
  );
}
