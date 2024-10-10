import '../styles/globals.css'
import Head from 'next/head';

export const metadata = {
  title: "Mother Tongue School",
  description: "Mother Tongue School - Школа іноземних мов!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
