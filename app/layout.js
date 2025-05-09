'use client'; // Indica que este componente se ejecuta en el cliente

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Comparte tu enlace con una imagen',
  description: 'Sube una imagen y compártelo en redes sociales con una vista previa única.',
  openGraph: {
    title: 'Comparte tu enlace con una imagen',
    description: 'Sube una imagen y compártelo en redes sociales con una vista previa única.',
    url: 'https://comparte.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630?text=Comparte+tu+enlace',
        width: 1200,
        height: 630,
        alt: 'Comparte tu enlace con una imagen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparte tu enlace con una imagen',
    description: 'Sube una imagen y compártelo en redes sociales con una vista previa única.',
    images: ['https://via.placeholder.com/1200x630?text=Comparte+tu+enlace'],
  },
};

export default function RootLayout({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
          })
          .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }, []);

  return (
    <html lang="es" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" />
        <meta name="monetag" content="de9eb78f0da9aa39257142df32b3370d" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}