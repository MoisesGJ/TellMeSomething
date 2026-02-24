import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import ResponsiveText from '../ResponsiveText';
import ShareIcon from '../svg/ShareIcon';
import ShareIconIg from '../svg/ShareIgIcon';

import { toPng } from 'html-to-image';

const FONT_EMBED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  * { font-family: 'Poppins', sans-serif; }
`;

export default function Messages({ id, author, message, date, image }) {
  const cardRef = useRef(null);
  const buttonsRef = useRef(null);
  const [shareHint, setShareHint] = useState('');

  const generatePng = async () => {
    buttonsRef.current.style.visibility = 'hidden';
    try {
      return await toPng(cardRef.current, { cacheBust: false, fontEmbedCSS: FONT_EMBED_CSS });
    } finally {
      buttonsRef.current.style.visibility = 'visible';
    }
  };

  const handlerSaveImage = async () => {
    const dataUrl = await generatePng();
    const link = document.createElement('a');
    link.download = `mensaje-${id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handlerShareToInstagram = async () => {
    setShareHint('');
    const dataUrl = await generatePng();

    // Intentar Web Share API (soportado en móvil: iOS Safari, Android Chrome)
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await fetch(dataUrl).then((r) => r.blob());
        const file = new File([blob], 'mensaje.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'TellMeSomething' });
          return;
        }
      } catch {
        // El usuario canceló o el browser no lo soporta — fallback abajo
      }
    }

    // Fallback: descargar imagen y abrir Instagram
    const link = document.createElement('a');
    link.download = 'mensaje.png';
    link.href = dataUrl;
    link.click();
    setShareHint('Imagen guardada. Ábrela desde tu galería en Instagram.');
    setTimeout(() => {
      window.location.href = 'instagram://library?OpenInEditor=1';
    }, 800);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Zona de imagen: reserva espacio fijo para mantener el grid consistente */}
      <div className="h-28 flex items-end justify-center mb-[-3.5rem] relative z-10">
        {image && (
          <img
            src={image}
            alt="profile"
            className="size-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        )}
      </div>

      {/* Tarjeta */}
      <div
        ref={cardRef}
        className="bg-white/90 border-2 min-w-72 w-full max-w-96 h-56 rounded-[2.5rem] relative flex justify-center items-center"
        id={`card-${id}`}
      >
        {/* Puntos estilo macOS */}
        <div className="absolute top-5 start-6 flex space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-600 rounded-full" />
        </div>

        <ResponsiveText message={message} />

        <div
          ref={buttonsRef}
          className="absolute bottom-4 w-full px-4 select-none flex flex-row-reverse justify-between"
        >
          {/* Guardar como PNG */}
          <button
            type="button"
            className="hover:bg-gray-400/10 rounded-full p-1"
            onClick={handlerSaveImage}
            title="Guardar imagen"
          >
            <ShareIcon />
          </button>
          {/* Compartir a Instagram */}
          <button
            type="button"
            className="hover:bg-gray-400/10 rounded-full p-1"
            onClick={handlerShareToInstagram}
            title="Compartir en Instagram"
          >
            <ShareIconIg />
          </button>
        </div>

        {author !== 'Anónimx' && (
          <h3 className="px-3 py-1 text-xs rounded-[2.5rem] absolute bottom-2 bg-gray-400/20">
            {author}
          </h3>
        )}
      </div>

      {/* Hint de compartir (aparece brevemente en fallback) */}
      {shareHint && (
        <p className="mt-3 text-white/70 text-xs text-center max-w-72 px-2">{shareHint}</p>
      )}
    </div>
  );
}

Messages.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
};
