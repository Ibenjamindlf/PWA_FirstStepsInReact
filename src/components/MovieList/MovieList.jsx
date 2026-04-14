import { useState, useEffect } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import MovieFilter from '../MovieFilter/MovieFilter';
import styles from './MovieList.module.css';

const MovieList = ({ movies: initialMovies }) => {
    
  const [peliculas, setPeliculas] = useState( () => {
      const pelisGuardadas = localStorage.getItem('misPeliculas');

      if (pelisGuardadas) {
        return JSON.parse(pelisGuardadas);
      }

      return initialMovies.map( p => ({ ...p, vista: false }));
    });

  const [idArrastrado, setIdArrastrado] = useState(null);

  // --- ESTADO DE LOS FILTROS ---
  const [filtros, setFiltros] = useState({
    search: '',
    genre: '',
    type: '',
    sortBy: '',
    sortOrder: 'desc'
  });

  useEffect(() => {
    localStorage.setItem('misPeliculas', JSON.stringify(peliculas));
  }, [peliculas]);


  const eliminarPelicula = id => {
    setPeliculas(peliculas.filter(p => p.id !== id));
  }

  // NUEVO: Creamos la función para actualizar una película en el estado
  const editarPelicula = (peliculaEditada) => {
    setPeliculas(peliculas.map(p => 
      p.id === peliculaEditada.id ? peliculaEditada : p
    ));
  };

  // Filtrado
  const peliculasFiltradas = peliculas.filter(p => {
    
    const busqueda = filtros.search.toLowerCase();
    const titulo = p.title ? p.title.toLowerCase() : '';
    const coincideTexto = titulo.includes(busqueda);

    const coincideGenero = filtros.genre === '' || (p.genre && p.genre.includes(filtros.genre));

    const tipoDeItem = p.type || 'pelicula';
    const coincideTipo = filtros.type === '' || tipoDeItem === filtros.type;

    return coincideTexto && coincideGenero && coincideTipo;

  }).sort((a, b) => {
    if (!filtros.sortBy) return 0;
    const valA = a[filtros.sortBy];
    const valB = b[filtros.sortBy];
    return filtros.sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const pelisPorVer = peliculasFiltradas.filter( p => !p.vista);
  const pelisVistas = peliculasFiltradas.filter( p => !p.vista);

  return (
    <section id="listado" className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Mi Listado</h2>

      <MovieFilter 
        peliculas={peliculas} 
        filtros={filtros} 
        setFiltros={setFiltros} 
      />
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
            {peliculasFiltradas.filter(p => !p.vista).map((p) => (
              <div 
                key={p.id} 
                className={styles.simpleItem}
                draggable
                onDragStart={() => setIdArrastrado(p.id)}
              >
                {/* NUEVO: Le pasamos la prop alEditar al componente */}
                <MovieItem 
                  movie={p} 
                  alEliminar={eliminarPelicula} 
                  alEditar={editarPelicula} 
                />
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
            {peliculasFiltradas.filter(p => p.vista).map((p) => (
              <div 
                key={p.id} 
                className={`${styles.simpleItem} ${styles.watchedItem}`}
                draggable
                onDragStart={() => setIdArrastrado(p.id)}
              >
                {/* NUEVO: Le pasamos la prop alEditar al componente */}
                <MovieItem 
                  movie={p} 
                  alEliminar={eliminarPelicula} 
                  alEditar={editarPelicula} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MovieList;