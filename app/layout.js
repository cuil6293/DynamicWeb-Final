import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { AuthUserProvider } from "./context/AuthUserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Fish for Love",
  description: "Catch a fish's heart and earn the right to post them!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthUserProvider>
          <main>{children}</main>
        </AuthUserProvider>
      </body>
    </html>
  );
}
