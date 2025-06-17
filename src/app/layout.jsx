import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Promptopia",
  description: "A prompt finding app...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
