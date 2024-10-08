import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

// Import the Orbitron font with specific weights
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={orbitron.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
