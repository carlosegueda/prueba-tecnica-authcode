"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movies.map((movie) => ( // ← map PRIMERO
              <Link 
                key={movie.episode_id} // ← KEY en Link
                href={`/peliculas/${movie.episode_id}`}
              >
                <div className="bg-[#d95023] backdrop-blur-sm overflow-hidden shadow-2xl transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-yellow-500/20 border border-yellow-500/30">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-xl font-bold text-[#ebaf5b] truncate">
                        {movie.title}
                      </h2>
                      <span className="bg-red-900 text-gray-900 font-bold text-sm px-2 py-1 rounded-md ml-2">
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