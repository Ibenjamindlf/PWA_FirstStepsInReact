import styles from './MovieFilter.module.css';

const MovieFilter = ({ peliculas, filtros, setFiltros }) => {

    const vistas = peliculas.filter(p => p.vista).length;
    const pendientes = peliculas.length - vistas;
    
    const conteoGeneros = peliculas.reduce((acc, p) => {
        const genero = p.genre || 'Sin Género';
        acc[genero] = (acc[genero] || 0) + 1;
        return acc;
    }, {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    // Truco para manejar 2 estados (sortBy y sortOrder)
    const handleSortChange = e => {
        const valor = e.target.value;

        if (!valor) {
            setFiltros( prev => ({ ...prev, sortBy:'', sortOrder: 'desc' }));
        } else {
            const [sortBy, sortOrder] = valor.split('-');
            setFiltros( prev => ({ ...prev, sortBy, sortOrder }));
        }
    };

    const sortValue = filtros.sortBy ? `${filtros.sortBy}-${filtros.sortOrder}` : '';


  return (

    <div className={styles.filterContainer}>

        <div className={styles.topRow}>
            <div className={styles.inputGroup}>
                <label>Búsqueda</label>
                <input 
                    type="text" 
                    name="search"
                    placeholder="Buscar por Título" 
                    value={filtros.search}
                    onChange={handleChange}
                    className={styles.inputElement}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Género</label>
                <select name="genre" value={filtros.genre} onChange={handleChange} className={styles.inputElement}>
                    <option value="">Todos los géneros</option>
                    <option value="Acción">Acción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Drama">Drama</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
            <label>Tipo</label>
            <select name="type" value={filtros.type} onChange={handleChange} className={styles.inputElement}>
                <option value="">Ambos</option>
                <option value="pelicula">Películas</option>
                <option value="serie">Series</option>
            </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Ordenar Por</label>
                <select 
                    value={sortValue} 
                    onChange={handleSortChange} 
                    className={`${styles.inputElement} ${styles.highlightSelect}`}
                >
                    <option value="">Sin orden específico</option>
                    <option value="year-desc">Año (Más reciente)</option>
                    <option value="year-asc">Año (Más antiguo)</option>
                    <option value="rating-desc">Rating (Mayor a menor)</option>
                    <option value="rating-asc">Rating (Menor a mayor)</option>
                </select>
            </div>
        </div>

        <div className={styles.bottomRow}>
        
        <div className={styles.statsWrapper}>
          <span className={styles.statText}>
            <span className={styles.statLabel}>VISTAS:</span> {vistas}
          </span>
          <span className={styles.statText}>
            <span className={styles.statLabel}>PENDIENTES:</span> {pendientes}
          </span>

          
          <div className={styles.genreBadges}>
            {Object.entries(conteoGeneros).map(([genero, cantidad]) => (
              <span key={genero} className={styles.badge}>
                {genero}: {cantidad}
              </span>
            ))}
          </div>
        </div>

        {/* Botón de agregar (Para Benja) */}
        <button className={styles.addBtn} onClick={() => console.log("Benja, conectá tu modal acá!")}>
          + AGREGAR CONTENIDO
        </button>

      </div>

    </div>
  )
}

export default MovieFilter;