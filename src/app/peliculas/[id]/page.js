//imports
/**
 * notFound para mostrar error404 si no existe
 * Link para navegar internamente entre rutas
 * getMovieById de movies.js, para utilizar dicha función
 * Icons de Lucide-react
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMovieById } from "../../actions/movies";
//Uso de la librería LUCIDE para los icons
import {
  ArrowBigLeftDash,
  Videotape,
  Clapperboard,
  Calendar1,
} from "lucide-react";


export default async function MovieDetail({ params }) {
  const { id } = await params;

  let movie = null;
  let error = null;

  try {
    movie = await getMovieById(id);
  } catch (err) {
    error = err.message;
  }

  if (error || !movie) {
    notFound();
  }

  return (
    // Div Principal
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat px-4 pb-4 pt-4 md:pt-4">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <header className="text-center text-[#ffe91f] font-extrabold mb-6">
          {/* Boton de Volver */}
          <Link
            href="/"
            className="inline-flex items-center mb-2  transform transition-all duration-300 cursor-pointer hover:scale-125 hover:shadow-white-500/20"
          >
            <ArrowBigLeftDash className="mr-2" />
            VOLVER
          </Link>
          {/* Titulo de la Pelicula */}
          <h1 className="uppercase w-full text-[#ffe91f] text-5xl md:text-7xl font-extrabold mb-2">
            {movie.title}
          </h1>
          {/* Numero de Episodio */}
          <p className="text-white text-3xl">EPISODIO {movie.episode_id}</p>
        </header>
        {/* Detalle de la Pelicula */}
        <div className="h-2/3 md:h-full  bg-transparent bg-opacity-90 backdrop-blur p-8 border-4 rounded-2xl border-[#ffe91f]">
          {/* Sección de Productor, Director y Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Director */}
            <div>
              <h2 className="flex text-2xl font-bold mb-1 text-white">
                DIRECTOR
              </h2>
              <p className="flex text-white text-lg text-center">
                <Videotape className="text-white mx-2" />
                {movie.director}
              </p>
            </div>
            {/* Productor */}
            <div>
              <h2 className="flex text-2xl font-bold mb-1 text-white">
                PRODUCTOR
              </h2>
              <p className="flex text-white text-xl">
                <Clapperboard className="text-white mx-2" />
                {movie.producer}
              </p>
            </div>
            {/* Fecha de Estreno */}
            <div>
              <h2 className="flex text-2xl font-bold mb-1 text-white">
                FECHA DE ESTRENO
              </h2>
              <p className="flex text-white text-xl">
                <Calendar1 className="text-white mx-2" />
                {movie.release_date}
              </p>
            </div>
          </div>
          {/* Div de Opening Crawl */}
          <div className="mb-4 mx-1 md:mx-8">
            <h2 className="text-2xl font-bold mb-2 text-white">
              OPENING CRAWL
            </h2>
            {/* Div que simula el Opening Crawl de las películas de StarWars */}
            <div className="h-[300px] px-2 md:h-full bg-black overflow-hidden relative border border-yellow-500/30 rounded-sm md:px-16">
              <p className="animate-marquee-vertical px-1 text-justify text-[#ffe91f] italic text-xl md:px-6">
                {movie.opening_crawl}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
