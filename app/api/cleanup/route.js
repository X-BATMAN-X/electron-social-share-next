import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Clave secreta para proteger el endpoint
const CLEANUP_SECRET = process.env.CLEANUP_SECRET;

export async function POST(request) {
  try {
    // Verificar la clave secreta
    const authHeader = request.headers.get('authorization');
    console.log('Authorization Header recibido:', authHeader);

    if (!CLEANUP_SECRET) {
      console.error('CLEANUP_SECRET no está configurado en las variables de entorno');
      return NextResponse.json({ error: 'Server configuration error: CLEANUP_SECRET not set' }, { status: 500 });
    }

    if (!authHeader) {
      console.log('No se proporcionó el header Authorization');
      return NextResponse.json({ error: 'Unauthorized: Missing Authorization header' }, { status: 401 });
    }

    if (authHeader !== `Bearer ${CLEANUP_SECRET}`) {
      console.log('Clave secreta incorrecta. Esperado:', `Bearer ${CLEANUP_SECRET}`, 'Recibido:', authHeader);
      return NextResponse.json({ error: 'Unauthorized: Invalid secret key' }, { status: 401 });
    }

    console.log('Iniciando limpieza de filas antiguas...');

    // Eliminar filas más antiguas de 30 días
    const { data, error } = await supabase
      .from('shares')
      .delete()
      .lt('created_at', new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString())

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