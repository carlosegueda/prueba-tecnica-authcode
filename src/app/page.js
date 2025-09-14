"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 

export default function Home() {
  //Estados de peliculas y circulo de carga
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  //Peticion para enlistar las peliculas
  useEffect(() => {
    //URL del swapi para peliculas (swapi.info)
    fetch("https://swapi.info/api/films")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    //Fondo
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center m-0 mb-6 p-0">
          <img src="sw-logo.png" className="w-66 h-40 mx-auto m-0" />
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ebaf5b]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movies.map((movie) => ( 
              <Link 
                key={movie.episode_id}
                href={`/peliculas/${movie.episode_id}`}
              >
                {/* Cajas de Cada Pelicula */}
                <div className="bg-trasparent backdrop-blur-lg overflow-hidden shadow-2xl transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-white-500/20 border-4 rounded-2xl border-[#ffe91f]">
                  <div className="p-6 items-center">
                    <div className="flex items-center justify-between mb-4">
                      {/* Titulo de Película */}
                      <h2 className="uppercase text-2xl font-bold text-white truncate">
                        {movie.title}
                      </h2>
                      {/* No. de Episodio */}
                      <span className="bg-white text-black font-bold text-xl px-2 py-1 rounded-md">
                        EP {movie.episode_id}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}