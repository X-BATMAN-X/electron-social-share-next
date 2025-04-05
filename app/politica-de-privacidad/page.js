export default function PrivacyPolicy() {
    return (
      <div className="container">
        <h1>Política de Privacidad</h1>
        <p>Última actualización: 04 de abril de 2025</p>
  
        <h2>1. Información que recopilamos</h2>
        <p>
          Nuestra aplicación, "Comparte tu enlace con una imagen", recopila la siguiente información cuando los usuarios la utilizan:
          <ul>
            <li>Imágenes subidas por los usuarios para crear vistas previas personalizadas.</li>
            <li>Títulos, descripciones y URLs proporcionados por los usuarios.</li>
            <li>Enlaces generados temporalmente para compartir en redes sociales.</li>
          </ul>
          Esta información se almacena temporalmente en nuestra base de datos (Vercel KV) y se elimina automáticamente después de 24 horas.
        </p>
  
        <h2>2. Uso de la información</h2>
        <p>
          Utilizamos la información recopilada únicamente para:
          <ul>
            <li>Generar vistas previas personalizadas para compartir en redes sociales.</li>
            <li>Mejorar la funcionalidad y experiencia de la aplicación.</li>
          </ul>
          No compartimos ni vendemos tus datos a terceros.
        </p>
  
        <h2>3. Cookies y tecnologías similares</h2>
        <p>
          Esta aplicación no utiliza cookies ni tecnologías de seguimiento, excepto las necesarias para el funcionamiento técnico (por ejemplo, sesiones de Vercel).
        </p>
  
        <h2>4. Seguridad</h2>
        <p>
          Tomamos medidas razonables para proteger tu información, pero no podemos garantizar una seguridad absoluta. Los enlaces generados son temporales y se eliminan después de 24 horas.
        </p>
  
        <h2>5. Cambios en esta política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos de cambios significativos publicando la nueva versión aquí.
        </p>
  
        <p>
          Si tienes preguntas, contáctanos a través de las redes sociales o en la página de soporte.
        </p>
      </div>
    );
  }