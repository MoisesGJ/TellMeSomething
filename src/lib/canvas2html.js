import domtoimage from 'dom-to-image';

export default function generateInstagramStory(author, message) {
  const storyContainer = document.createElement('div');
  storyContainer.style.width = '100%';
  storyContainer.style.height = '100%';
  storyContainer.style.background = '#111827'; // Color de fondo
  storyContainer.style.boxSizing = 'border-box';
  storyContainer.style.color = '#fff'; // Color del texto
  storyContainer.style.display = 'flex';
  storyContainer.style.flexDirection = 'column';
  storyContainer.style.justifyContent = 'center';
  storyContainer.style.alignItems = 'center';

  const authorElement = document.createElement('h1'); // Cambiado a h1
  authorElement.style.backgroundColor = 'white';
  authorElement.style.color = '#202020 ';
  authorElement.style.width = '320px';
  authorElement.style.height = '50px';
  authorElement.style.paddingLeft = '10px';
  authorElement.style.paddingTop = '10px';
  authorElement.textContent = author;
  authorElement.style.fontSize = '24px';
  authorElement.style.fontWeight = 'bold';
  authorElement.style.marginBottom = '12px';

  const messageElement = document.createElement('p'); // Cambiado a p
  messageElement.style.width = '320px';
  messageElement.style.height = '200px';
  messageElement.style.paddingLeft = '10px';
  messageElement.style.paddingTop = '10px';
  messageElement.textContent = message;
  messageElement.style.width = '100%'; // Asegurar que el texto se expanda horizontalmente
  messageElement.style.overflowWrap = 'break-word'; // Romper palabras largas si es necesario

  storyContainer.appendChild(authorElement);
  storyContainer.appendChild(messageElement);

  // Agregar el contenedor al DOM
  document.body.appendChild(storyContainer);

  // Generar la imagen usando dom-to-image con opciones para establecer el tamaño
  domtoimage
    .toBlob(storyContainer, { width: 320, height: 200 })
    .then((blob) => {
      // Crear un enlace para descargar la imagen
      const link = document.createElement('a');
      link.download = 'instagram_story.png';
      link.href = window.URL.createObjectURL(blob);

      // Simular el clic en el enlace para iniciar la descarga
      link.click();

      // Eliminar el contenedor del DOM después de la descarga
      document.body.removeChild(storyContainer);
    })
    .catch((error) => {
      console.error('Error al generar la imagen:', error);
    });
}
