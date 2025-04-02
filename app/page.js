'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(''); // Estado para la URL pública de la imagen
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  // Función para cargar y subir la imagen
  const handleImageLoad = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crear un FormData para enviar la imagen a la API Route
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Enviar la imagen a la ruta /api/upload
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.url) {
          setImageUrl(data.url); // Actualizamos el estado con la URL pública
        } else {
          alert('Error al subir la imagen.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error al subir la imagen.');
      }
    } else {
      alert('Selecciona una imagen válida.');
    }
  };

  // Función para compartir en redes sociales
  const shareOnSocialMedia = (platform) => {
    if (!imageUrl) {
      alert('Debes cargar una imagen antes de compartir.');
      return;
    }

    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedImageUrl = encodeURIComponent(imageUrl); // Ahora usamos la URL pública
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedImageUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedDescription}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedDescription}%20${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  // Función para manejar el clic en la imagen
  const handleImageClick = () => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Por favor, ingresa una URL de destino.');
    }
  };

  return (
    <div className="container">
      <h1>Compartir en Redes Sociales</h1>

      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageLoad}
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
        {imageUrl ? (
          <img
            id="previewImage"
            src={imageUrl}
            alt="Vista previa"
            onClick={handleImageClick}
            style={{ cursor: url ? 'pointer' : 'default' }}
          />
        ) : (
          <p>Selecciona una imagen para ver la vista previa</p>
        )}
      </div>

      <div className="share-buttons">
        <button onClick={() => shareOnSocialMedia('facebook')}>
          Facebook
        </button>
        <button onClick={() => shareOnSocialMedia('twitter')}>
          Twitter
        </button>
        <button onClick={() => shareOnSocialMedia('linkedin')}>
          LinkedIn
        </button>
        <button onClick={() => shareOnSocialMedia('whatsapp')}>
          WhatsApp
        </button>
      </div>
    </div>
  );
}