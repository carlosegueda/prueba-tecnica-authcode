"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function MovieDetail() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      //Peticion para enlistar peliculas y filtrarlas por ID
      fetch("https://swapi.info/api/films")
        .then((response) => response.json())
        .then((data) => {
          //Find para hacer match con el ID
          const foundMovie = data.find(
            (m) => m.episode_id === parseInt(params.id)
          );
          if (foundMovie) {
            setMovie(foundMovie);
          } else {
            router.push("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [params.id, router]);

  //Circulo de Carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center">
        <div className="text-white text-xl mb-4">PELICULA NO ENCONTRADA</div>
        {/* Botón de regreso */}
        <Link href="/" className="text-red">
          ← VOLVER
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center  text-[#ffe91f] font-extrabold mb-8">
          {/* Botón de regreso */}
          <Link href="/" className="inline-block mb-2">
            &larr; VOLVER
          </Link>
          {/* Titulo de la Pelicula */}
          <h1 className="uppercase text-[#ffe91f] text-5xl md:text-7xl font-extrabold mb-2">
            {movie.title}
          </h1>
          <p className="text-white text-3xl">EPISODIO {movie.episode_id}</p>
        </header>

        {/* Detalle de la Película */}
        <div className="bg-transparent bg-opacity-90 backdrop-blur p-8 border-4 rounded-2xl border-[#ffe91f]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Director */}
            <div>
              <h2 className="text-2xl font-bold mb-1 text-white">Director</h2>
              <p className="text-white text-lg">{movie.director}</p>
            </div>
            {/* Productor */}
            <div>
              <h2 className="text-2xl font-bold mb-1 text-white">Productor</h2>
              <p className="text-white text-xl">{movie.producer}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1 text-white">
                Fecha de estreno
              </h2>
              <p className="text-white text-xl">{movie.release_date}</p>
            </div>
          </div>
          {/* Fecha de Estreno */}

          {/* Opening Crawl */}
          <div className="mb-4 mx-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Opening Crawl</h2>
            <div className="bg-black">
              <p className=" text-justify text-[#ffe91f] italic text-xl">{movie.opening_crawl}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
