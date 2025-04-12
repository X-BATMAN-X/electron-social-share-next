import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { imageUrl, title, description, url } = await request.json();

    if (!imageUrl || !title || !description || !url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validar y formatear la URL de destino
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validar que la URL sea válida
    try {
      new URL(formattedUrl);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Guardar los datos en Supabase
    const { data, error } = await supabase
      .from('shares')
      .insert([{ image_url: imageUrl, title, description, url: formattedUrl }])
      .select()
      .single();

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to save share data' },
        { status: 500 }
      );
    }

    const shareId = data.id;
    const shareUrl = `https://comparte.vercel.app/share/${shareId}`; // URL intermedia para los metadatos

    return NextResponse.json({ shareUrl }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/share:', error);
    return NextResponse.json(
      { error: 'Failed to process share request' },
      { status: 500 }
    );
  }
}