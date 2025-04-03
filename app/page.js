'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  // Función para cargar y subir la imagen
  const handleImageLoad = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.url) {
          setImageUrl(data.url);
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

  // Función para guardar los datos y obtener un ID
  const saveShareData = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          url,
        }),
      });

      const data = await response.json();

      if (data.id) {
        return data.id;
      } else {
        throw new Error('Failed to save share data');
      }
    } catch (error) {
      console.error('Error saving share data:', error);
      throw error;
    }
  };

  // Función para compartir en redes sociales
  const shareOnSocialMedia = async (platform) => {
    if (!imageUrl || !title || !description || !url) {
      alert('Por favor, completa todos los campos antes de compartir.');
      return;
    }

    try {
      // Guardar los datos y obtener un ID
      const id = await saveShareData();

      // Crear la URL de la página intermedia
      const shareUrl = `${window.location.origin}/share/${id}`;
      const encodedShareUrl = encodeURIComponent(shareUrl);
      const encodedTitle = encodeURIComponent(title);
      const encodedDescription = encodeURIComponent(description);

      let socialUrl = '';

      switch (platform) {
        case 'facebook':
          socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`;
          break;
        case 'twitter':
          socialUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedDescription}&url=${encodedShareUrl}`;
          break;
        case 'linkedin':
          socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`;
          break;
        case 'whatsapp':
          socialUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedDescription}%20${encodedShareUrl}`;
          break;
        default:
          return;
      }

      window.open(socialUrl, '_blank');
    } catch (error) {
      alert('Error al compartir. Intenta de nuevo.');
    }
  };

  // Función para manejar el clic en la imagen (vista previa local)
  const handleImageClick = () => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Por favor, ingresa una URL de destino.');
    }
  };

  return (
    <div className="container">
      <h1>Compartir Imagen en Redes Sociales</h1>

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