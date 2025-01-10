import './App.css';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import Modal from './components/ModalSend';
import { saveDataToFirebase } from './utils/saveData';
import ImageIcon from './components/svg/ImageIcon';
import { CheckIcon } from './components/svg/CheckIcon';

function App() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [anonymous, setAnonymous] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleOpen = () => {
    setOpenModal(true);
    reset();
    setAnonymous(true);

    const timer = setTimeout(() => {
      setOpenModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();

    return `${month}/${date}/${year} ${hour}:${min}`;
  };

  const onSubmit = (values) => {
    saveDataToFirebase(values, anonymous, getDate, file)
      .then((success) => {
        if (success) {
          handleOpen();
        }
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
  };

  const handlerAnonymous = () => {
    const newstate = !anonymous;
    setAnonymous(newstate);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row gap-5 md:space-x-8 lg:space-x-12 justify-center items-center relative p-3">
        {openModal && <Modal />}

        <img
          src="/just_me.jpg"
          alt="Foto de Moisés GJ"
          className="rounded-full size-48 md:size-auto max-w-72 aspect-square object-cover shadow-gray-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        />

        <form
          className="flex flex-col gap-5 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-extrabold mt-2 text-center text-xl text-white">
            Mensaje para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Moi
            </span>{' '}
          </h1>
          <div className="w-full relative">
            <div className="absolute end-3 bottom-2 rounded-full bg-gray-700 p-1">
              <button type="button" onClick={handleButtonClick} className={`${file ? '[&>svg]:stroke-green-500' : '[&>svg]:stroke-gray-300'}`}>
                {file && <div className="absolute -end-2">
                  <CheckIcon />
                </div>}
                <ImageIcon />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <textarea
              id="message"
              rows="4"
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe tu mensaje"
              {...register('message', {
                required: 'Debes de escribir un mensaje',
                minLength: {
                  message: '¿Es un mensaje correcto?',
                  value: 3,
                },
              })}
            >

            </textarea>
          </div>

          {errors.message && (
            <p className="text-rose-500 w-full -mt-3 rounded-lg text-center my-auto  font-medium text-xs">
              {errors.message.message}
            </p>
          )}

          <button
            type="submit"
            className="text-white bg-[#282828] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#ffff]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
          >
            Enviar mensaje
          </button>

          {anonymous || (
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe tu nombre"
              {...register('author', {
                required: 'Debes de escribir un nombre',
                minLength: {
                  message: '¿Es un nombre correcto?',
                  value: 3,
                },
              })}
            ></input>
          )}

          {anonymous ||
            (errors.author && (
              <p className="text-rose-500 w-full -mt-3 text-center my-auto  font-medium text-xs">
                {errors.author.message}
              </p>
            ))}

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={handlerAnonymous}
              defaultChecked
            />

            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Envíar mensaje anónimx
            </span>
          </label>
        </form>
      </main>

      {anonymous && <footer className="absolute bottom-1 md:bottom-5 end-1/2 translate-x-1/2 text-white font-light text-xs md:text-sm">
        Powered by <b className='shadow-bright'>Moisés GJ</b>
      </footer>}
    </>
  );
}

export default App;
