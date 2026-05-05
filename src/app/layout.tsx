import type { Metadata } from "next";
import "./globals.css";

// You can customize this metadata—it's what shows up on Google and browser tabs!
export const metadata: Metadata = {
  title: "Bright Sefah | Intelligent Systems",
  description: "Architecting the bridge between embedded hardware, cloud infrastructure, and autonomous robotics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We removed the Google Font variables and set a pure black background */}
      <body className="antialiased bg-black text-white selection:bg-green-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}