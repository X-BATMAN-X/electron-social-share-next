'use client';

import { useState } from 'react';
import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import Image from 'next/image'; // Importar Image de next/image

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

    let shareLink;
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${shareUrl}`)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
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
      <h1>Comparte tu enlace con una imagen</h1>

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
            width={500} // Ajusta según el tamaño máximo esperado
            height={500} // Ajusta según el tamaño máximo esperado
            style={{ cursor: url ? 'pointer' : 'default' }}
            onClick={handleImageClick}
          />
        ) : (
          <p>Selecciona una imagen para ver la vista previa</p>
        )}
      </div>

      <div className="share-buttons">
        <button onClick={() => shareOnSocialMedia('facebook')}>Facebook</button>
        <button onClick={() => shareOnSocialMedia('twitter')}>Twitter</button>
        <button onClick={() => shareOnSocialMedia('linkedin')}>LinkedIn</button>
        <button onClick={() => shareOnSocialMedia('whatsapp')}>WhatsApp</button>
      </div>

      {shareLink && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Enlace generado: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a></p>
          <button onClick={copyToClipboard} style={{ padding: '10px 20px', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Copiar enlace
          </button>
        </div>
      )}

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