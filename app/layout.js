import "./globals.css";
import ClientProviders from "./ClientProviders";
import Header from "@/components/Header";

export const metadata = {
  title: "Hatter",
  description: "We hate everyone!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}