'use client';

import { useState } from 'react';
import Image from 'next/image';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar el tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato no soportado. Por favor, usa JPEG, PNG o WebP.');
      return;
    }

    // Validar el tamaño de la imagen
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Por favor, selecciona una imagen de menos de 5 MB.');
      return;
    }

    setImage(URL.createObjectURL(file));
    setIsLoading(true);

    console.log('Subiendo imagen:', file.name, file.size, 'bytes');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Respuesta de /api/upload:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }

      const data = await response.json();
      console.log('Datos recibidos de /api/upload:', data);

      if (!data.url) {
        throw new Error('No se recibió la URL de la imagen desde Imgur');
      }

      console.log('URL de Imgur recibida:', data.url);
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert(`Hubo un error al subir la imagen: ${error.message}`);
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const shareOnSocialMedia = (platform) => {
    console.log('Iniciando shareOnSocialMedia para:', platform);

    const missingFields = [];
    if (!imageUrl) missingFields.push('imagen');
    if (!title) missingFields.push('título');
    if (!description) missingFields.push('descripción');
    if (!url) missingFields.push('URL');

    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields);
      alert(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}.`);
      return;
    }

    console.log('Abriendo ventana emergente...');
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      console.log('No se pudo abrir la ventana emergente');
      alert('No se pudo abrir la ventana de la red social. Por favor, permite las ventanas emergentes.');
      return;
    }

    console.log('Ventana emergente abierta, mostrando mensaje de carga');
    newWindow.document.write('<h1>Cargando...</h1>');

    console.log('Enviando solicitud a /api/share:', { imageUrl, title, description, url });
    fetch('/api/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, title, description, url }),
    })
      .then((response) => {
        console.log('Respuesta de /api/share:', response.status, response.statusText);
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.details || errorData.error || 'Error al compartir');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos de /api/share:', data);
        const shareUrl = data.shareUrl;
        if (!shareUrl) throw new Error('No se recibió shareUrl');
        console.log('Enlace compartido recibido:', shareUrl);
        setShareLink(shareUrl);

        let formattedUrl = url.trim();
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
          formattedUrl = `https://${formattedUrl}`;
        }

        let socialMediaUrl;
        if (platform === 'facebook') socialMediaUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        else if (platform === 'twitter') socialMediaUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(formattedUrl)}&text=${encodeURIComponent(title)}`;
        else if (platform === 'linkedin') socialMediaUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(formattedUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        else if (platform === 'whatsapp') socialMediaUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${formattedUrl}`)}`;

        console.log('URL de red social generada:', socialMediaUrl);
        if (!socialMediaUrl) throw new Error('URL de red social inválida');
        newWindow.location.href = socialMediaUrl;
      })
      .catch((error) => {
        console.error('Error al compartir:', error.message);
        alert(`Error al compartir: ${error.message}. Intenta de nuevo.`);
        newWindow.close();
      });
  };

  return (
    <div className="container">
      <section className="intro">
        <h1>Comparte enlaces como un profesional</h1>
        <p>Promociona tu negocio y haz crecer tu base de clientes con marketing, redes sociales y herramientas SEO.</p>
      </section>

      <section className="hero-image">
        <Image
          src="/images/share1.webp"
          alt="Ejemplo de tarjeta social 1"
          width={800}
          height={400}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ borderRadius: '8px' }}
          priority
        />
      </section>

      <section className="intro-text">
        <p>Incrusta tu URL en una imagen y compártela en redes sociales con un solo clic.</p>
      </section>

      <section className="form-section">
        <h2>Crea una nueva publicación</h2>
        <input
          type="file"
          id="imageInput"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={isLoading}
        />
        <input
          type="text"
          id="title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          id="url"
          placeholder="URL de destino"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="preview">
          {image ? (
            <Image
              id="previewImage"
              src={image}
              alt="Vista previa"
              width={500}
              height={500}
              sizes="(max-width: 600px) 100vw, 500px"
              style={{ cursor: url ? 'pointer' : 'default', width: 'auto', height: 'auto' }}
              onClick={handleImageClick}
            />
          ) : (
            <p>Selecciona una imagen para ver la vista previa</p>
          )}
          {isLoading && <p>Subiendo imagen...</p>}
        </div>

        <div className="share-buttons">
          <button className="facebook-btn" onClick={() => shareOnSocialMedia('facebook')} disabled={isLoading}>
            Facebook
          </button>
          <button className="twitter-btn" onClick={() => shareOnSocialMedia('twitter')} disabled={isLoading}>
            Twitter
          </button>
          <button className="linkedin-btn" onClick={() => shareOnSocialMedia('linkedin')} disabled={isLoading}>
            LinkedIn
          </button>
          <button className="whatsapp-btn" onClick={() => shareOnSocialMedia('whatsapp')} disabled={isLoading}>
            WhatsApp
          </button>
        </div>

        {shareLink && (
          <div className="share-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
            <a href={shareLink} target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8', textDecoration: 'none' }}>
              {shareLink}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink).then(() => {
                  alert('Enlace copiado al portapapeles');
                }).catch((error) => {
                  console.error('Error al copiar el enlace:', error);
                  alert('Hubo un error al copiar el enlace. Por favor, copia manualmente.');
                });
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: '#1a73e8',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Copiar
            </button>
          </div>
        )}
      </section>

      <hr className="content-divider" />

      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <h3>¿Qué es Comparte tu enlace con una imagen?</h3>
        <p>Comparte tu enlace con una imagen es una herramienta que te permite transformar imágenes en tarjetas sociales clicables que dirigen a cualquier página web que elijas. Comparte estas tarjetas en plataformas como Facebook, Twitter, LinkedIn y WhatsApp para atraer más tráfico a tu sitio web.</p>
        <h3>¿Cómo uso la aplicación?</h3>
        <p>Sigue estos pasos para compartir tu enlace:</p>
        <ol>
          <li>Haz clic en Seleccionar archivo para elegir una imagen desde tu dispositivo. La aplicación te mostrará una vista previa.</li>
          <li>Ingresa un título, una descripción y la URL de destino. La URL de destino es la dirección del sitio web al que quieres dirigir a las personas cuando hagan clic en la tarjeta.</li>
          <li>Una vez que hayas completado todos los campos, redacta una publicación en la red social de tu elección. Al publicarla, la plataforma convertirá automáticamente el enlace en una tarjeta social clicable.</li>
        </ol>
        <h3>¿Qué es una tarjeta social clicable?</h3>
        <p>Una tarjeta social clicable es un elemento visual que te permite personalizar cómo se ve un enlace cuando lo compartes en redes sociales. Al compartir una URL, puedes especificar la imagen, el título y la descripción que aparecerán, para que otros sepan de qué trata el enlace antes de hacer clic.</p>
        <h3>¿Qué tan efectivas son las tarjetas sociales clicables?</h3>
        <p>Las tarjetas sociales clicables son una forma efectiva de aumentar la participación y generar más tráfico desde las redes sociales. Puedes usarlas para promocionar productos, servicios, publicaciones de blog, descargas de aplicaciones, páginas de destino, formularios de registro y más. ¡La aplicación te permite usarlas para cualquier propósito!</p>
        <h3>¿Los enlaces compartidos caducan?</h3>
        <p>Los enlaces que compartes en las redes sociales no caducan, ya que son las URLs de destino que tú proporcionas. Una vez compartidos, las plataformas sociales los convierten en tarjetas sociales clicables que dirigirán a los usuarios a tu URL de destino.</p>
      </section>

      <section className="faq-image">
        <Image
          src="/images/share2.webp"
          alt="Ejemplo de tarjeta social 2"
          width={800}
          height={400}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ borderRadius: '8px' }}
        />
      </section>

      <footer>
        <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
        <span> | </span>
        <a href="/terminos-de-uso" target="_blank" rel="noopener noreferrer">Términos de Uso</a>
        <span> | Desarrollado por </span>
        <a href="https://buymeacoffee.com/carlosespinoza" target="_blank" rel="noopener noreferrer">Carlos Espinoza</a>
      </footer>
      <ServiceWorkerRegister /> {/* Añade el componente aquí */}
    </div>
  );
}