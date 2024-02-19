import { useEffect, useState } from 'react';
import Messages from './components/Messages';

function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://anonymousapp-c4f72-default-rtdb.firebaseio.com/.json')
      .then((resJson) => resJson.json())
      .then((res) => {
        setData(Object.values(res));
      });
  }, []);

  return (
    <>
      <main className="w-screen px-3 mb-10">
        <h1 className="font-extrabold text-3xl text-white my-5">
          Mis mensajes
        </h1>
        {data.map((element, indx) => {
          const { author, message, date } = element;
          return (
            <Messages
              key={indx}
              author={author}
              message={message}
              date={date}
              id={indx}
            />
          );
        })}
      </main>

      <footer className="backdrop-filter backdrop-blur-sm w-screen text-center fixed bottom-0 px-3 pb-3 text-white rounded-xl">
        <span>
          Powered By <b>MoisesGJ</b>
        </span>
      </footer>
    </>
  );
}

export default View;
