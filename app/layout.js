import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // Importar Script de next/script

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Comparte tu enlace con una imagen',
  description: 'Sube una imagen y compártelo en redes sociales con una vista previa única.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" />
        {/* Añadir el script de AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6479199056016392"crossorigin="anonymous">
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}