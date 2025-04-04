import './globals.css';

export const metadata = {
  title: 'Comparte tu enlace con una imagen',
  description: 'Sube una imagen y compártelo con una vista previa única.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /><link rel="icon" href="/favicon.ico?v=3" /></head>
      <body>{children}</body>
    </html>
  );
}