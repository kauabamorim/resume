import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kauã Berman Amorim — Full Stack Developer",
  description:
    "Full Stack Developer especializado em TypeScript, Node.js, React e Next.js. Estudante de ADS na Unisociesc, Blumenau - SC.",
  keywords: ["developer", "typescript", "nodejs", "react", "nextjs", "portfolio"],
  authors: [{ name: "Kauã Berman Amorim" }],
  openGraph: {
    title: "Kauã Berman Amorim — Full Stack Developer",
    description: "Full Stack Developer | TypeScript · Node.js · React · Next.js",
    type: "website",
    url: "https://kauabamorim.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kauã Berman Amorim",
    description: "Full Stack Developer | TypeScript · Node.js · React",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-bg text-text font-body antialiased">{children}</body>
    </html>
  );
}
