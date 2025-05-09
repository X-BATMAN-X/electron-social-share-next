import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Clave secreta para proteger el endpoint (puedes configurarla en las variables de entorno)
const CLEANUP_SECRET = process.env.CLEANUP_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    // Verificar la clave secreta
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${CLEANUP_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Iniciando limpieza de filas antiguas...');

    // Eliminar filas más antiguas de 30 días
    const { data, error } = await supabase
      .from('shares')
      .delete()
      .lt('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      console.error('Error al eliminar filas antiguas:', error.message);
      return NextResponse.json({ error: 'Failed to cleanup shares', details: error.message }, { status: 500 });
    }

    // Verificar si data es null o un array vacío
    const deletedRows = data ? data.length : 0;
    console.log('Filas eliminadas:', deletedRows);

    return NextResponse.json({ message: 'Cleanup successful', deletedRows }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/cleanup:', error.message);
    return NextResponse.json({ error: 'Failed to process cleanup request', details: error.message }, { status: 500 });
  }
}