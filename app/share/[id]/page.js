import { kv } from '@vercel/kv';
import { notFound, redirect } from 'next/navigation';

// Lista de User-Agents de bots de redes sociales
const socialMediaBots = [
  'facebookexternalhit', // Facebook
  'Twitterbot', // Twitter
  'LinkedInBot', // LinkedIn
  'WhatsApp', // WhatsApp
  'Slackbot', // Slack
  'Googlebot', // Google (por si acaso)
];

// Función para verificar si la solicitud proviene de un bot
function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return socialMediaBots.some((bot) => ua.includes(bot.toLowerCase()));
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const data = await kv.get(`share:${id}`);

  if (!data) {
    return {
      title: 'Not Found',
      description: 'This share link does not exist.',
    };
  }

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      url: data.url,
    },
  };
}

export default async function SharePage({ params, searchParams }, { request }) {
  const { id } = params;
  const data = await kv.get(`share:${id}`);

  if (!data) {
    notFound();
  }

  // Obtener el User-Agent de la solicitud
  const userAgent = request?.headers?.get('user-agent') || '';

  // Si la solicitud proviene de un bot de redes sociales, renderizar la página para que pueda leer los metadatos
  if (isBot(userAgent)) {
    return (
      <div className="container">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <img
            src={data.imageUrl}
            alt={data.title}
            style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
          />
        </a>
      </div>
    );
  }

  // Si la solicitud proviene de un usuario real (navegador), redirigir directamente a la URL de destino
  redirect(data.url);
}