"use client";
import localFont from "next/font/local";
import "./globals.css";
import { createTheme, MantineProvider } from "@repo/ui";
import { usePathname } from "next/navigation";
import "@mantine/core/styles.css";
import HeaderMain from "./components/header/header-main";
const theme = createTheme({});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          {/* <HeaderMain /> */}
          {!isAdminRoute && <HeaderMain />}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
