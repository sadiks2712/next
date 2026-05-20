import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Sadik Shaikh — Full Stack | Data | Android Developer",
  description:
    "Freelance Full Stack, Data & Android Developer from Pune, India. I build scalable web apps, native Android apps, and data-driven solutions for businesses worldwide.",
  keywords: [
    "Sadik Shaikh",
    "Full Stack Developer",
    "Android Developer",
    "Data Analytics",
    "Freelance Developer",
    "MERN Stack",
    "Next.js",
    "Pune India",
  ],
  authors: [{ name: "Sadik Shaikh", url: "https://github.com/sadiks2712" }],
  openGraph: {
    title: "Sadik Shaikh — Full Stack | Data | Android Developer",
    description:
      "Freelance developer from Pune, India. Scalable web apps, Android apps & data solutions.",
    url: "https://sadik-portfolio.vercel.app",
    siteName: "Sadik Shaikh Portfolio",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadik Shaikh — Full Stack | Data | Android Developer",
    description: "Freelance developer from Pune, India.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: "smooth" }} className={`${dmSans.variable} ${sora.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
