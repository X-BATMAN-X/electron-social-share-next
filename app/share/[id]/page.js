import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Image from 'next/image';

// Iniciar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { id } = params;

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

  return {
    props: {
      shareData: data,
    },
  };
}

export default function SharePage({ shareData }) {
  // Construir la URL actual de la página
  const currentUrl = `https://compartir-datos.vercel.app/share/${shareData.id}`; // Reemplaza con tu dominio real

  if (typeof window !== 'undefined') {
    window.location.href = shareData.url;
  }

  return (
    <>
      <Head>
        <title>{shareData.title}</title>
        <meta name="description" content={shareData.description} />
        <meta property="og:title" content={shareData.title} />
        <meta property="og:description" content={shareData.description} />
        <meta property="og:image" content={shareData.image_url} />
        <meta property="og:url" content={currentUrl} /> {/* Usar la URL actual */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareData.title} />
        <meta name="twitter:description" content={shareData.description} />
        <meta name="twitter:image" content={shareData.image_url} />
      </Head>

      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>{shareData.title}</h1>
        <p>{shareData.description}</p>
        <Image
          src={shareData.image_url}
          alt={shareData.title}
          width={500}
          height={500}
          style={{ width: 'auto', height: 'auto' }}
        />
        <p>
          Redirigiendo a <a href={shareData.url}>{shareData.url}</a>...
        </p>
      </div>
    </>
  );
}