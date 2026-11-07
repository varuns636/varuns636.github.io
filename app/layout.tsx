import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { palette } from "@/tailwind.config";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Overlay } from "@/components/Overlay";
import { StatusBar } from "@/components/StatusBar";
import { SkipLink } from "@/components/SkipLink";
import { Interactions } from "@/components/Interactions";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Varun / Portfolio",
  description:
    "Varun, CSE student at Acharya Institute of Technology. AI voice agents, RAG systems and local-LLM apps.",
};

export const viewport: Viewport = {
  themeColor: palette.ink,
  colorScheme: "dark",
};

/*
 * Runs before first paint. Flags html[data-motion="on"] so [data-reveal]
 * elements start hidden for GSAP. Skipped under reduced motion. If JS never
 * hydrates, the 4s fallback removes the flag so content is never stuck hidden.
 */
const motionFlag = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: no-preference)').matches){d.dataset.motion='on';setTimeout(function(){delete d.dataset.motion},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body className="bg-ink pb-statusbar font-mono text-body text-paper">
        <SkipLink />
        <SmoothScroll />
        <StatusBar />
        {children}
        <Overlay />
        <Cursor />
        <Interactions />
      </body>
    </html>
  );
}
