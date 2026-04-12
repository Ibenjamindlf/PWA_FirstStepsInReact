import React, { useState } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MovieList.module.css';

const MovieList = ({ movies: initialMovies }) => {
    
  const [peliculas, setPeliculas] = useState(
    initialMovies.map(p => ({ ...p, vista: false }))
  );

  const [idArrastrado, setIdArrastrado] = useState(null);

  const eliminarPelicula = id => {
    setPeliculas(peliculas.filter(p => p.id !== id));
  }

  return (
    <section id="listado" className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Mi Listado</h2>

      <div className={styles.columnsContainer}>
        
        {/* COLUMNA IZQUIERDA (POR VER) */}
        <div 
          className={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            setPeliculas(peliculas.map(p => p.id === idArrastrado ? { ...p, vista: false } : p));
          }}
        >
          <h3 className={styles.columnTitle}>Por ver</h3>
          <div className={styles.simpleList}>
            {peliculas.filter(p => !p.vista).map((p) => (
              <div 
                key={p.id} 
                className={styles.simpleItem}
                draggable
                onDragStart={() => setIdArrastrado(p.id)}
              >
                <MovieItem movie={p} alEliminar={eliminarPelicula} />
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA (VISTAS) */}
        <div 
          className={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            setPeliculas(peliculas.map(p => p.id === idArrastrado ? { ...p, vista: true } : p));
          }}
        >
          <h3 className={styles.columnTitle}>Vistas</h3>
          <div className={styles.simpleList}>
            {peliculas.filter(p => p.vista).map((p) => (
              <div 
                key={p.id} 
                className={`${styles.simpleItem} ${styles.watchedItem}`}
                draggable
                onDragStart={() => setIdArrastrado(p.id)}
              >
                <MovieItem movie={p} alEliminar={eliminarPelicula} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MovieList;