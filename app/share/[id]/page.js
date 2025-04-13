import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function SharePage({ params }) {
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

  // Construir la URL actual de la página (para los metadatos)
  const currentUrl = `https://comparte.vercel.app/share/${shareData.id}`; // Reemplaza con tu dominio real

  // Detectar si la solicitud proviene de un bot de redes sociales (como Facebook)
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
  const isSocialMediaBot = /facebookexternalhit|twitterbot|linkedinbot/i.test(userAgent);

  // Si es un bot, no redirigir y permitir que scrapee los metadatos
  if (!isSocialMediaBot && typeof window !== 'undefined') {
    window.location.href = destinationUrl;
  }

  // Proporcionar metadatos para la vista previa (Open Graph y Twitter Cards)
  return (
    <>
      <Head>
        <title>{shareData.title}</title>
        <meta name="description" content={shareData.description} />
        <meta property="og:title" content={shareData.title} />
        <meta property="og:description" content={shareData.description} />
        <meta property="og:image" content={shareData.image_url} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareData.title} />
        <meta name="twitter:description" content={shareData.description} />
        <meta name="twitter:image" content={shareData.image_url} />
        {/* Redirigir como respaldo, pero con un pequeño retraso para permitir el scraping */}
        {!isSocialMediaBot && (
          <meta httpEquiv="refresh" content={`2;url=${destinationUrl}`} />
        )}
      </Head>
      {/* No renderizamos contenido visible, pero mantenemos un mensaje por si la redirección falla */}
      <div style={{ display: 'none' }}>
        Redirigiendo a {destinationUrl}...
      </div>
    </>
  );
}