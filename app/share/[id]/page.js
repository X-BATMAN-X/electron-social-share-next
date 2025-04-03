import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';

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

export default async function SharePage({ params }) {
  const { id } = params;
  const data = await kv.get(`share:${id}`);

  if (!data) {
    notFound();
  }

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