import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      console.log('No se proporcionó una imagen');
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validar el tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
      console.log('Formato no soportado:', imageFile.type);
      return NextResponse.json(
        { error: 'Unsupported file format. Please use JPEG, PNG, or WebP.' },
        { status: 400 }
      );
    }

    // Validar el tamaño de la imagen (máximo 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      console.log('Imagen demasiado grande:', imageFile.size);
      return NextResponse.json(
        { error: 'Image too large. Please use an image smaller than 5MB.' },
        { status: 400 }
      );
    }

    // Convertir la imagen a un buffer y subir a Imgur
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imgurFormData = new FormData();
    imgurFormData.append('image', buffer.toString('base64'));

    console.log('Subiendo imagen a Imgur...');
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
      body: imgurFormData,
    });

    const data = await response.json();
    if (!data.success) {
      console.error('Error al subir la imagen a Imgur:', data);
      throw new Error('Error uploading image to Imgur');
    }

    console.log('Imagen subida a Imgur:', data.data.link);
    return NextResponse.json({ url: data.data.link }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    return NextResponse.json({ error: 'Failed to upload image', details: error.message }, { status: 500 });
  }
}