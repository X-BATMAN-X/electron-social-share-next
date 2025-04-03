import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const socialMediaBots = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'Googlebot',
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return socialMediaBots.some((bot) => ua.includes(bot.toLowerCase()));
}

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Solo aplicar el middleware a las rutas /share/[id]
  if (path.startsWith('/share/')) {
    const id = path.split('/')[2]; // Extraer el ID de la URL

    try {
      const data = await kv.get(`share:${id}`);

      if (!data) {
        return NextResponse.next(); // Dejar que la página maneje el 404
      }

      const userAgent = request.headers.get('user-agent') || '';

      // Si es un bot, permitir que la página se renderice
      if (isBot(userAgent)) {
        return NextResponse.next();
      }

      // Si es un usuario real, redirigir directamente a la URL de destino
      return NextResponse.redirect(data.url);
    } catch (error) {
      console.error('Error in middleware:', error);
      return NextResponse.next(); // Dejar que la página maneje el error
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/share/:path*',
};