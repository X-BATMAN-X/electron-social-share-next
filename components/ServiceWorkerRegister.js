'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  // Desactivado temporalmente porque no hay sw.js
  /*
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
          })
          .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }, []);
  */

  return null;
}