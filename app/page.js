'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleImageLoad = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Por favor, selecciona una imagen de menos de 5 MB.');
        return;
      }

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
      }
    }
  };

  const handleImageClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const shareOnSocialMedia = (platform) => {
    const missingFields = [];
    if (!imageUrl) missingFields.push('imagen');
    if (!title) missingFields.push('título');
    if (!description) missingFields.push('descripción');
    if (!url) missingFields.push('URL');

    if (missingFields.length > 0) {
      alert(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}.`);
      return;
    }

    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      alert('No se pudo abrir la ventana de la red social. Por favor, permite las ventanas emergentes en tu navegador.');
      return;
    }

    newWindow.document.write('<h1>Cargando...</h1>');

    fetch('/api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, title, description, url }),
    })
      .then((response) => {
        console.log('Respuesta de /api/share:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error('Error al compartir en redes sociales');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos de /api/share:', data);

        const shareUrl = data.shareUrl;
        console.log('Enlace compartido recibido:', shareUrl);
        setShareLink(shareUrl);

        let socialMediaUrl;
        if (platform === 'facebook') {
          socialMediaUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        } else if (platform === 'twitter') {
          socialMediaUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        } else if (platform === 'linkedin') {
          socialMediaUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        } else if (platform === 'whatsapp') {
          socialMediaUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${shareUrl}`)}`;
        }

        console.log('URL de red social generada:', socialMediaUrl);

        if (!socialMediaUrl) {
          throw new Error('No se generó una URL válida para la red social');
        }

        newWindow.location.href = socialMediaUrl;
      })
      .catch((error) => {
        console.error('Error al compartir en redes sociales:', error);
        alert(`Hubo un error al compartir: ${error.message}. Por favor, intenta de nuevo.`);
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
          style={{ borderRadius: '8px', width: 'auto', height: 'auto' }}
          priority
        />
      </section>

      <section className="intro-text">
        <p>Incrusta tu URL en una imagen y compártela en redes sociales con un solo clic.</p>
      </section>

      <section className="form-section">
        <h2>Crea tu publicación</h2>
        <input type="file" id="imageInput" accept="image/*" onChange={handleImageLoad} />
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
          {imageUrl ? (
            <>
              <p>URL de la imagen: {imageUrl}</p>
              <Image
                id="previewImage"
                src={imageUrl}
                alt="Vista previa"
                width={500}
                height={500}
                style={{ cursor: url ? 'pointer' : 'default', width: 'auto', height: 'auto' }}
                onClick={handleImageClick}
              />
            </>
          ) : (
            <p>Selecciona una imagen para ver la vista previa</p>
          )}
        </div>

        <div className="share-buttons">
          <button className="facebook-btn" onClick={() => shareOnSocialMedia('facebook')}>
            Facebook
          </button>
          <button className="twitter-btn" onClick={() => shareOnSocialMedia('twitter')}>
            Twitter
          </button>
          <button className="linkedin-btn" onClick={() => shareOnSocialMedia('linkedin')}>
            LinkedIn
          </button>
          <button className="whatsapp-btn" onClick={() => shareOnSocialMedia('whatsapp')}>
            WhatsApp
          </button>
        </div>

        {shareLink && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Enlace generado:{' '}
              <a href={shareLink} target="_blank" rel="noopener noreferrer">
                {shareLink}
              </a>
            </p>
          </div>
        )}
      </section>

      <hr className="content-divider" />

      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>

        <h3>¿Qué es Comparte tu enlace con una imagen?</h3>
        <p>
          Comparte tu enlace con una imagen es una herramienta que te permite transformar imágenes en
          tarjetas sociales clicables que dirigen a cualquier página web que elijas. Comparte estas
          tarjetas en plataformas como Facebook, Twitter, LinkedIn y WhatsApp para atraer más tráfico a
          tu sitio web.
        </p>

        <h3>¿Cómo uso la aplicación?</h3>
        <p>Sigue estos pasos para compartir tu enlace:</p>
        <ol>
          <li>
            Haz clic en Seleccionar archivo para elegir una imagen desde tu dispositivo. La aplicación
            te mostrará una vista previa.
          </li>
          <li>
            Ingresa un título, una descripción y la URL de destino. La URL de destino es la dirección
            del sitio web al que quieres dirigir a las personas cuando hagan clic en la tarjeta.
          </li>
          <li>
            Una vez que hayas completado todos los campos, redacta una publicación en la red social de
            tu elección. Al publicarla, la plataforma convertirá automáticamente el enlace en una
            tarjeta social clicable.
          </li>
        </ol>

        <h3>¿Qué es una tarjeta social clicable?</h3>
        <p>
          Una tarjeta social clicable es un elemento visual que te permite personalizar cómo se ve un
          enlace cuando lo compartes en redes sociales. Al compartir una URL, puedes especificar la
          imagen, el título y la descripción que aparecerán, para que otros sepan de qué trata el enlace
          antes de hacer clic.
        </p>

        <h3>¿Qué tan efectivas son las tarjetas sociales clicables?</h3>
        <p>
          Las tarjetas sociales clicables son una forma efectiva de aumentar la participación y generar
          más tráfico desde las redes sociales. Puedes usarlas para promocionar productos, servicios,
          publicaciones de blog, descargas de aplicaciones, páginas de destino, formularios de registro y
          más. ¡La aplicación te permite usarlas para cualquier propósito!
        </p>

        <h3>¿Los enlaces compartidos caducan?</h3>
        <p>
          Los enlaces que compartes en las redes sociales no caducan, ya que son las URLs de destino que
          tú proporcionas. Una vez compartidos, las plataformas sociales los convierten en tarjetas
          sociales clicables que dirigirán a los usuarios a tu URL de destino.
        </p>
      </section>

      <section className="faq-image">
        <Image
          src="/images/share2.webp"
          alt="Ejemplo de tarjeta social 2"
          width={800}
          height={400}
          style={{ borderRadius: '8px', width: 'auto', height: 'auto' }}
        />
      </section>

      <footer>
        <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
          Política de Privacidad
        </a>
        <span> | </span>
        <a href="/terminos-de-uso" target="_blank" rel="noopener noreferrer">
          Términos de Uso
        </a>
        <span> | Desarrollado por </span>
        <a href="https://buymeacoffee.com/carlosespinoza" target="_blank" rel="noopener noreferrer">
          Carlos Espinoza
        </a>
      </footer>
    </div>
  );
}
