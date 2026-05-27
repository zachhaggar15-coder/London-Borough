import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where in London — neighbourhood discovery",
  description:
    "Find London neighbourhoods that fit your commute, salary, and lifestyle. Decide where to live before you start hunting for flats.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
