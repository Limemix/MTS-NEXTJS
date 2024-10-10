import '../styles/globals.css'

export const metadata = {
  title: "Mother Tongue School",
  description: "Mother Tongue School - Школа іноземних мов!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body>{children}</body>
    </html>
  );
}
