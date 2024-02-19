import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-[#111827] text-9xl">404</h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">¡Lo siento!</span>
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                Parece que esta página no existe.
              </p>
              <Link
                to="/"
                className="px-5 py-2 rounded-md text-blue-100 bg-[#111827] hover:bg-blue-700"
              >
                Ve al inicio
              </Link>
            </div>
            <div className="mt-10">
              <img
                src="https://thechive.com/wp-content/uploads/2020/12/404-Dog-Logic-Nowhere-To-Be-Found-Funny-Pictures-Of-Derp-Dogs-And-Fails-Humor-23.jpg?attachment_cache_bust=3506368&quality=85&strip=info&w=600"
                alt="img"
                className="object-cover h-56 w-56 aspect-square mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
