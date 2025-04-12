import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image'); // Coincide con la clave 'image' del frontend

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convertir la imagen a un buffer y luego a base64 para subirla a Imgur
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imgurFormData = new FormData();
    imgurFormData.append('image', buffer.toString('base64'));

    // Hacer la solicitud a la API de Imgur
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
      body: imgurFormData,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error('Error al subir la imagen a Imgur');
    }

    return NextResponse.json({ url: data.data.link }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}