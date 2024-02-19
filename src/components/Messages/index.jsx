import html2canvas from 'html2canvas';

export default function Messages({ id, author, message, date }) {
  const handlerSaveImage = () => {
    const div = document.getElementById(id);
    html2canvas(div)
      .then((canvas) => {
        const imageurl = canvas.toDataURL('image/jpeg');
        window.location.href = `instagram://library?AssetPath=${imageurl}`;
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className="relative flex flex-col mt-6 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md bg-clip-border rounded-xl w-full"
      id={id}
    >
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {author}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {message}
        </p>
        <span className="absolute top-7 end-8 font-medium italic text-sm">
          {date}
        </span>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handlerSaveImage}
        >
          Compartir
        </button>
      </div>
    </div>
  );
}
