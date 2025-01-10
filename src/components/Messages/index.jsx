import PropTypes from 'prop-types';
import { useRef } from 'react';



import ResponsiveText from '../ResponsiveText';
import ShareIcon from '../svg/ShareIcon';

import { toPng } from 'html-to-image';
import ShareIconIg from '../svg/ShareIgIcon';


export default function Messages(props) {
  const divRef = useRef(null);
  const btnRef = useRef(null);

  const { id, author, message, image } = props;


  const handlerGoToIg = () =>
    (window.location.href = `instagram://library?OpenInEditor=1&LocalIdentifier=+1`);

  const handlerSaveImage = (ref, btn) => {



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
    <div ref={divRef} className={`bg-white/90 border-2 min-w-72 w-full max-w-96 h-56 rounded-[2.5rem] relative flex justify-center items-center ${image && 'my-40'}`} id={id}>
      {image && <img src={image} className='absolute -top-20 rounded-full size-36 object-cover' />}
      <div className="absolute top-5 start-6 flex space-x-2">
        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
      </div>
      <ResponsiveText message={message} />
      <div ref={btnRef} className='absolute bottom-4 w-full px-4 select-none flex flex-row-reverse justify-between space-x-3'>
        <button className="hover:bg-gray-400/10 rounded-full p-1" type="button"
          onClick={() => handlerSaveImage(divRef.current, btnRef.current)}>
          <ShareIcon />
        </button>
        <button type='button' className="hover:bg-gray-400/10 rounded-full p-1" onClick={handlerGoToIg}>
          <ShareIconIg />
        </button>
      </div>


      {author === 'Anónimx' || <h3 className='px-3 py-1 text-xs rounded-[2.5rem] absolute bottom-2 bg-gray-400/20'>{author}</h3>}
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