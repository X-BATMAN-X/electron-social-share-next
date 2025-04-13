export default function DataDeletionInstructions() {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Instrucciones para la eliminación de datos</h1>
        <p>
          En ComparteApp, nos tomamos tu privacidad muy en serio. Nuestra aplicación permite a los usuarios subir imágenes y generar enlaces compartidos, pero no recopilamos datos personales más allá de lo necesario para esta funcionalidad.
        </p>
        <p>
          Los datos que almacenamos incluyen:
          <ul>
            <li>La imagen subida (almacenada en Imgur).</li>
            <li>El título, la descripción y la URL de destino ingresados en el formulario (almacenados en nuestra base de datos en Supabase).</li>
          </ul>
        </p>
        <p>
          Si deseas que eliminemos tus datos, por favor contáctanos enviando un correo electrónico a <strong>[soporteparawordpressonline@gmail.com]</strong> con el enlace compartido que generaste (por ejemplo, <code>https://comparte.vercel.app/share/XX</code>). Procesaremos tu solicitud dentro de los 30 días y eliminaremos los datos asociados de nuestra base de datos.
        </p>
        <p>
          Ten en cuenta que no tenemos control sobre los datos compartidos en plataformas de terceros (como Facebook, Twitter, etc.) después de que hayas publicado el enlace. Si deseas eliminar un enlace publicado en una red social, deberás eliminarlo manualmente desde esa plataforma.
        </p>
        <p>
          Última actualización: 12 de abril de 2025.
        </p>
      </div>
    );
  }