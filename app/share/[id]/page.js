import { kv } from '@vercel/kv';
import Image from 'next/image'; // Importar Image de next/image

export async function generateMetadata({ params }) {
  const id = params.id;
  const shareData = await kv.get(`share:${id}`);

  if (!shareData) {
    return {
      title: 'Enlace no encontrado',
      description: 'El enlace que intentas acceder no existe o ha expirado.',
    };
  }

  return {
    title: shareData.title,
    description: shareData.description,
    openGraph: {
      title: shareData.title,
      description: shareData.description,
      images: [
        {
          url: shareData.imageUrl,
          width: 1200,
          height: 630,
          alt: shareData.title,
        },
      ],
    },
  };
}

export default async function SharePage({ params }) {
  const id = params.id;
  const shareData = await kv.get(`share:${id}`);

  if (!shareData) {
    return (
      <div className="error-page">
        <h1>Enlace no encontrado</h1>
        <p>El enlace que intentas acceder no existe o ha expirado.</p>
      </div>
    );
  }

  return (
    <div className="share-page">
      <a href={shareData.url} target="_blank" rel="noopener noreferrer">
        <Image
          src={shareData.imageUrl}
          alt={shareData.title}
          width={1200} // Ajusta según el tamaño esperado para Open Graph
          height={630} // Ajusta según el tamaño esperado para Open Graph
        />
      </a>
      <h1>{shareData.title}</h1>
      <p>{shareData.description}</p>
    </div>
  );
}