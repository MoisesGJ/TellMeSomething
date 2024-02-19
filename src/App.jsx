import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from './components/ModalSend';
import './App.css';

function App() {
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
    }, 3000);
    return () => clearTimeout(timer);
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
    anonymous && (values['author'] = 'Anónimx');
    values['date'] = getDate();

    const URI = 'https://anonymousapp-c4f72-default-rtdb.firebaseio.com/.json';

    fetch(URI, { method: 'POST', body: JSON.stringify(values) })
      .then((response) => {
        if (response.ok) {
          handleOpen();
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handlerAnonymous = () => {
    const newstate = !anonymous;
    setAnonymous(newstate);
  };

  return (
    <>
      <main className="flex flex-col gap-5 justify-center items-center">
        {openModal && <Modal />}
        <img
          src="https://res.cloudinary.com/dqfmigdvh/image/upload/f_auto,q_auto/ix0pdq4ieptkzkm2c0ng"
          alt=""
          className="rounded-full w-64 h-64 aspect-square shadow-gray-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        />

        <h1 className="font-extrabold  mt-2 text-center text-xl text-white">
          Mensaje para{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
            Diana
          </span>{' '}
        </h1>
        <form
          className="flex flex-col gap-5 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escribe tu mensaje"
            {...register('message', {
              required: 'Debes de escribir un mensaje',
              minLength: {
                message: '¿Es un mensaje correcto?',
                value: 3,
              },
            })}
          ></textarea>

          {errors.message && (
            <p className="text-rose-600 w-full -mt-3 rounded-lg text-center my-auto  font-medium text-sm">
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
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
              <p className="text-rose-600 w-full -mt-3 text-center my-auto  font-medium text-sm">
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

            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Envía mensaje anónimx
            </span>
          </label>
        </form>
      </main>

      <footer className="absolute bottom-5 end-1/2 translate-x-1/2 text-white">
        Powered By <b>MoisesGJ</b>
      </footer>
    </>
  );
}

export default App;
