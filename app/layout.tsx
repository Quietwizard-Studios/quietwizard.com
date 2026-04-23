import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cinzel,
  EB_Garamond,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuietWizard Studios",
  description:
    "We build the AI that others only talk about. Custom agents. Real automation. Strategy that ships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${ebGaramond.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
