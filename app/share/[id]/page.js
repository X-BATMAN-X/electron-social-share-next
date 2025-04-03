import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
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
    const data = await kv.get(`share:${id}`);

    if (!data) {
      notFound();
    }

    return (
      <div className="container share-page">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <img src={data.imageUrl} alt={data.title} />
        </a>
      </div>
    );
  } catch (error) {
    console.error('Error in SharePage:', error);
    return (
      <div className="container error-page">
        <h1>Error</h1>
        <p>An error occurred while loading this page. Please try again later.</p>
      </div>
    );
  }
}