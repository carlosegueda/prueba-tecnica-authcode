//Indica que se ejecuta solo en servidor
'use server';

//Uso de fetchs

//Obtiene todas las peliculas
export async function getMovies() {
  try {
    const res = await fetch('https://swapi.info/api/films', {
      cache: 'force-cache'
    });

    //Manejo de Errores
    if (!res.ok) {
      throw new Error(`Error HTTP! estado: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('No se pudieron cargar las películas');
  }
}

//Obtiene una pelicula por su ID
export async function getMovieById(id) {
  try {
    const res = await fetch('https://swapi.info/api/films', {
      cache: 'force-cache'
    });
    
    //Manejo de Errores
    if (!res.ok) {
      throw new Error(`Error HTTP! estado: ${res.status}`);
    }
    
    const movies = await res.json();
    const movie = movies.find(m => m.episode_id === parseInt(id));

    //Manejo de Errores
    if (!movie) {
      throw new Error('Película no encontrada');
    }
    
    return movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
}