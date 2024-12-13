import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { AuthUserProvider } from "./context/AuthUserContext";

const geistPrompt = localFont({
  src: "./fonts/Prompt-Black.ttf",
  variable: "--font-prompt-black",
  weight: "100 900",
});
const geistSour = localFont({
  src: "./fonts/SourGummy-VariableFont_wdth,wght.ttf",
  variable: "--font-sour-gummy",
  weight: "100 900",
});

export const metadata = {
  title: "Fish for Love",
  description: "Catch a fish's heart and earn the right to post them!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistPrompt.variable} ${geistSour.variable}`}>
        <AuthUserProvider>
          <main>{children}</main>
        </AuthUserProvider>
      </body>
    </html>
  );
}
