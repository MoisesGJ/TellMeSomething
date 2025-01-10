import { useEffect, useState } from 'react';
import Messages from './components/Messages';

function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://anonymousapp-c4f72-default-rtdb.firebaseio.com/.json')
      .then((resJson) => resJson.json())
      .then((res) => {
        const reorderedData = Object.values(res).reduce((acc, item) => {
          if (item.imageURL) {
            acc.push(item);
          } else {
            acc.unshift(item);
          }
          return acc;
        }, []);

        setData(reorderedData);
      });

  }, []);

  return (
    <>
      <main className="w-screen py-10 flex flex-col justify-center items-center relative min-h-screen">
        <h1 className="font-extrabold text-3xl text-white my-5 mb-16">
          Mis mensajes <span className='text-xl md:text-3xl'>({data.length})</span>
        </h1>
        <div className="my-5 flex flex-wrap gap-5 justify-center px-3">
          {data.map((element, indx) => {
            const { author, message, date } = element;
            return (
              <Messages
                key={indx}
                author={author}
                message={message}
                date={date}
                id={indx}
                image={element.imageURL}
              />
            );
          })}
        </div>

        <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white font-light text-xs md:text-sm mt-auto">
          Powered by <b className="shadow-bright">Moisés GJ</b>
        </footer>
      </main>
    </>

  );
}

export default View;
