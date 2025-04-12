import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Verificar variables de entorno
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Defined' : 'Not defined');

// Inicializar el cliente de Supabase
let supabase;
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  console.log('Cliente de Supabase inicializado correctamente');
} catch (error) {
  console.error('Error al inicializar el cliente de Supabase:', error);
  throw error;
}

export async function POST(request) {
  try {
    console.log('Recibiendo solicitud en /api/share');

    const { imageUrl, title, description, url } = await request.json();
    console.log('Datos recibidos:', { imageUrl, title, description, url });

    if (!imageUrl || !title || !description || !url) {
      console.log('Faltan campos requeridos');
      return NextResponse.json(
        { error: 'Todos los campos (imagen, título, descripción, URL) son requeridos.' },
        { status: 400 }
      );
    }

    try {
      new URL(imageUrl);
      console.log('URL de imagen válida:', imageUrl);
    } catch {
      console.log('URL de imagen no válida:', imageUrl);
      return NextResponse.json(
        { error: 'La URL de la imagen no es válida.' },
        { status: 400 }
      );
    }

    const maxTextLength = 1000;
    if (
      title.length > maxTextLength ||
      description.length > maxTextLength ||
      url.length > maxTextLength
    ) {
      console.log('Texto demasiado largo:', { title, description, url });
      return NextResponse.json(
        { error: 'El título, la descripción o la URL son demasiado largos.' },
        { status: 400 }
      );
    }

    console.log('Guardando datos en Supabase...');
    const { data, error } = await supabase
      .from('shares')
      .insert([{ title, description, url, image_url: imageUrl }])
      .select();

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return NextResponse.json(
        { error: 'Hubo un error al guardar los datos. Por favor, intenta de nuevo.' },
        { status: 500 }
      );
    }

    console.log('Datos guardados en Supabase:', data);

    const shareId = data[0].id;
    const shareUrl = `https://${request.headers.get('host')}/share/${shareId}`;
    console.log('Enlace compartido generado:', shareUrl);

    return NextResponse.json({ shareUrl }, { status: 200 });
  } catch (error) {
    console.error('Error en la API /api/share:', error);
    return NextResponse.json(
      { error: 'Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del enlace compartido.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('shares')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error al recuperar datos de Supabase:', error);
      return NextResponse.json(
        { error: 'Hubo un error al recuperar los datos. Por favor, intenta de nuevo.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: 'Enlace compartido no encontrado.' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error en la API /api/share GET:', error);
    return NextResponse.json(
      { error: 'Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}