//imports
/**
 * Link, para navegar internamente
 * getMovies de movies.js, para utilizar dicha función
 */
import Link from "next/link";
import { getMovies } from "./actions/movies";

export default async function Home() {
  let movies = [];
  let error = null;

  try {
    movies = await getMovies();
  } catch (err) {
    error = err.message;
  }

  return (
    //Fondo
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Logo de StarWars */}
        <header className="text-center mb-4 sm:mb-6">
          <img
            src="sw-logo.png"
            className="mt-4 md:mt-0 w-40 h-20 sm:w-56 sm:h-28 md:w-2/5 md:h-auto mx-auto"
          />
        </header>

        {/* Mensaje de Error */}
        {error ? (
          <div className="flex justify-center items-center h-40 sm:h-52 md:h-64">
            <div className="text-white text-center px-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                ERROR AL CARGAR LAS PELÍCULAS
              </h2>
              <p className="text-red-300 text-sm sm:text-base">{error}</p>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex justify-center items-center h-40 sm:h-52 md:h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 border-t-4 border-b-4 border-[#ffe91f]"></div>
          </div>
        ) : (
          //Div de las Películas
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-6 sm:gap-y-8 ">
            {movies.map((movie) => (
              <Link
                key={movie.episode_id}
                href={`/peliculas/${movie.episode_id}`}
              >
                {/* Caja de cada Película */}
                <div className="w-[280px] sm:w-[200px] md:w-[450px] h-[70px] sm:h-[80px] md:h-[100px] flex px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 md:pb-5 items-center text-center bg-transparent backdrop-blur-lg overflow-hidden shadow-2xl transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-white-500/20 border-2 sm:border-3 md:border-4 rounded-xl sm:rounded-2xl border-[#ffe91f]">
                  <h2 className="w-full h-full uppercase text-lg sm:text-xl md:text-3xl font-bold text-white truncate hover:text-[#ffe91f] transform transition-all duration-200">
                    {movie.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
