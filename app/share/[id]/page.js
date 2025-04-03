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

export async function generateMetadata({ params, request }) {
  try {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading this page.',
    };
  }
}

export default async function SharePage({ params }) {
  try {
    const { id } = params;

    // Leer los datos de Redis
    const data = await kv.get(`share:${id}`);
    if (!data) {
      console.log(`Data not found for ID: ${id}`);
      notFound();
    }

    // Validar la URL de destino
    if (!data.url || !data.url.startsWith('http')) {
      console.error(`Invalid URL for ID ${id}: ${data.url}`);
      throw new Error('Invalid destination URL');
    }

    // Obtener el User-Agent de los encabezados
    const userAgent = (await import('next/headers')).headers().get('user-agent') || '';

    // Si la solicitud proviene de un bot de redes sociales, renderizar la página
    if (isBot(userAgent)) {
      console.log(`Bot detected for ID ${id}: ${userAgent}`);
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

    // Si la solicitud proviene de un usuario real, redirigir directamente a la URL de destino
    console.log(`Redirecting to ${data.url} for ID ${id}`);
    redirect(data.url);
  } catch (error) {
    console.error('Error in SharePage:', error);
    return (
      <div className="container">
        <h1>Error</h1>
        <p>An error occurred while loading this page. Please try again later.</p>
      </div>
    );
  }
}