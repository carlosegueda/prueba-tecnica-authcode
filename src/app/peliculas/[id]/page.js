'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MovieDetail() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      //Peticion para enlistar peliculas y filtrarlas por ID
      fetch('https://swapi.info/api/films')
        .then(response => response.json())
        .then(data => {
            //Find para hacer match con el ID
          const foundMovie = data.find(m => m.episode_id === parseInt(params.id));
          if (foundMovie) {
            setMovie(foundMovie);
          } else {
            router.push('/');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-white text-xl mb-4">PELICULA NO ENCONTRADA</div>
        {/* Botón de regreso */}
        <Link href="/" className="text-red">
          ← VOLVER
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
            {/* Botón de regreso */}
          <Link href="/" className="inline-block mb-6">
            &larr; VOLVER
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            {movie.title}
          </h1>
          <p className="text-red-200">Episodio {movie.episode_id}</p>
        </header>

        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className=" font-bold mb-2">Director</h2>
              <p className="text-white">{movie.director}</p>
            </div>
            <div>
              <h2 className=" font-bold mb-2">Productor</h2>
              <p className="text-white">{movie.producer}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold mb-2">Fecha de estreno</h2>
            <p className="text-white">{movie.release_date}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold mb-2">Opening Crawl</h2>
            <div className="bg-black">
              <p className="text-white italic">{movie.opening_crawl}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2">Personajes</h3>
              <p className="text-white">{movie.characters?.length || 0}</p>
            </div>
            <div>
              <h3 className="mb-2">Planetas</h3>
              <p className="text-white">{movie.planets?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}