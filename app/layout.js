import './globals.css';

// Carga de la fuente Inter desde Google Fonts (ya está incluida en el <head>)
export const metadata = {
  title: 'Comparte tu enlace con una imagen',
  description: 'Sube una imagen y compártelo en redes sociales con una vista previa única.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> {/* Opcional, si tienes este archivo */}
      </head>
      <body>{children}</body>
    </html>
  );
}