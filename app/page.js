'use client';

import { useState } from 'react';
import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import Image from 'next/image';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleImageLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleImageClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const shareOnSocialMedia = async (platform) => {
    if (!imageUrl || !title || !description || !url) {
      alert('Por favor, completa todos los campos y sube una imagen.');
      return;
    }

    const id = nanoid();
    const shareUrl = `${window.location.origin}/share/${id}`;

    await kv.set(`share:${id}`, {
      imageUrl,
      title,
      description,
      url,
    });

    await kv.expire(`share:${id}`, 60 * 60 * 24);

    setShareLink(shareUrl);

    let shareLinkPlatform;
    switch (platform) {
      case 'facebook':
        shareLinkPlatform = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLinkPlatform = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareLinkPlatform = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        break;
      case 'whatsapp':
        shareLinkPlatform = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${shareUrl}`)}`;
        break;
      default:
        return;
    }

    window.open(shareLinkPlatform, '_blank');
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert('Enlace copiado al portapapeles');
    } else {
      alert('Primero genera un enlace compartiendo en una red social');
    }
  };

  return (
    <div className="container">
      {/* Título y subtítulo */}
      <section className="intro">
        <h1>Comparte enlaces como un profesional</h1>
        <p>Promociona tu negocio y haz crecer tu base de clientes con marketing, redes sociales y herramientas SEO.</p>
      </section>

      {/* Imagen 1 */}
      <section className="hero-image">
        <Image
          src="/images/share1.jpeg"
          alt="Ejemplo de tarjeta social 1"
          width={800}
          height={400}
          style={{ borderRadius: '8px' }}
        />
      </section>

      {/* Texto introductorio */}
      <section className="intro-text">
        <p>Incrusta tu URL en una imagen atractiva y compártela en redes sociales con un solo clic.</p>
      </section>

      {/* Formulario */}
      <section className="form-section">
        <h2>Crea tu tarjeta social</h2>
        <input type="file" id="imageInput" accept="image/*" onChange={handleImageLoad} />
        <input type="text" id="title" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" id="description" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" id="url" placeholder="URL de destino" value={url} onChange={(e) => setUrl(e.target.value)} />

        <div className="preview">
          {imageUrl ? (
            <Image
              id="previewImage"
              src={imageUrl}
              alt="Vista previa"
              width={500}
              height={500}
              style={{ cursor: url ? 'pointer' : 'default' }}
              onClick={handleImageClick}
            />
          ) : (
            <p>Selecciona una imagen para ver la vista previa</p>
          )}
        </div>

        <div className="share-buttons">
          <button className="facebook-btn" onClick={() => shareOnSocialMedia('facebook')}>Facebook</button>
          <button className="twitter-btn" onClick={() => shareOnSocialMedia('twitter')}>Twitter</button>
          <button className="linkedin-btn" onClick={() => shareOnSocialMedia('linkedin')}>LinkedIn</button>
          <button className="whatsapp-btn" onClick={() => shareOnSocialMedia('whatsapp')}>WhatsApp</button>
          <button className="copy-btn" onClick={copyToClipboard}>Copiar enlace</button>
        </div>

        {shareLink && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>Enlace generado: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a></p>
          </div>
        )}
      </section>

      {/* Separador de contenido */}
      <hr className="content-divider" />

      {/* Sección de Preguntas Frecuentes */}
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

      {/* Imagen 2 */}
      <section className="faq-image">
        <Image
          src="/images/share2.jpeg"
          alt="Ejemplo de tarjeta social 2"
          width={800}
          height={400}
          style={{ borderRadius: '8px' }}
        />
      </section>

      {/* Footer */}
      <footer>
        <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
        <span> | </span>
        <a href="/terminos-de-uso" target="_blank" rel="noopener noreferrer">Términos de Uso</a>
        <span> | Desarrollado por </span>
        <a href="https://buymeacoffee.com/carlosespinoza" target="_blank" rel="noopener noreferrer">Carlos Espinoza</a>
      </footer>
    </div>
  );
}