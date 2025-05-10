import './globals.css';
import { Inter } from 'next/font/google';

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
  return (
    <html lang="es" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" />
        <meta name="monetag" content="de9eb78f0da9aa39257142df32b3370d" />
      </head>
      <body>
        {children}
        {/* Script para Vignette Banner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',9314133,document.createElement('script'));`,
          }}
        />
        {/* Script para In-Page Push */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9316819,document.createElement('script'));`,
          }}
        />
        {/* Enlace discreto para Direct Link */}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <a
            href="https://sawutser.top/4/9316829"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Descubre más ofertas
          </a>
        </div>
      </body>
    </html>
  );
}