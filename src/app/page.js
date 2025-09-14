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
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Logo de StarWars */}
        <header className="text-center m-0 mb-6 p-0">
          <img src="sw-logo.png" className="w-69 h-40 mx-auto m-0" />
        </header>
        {/* Mensaje de Error */}
        {error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                ERROR AL CARGAR LAS PELÍCULAS
              </h2>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ffe91f]"></div>
          </div>
        ) : (
          //Div de las Películas
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {movies.map((movie) => (
              <Link
                key={movie.episode_id}
                href={`/peliculas/${movie.episode_id}`}
              >
                {/* Caja de cada Película */}
                <div className="w-[450px] h-[100px] flex px-6 pt-6 pb-5 items-center text-center bg-trasparent backdrop-blur-lg overflow-hidden shadow-2xl transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-white-500/20 border-4 rounded-2xl border-[#ffe91f]">
                  <h2 className="w-full h-full uppercase text-3xl font-bold text-white truncate hover:text-[#ffe91f] transform transition-all duration-200 ">
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
