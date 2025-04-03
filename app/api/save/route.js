import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(request) {
  try {
    const { title, description, imageUrl, url } = await request.json();

    if (!title || !description || !imageUrl || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generar un ID único para la tarjeta
    const id = nanoid();

    // Guardar los datos en Vercel KV (Upstash Redis) con un TTL de 24 horas
    await kv.set(`share:${id}`, {
      title,
      description,
      imageUrl,
      url,
      createdAt: Date.now(),
    }, { ex: 86400 }); // Expira en 24 horas (86400 segundos)

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error('Error saving share data:', error);
    return NextResponse.json({ error: 'Failed to save share data' }, { status: 500 });
  }
}