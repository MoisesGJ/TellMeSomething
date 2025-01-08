import PropTypes from 'prop-types';
import { useRef, useState } from 'react';


//import generateInstagramStory from '../../lib/canvas2html';

import ResponsiveText from '../ResponsiveText';
import ShareIcon from '../svg/ShareIcon';

import { toPng } from 'html-to-image';

/* import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
 */
export default function Messages(props) {
  const divRef = useRef(null);
  const btnRef = useRef(null);

  const { id, author, message } = props;


  /*   const handlerGoToIg = () =>
      (window.location.href = `instagram://library?OpenInEditor=1&LocalIdentifier=+1`); */

  const handlerSaveImage = (ref, btn) => {
    /* const div = document.getElementById(id);
    html2canvas(div)
      .then((canvas) => {
        const imageurl = canvas.toDataURL('image/jpeg');

        saveAs(imageurl, `image${id}.jpg`);
      })
      .catch((error) => console.error(error)); */
    //generateInstagramStory('Usuario', ' ¡Hola, mundo!¡');

    //handlerGoToIg();

    btn.style.visibility = 'hidden';

    toPng(ref, {
      cacheBust: false, fontEmbedCSS: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      ` })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `image${id}.png`;
        link.href = dataUrl;
        link.click();
      }).finally(() => {
        btn.style.visibility = 'visible';
      });
  }



  return (
    <div ref={divRef} className="bg-white/90 border-2 min-w-72 w-full max-w-96 h-56 rounded-[2.5rem] relative flex justify-center items-center" id={id}>
      <div className="absolute top-5 start-6 flex space-x-2">
        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
      </div>
      <ResponsiveText message={message} />
      <button ref={btnRef} className="absolute bottom-4 end-10 select-none hover:shadow-lg hover:shadow-gray-900/20" type="button"
        onClick={() => handlerSaveImage(divRef.current, btnRef.current)}>
        <ShareIcon />
      </button>


      {author === 'Anónimx' || <h3 className='px-3 py-1 text-xs rounded-[2.5rem] absolute bottom-2 bg-gray-400/20'>{author}</h3>}
    </div>
  );
}

Messages.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};