import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import { redirect } from 'next/navigation';

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Generar metadatos dinámicos para la página
export async function generateMetadata({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('shares')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return {
      title: 'Enlace no encontrado',
      description: 'No se pudo encontrar el enlace compartido.',
    };
  }

  const shareData = data;

  return {
    title: shareData.title,
    description: shareData.description,
    openGraph: {
      title: shareData.title,
      description: shareData.description,
      url: `https://comparte.vercel.app/share/${shareData.id}`,
      type: 'website',
      images: [
        {
          url: shareData.image_url,
          width: 1200,
          height: 630,
          alt: shareData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareData.title,
      description: shareData.description,
      images: [shareData.image_url],
    },
  };
}

export default async function SharePage({ params, searchParams }) {
  const { id } = params;

  // Obtener datos de Supabase
  const { data, error } = await supabase
    .from('shares')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  const shareData = data;

  // Asegurarnos de que la URL de destino tenga el formato correcto
  let destinationUrl = shareData.url;
  if (!destinationUrl.startsWith('http://') && !destinationUrl.startsWith('https://')) {
    destinationUrl = `https://${destinationUrl}`; // Añadir https:// si no está presente
  }

  // Detectar si la solicitud proviene de un bot de redes sociales
  const userAgent = (typeof window !== 'undefined' ? navigator.userAgent : '') || '';
  const isSocialMediaBot = /facebookexternalhit|twitterbot|linkedinbot/i.test(userAgent);

  // Si es un bot, devolver los metadatos sin redirigir
  if (isSocialMediaBot) {
    return (
      <>
        <Head>
          <title>{shareData.title}</title>
          <meta name="description" content={shareData.description} />
          <meta property="og:title" content={shareData.title} />
          <meta property="og:description" content={shareData.description} />
          <meta property="og:image" content={shareData.image_url} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content={`https://comparte.vercel.app/share/${shareData.id}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={shareData.title} />
          <meta name="twitter:description" content={shareData.description} />
          <meta name="twitter:image" content={shareData.image_url} />
        </Head>
        <div style={{ display: 'none' }}>
          Redirigiendo a {destinationUrl}...
        </div>
      </>
    );
  }

  // Si no es un bot, redirigir inmediatamente
  redirect(destinationUrl);
}