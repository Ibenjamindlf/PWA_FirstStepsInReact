import React, { useState } from 'react';
import styles from './MovieItem.module.css';


const MovieItem = ({movie, alEliminar}) => {
    
    const [expandido, setExpandido] = useState(false);
    const [editando, setEditando] = useState(false);

    return (
        <div className={styles.card}>

            <div className={styles.header}>

                <div className={styles.titleWrapper}>
                    <img 
                        src={movie.image || "https://via.placeholder.com/50x75/1e293b/a78bfa?text=IMG"} 
                        alt="Miniatura" 
                        className={styles.thumbnail} 
                    />
                    
                    <input 
                        type="text"
                        defaultValue={movie.title}
                        className={`${styles.titleInput} ${movie.vista ? styles.titleWatched : ''}`}
                        disabled={!editando}  
                    />
                </div>

                <button
                    className={styles.infoBtn}
                    onClick={() => setExpandido(!expandido)}
                >
                    {expandido ? 'Cerrar' : '+Info'}

                </button>            

            </div>

            {expandido && (
                <div className={styles.details}>

                    <div className={styles.posterContainer}>
                        <img 
                            src={movie.image || "https://via.placeholder.com/400x600/1e293b/a78bfa?text=Póster+No+Disponible"} 
                            alt={`Póster de ${movie.title}`} 
                            className={styles.largePoster} 
                        />
                    </div>

                    <div className={styles.field}>

                        <label>Genero</label>
                        <select defaultValue={movie.genre} disabled={!editando}>
                            <option value="Acción">Acción</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Drama">Drama</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                        </select>

                    </div>

                    <div className={styles.field}>
                        <label>Director:</label>
                        <input type="text" defaultValue={movie.director} disabled={!editando} />
                    </div>

                    <div className={styles.field}>
                        <label>Año:</label>
                        <input type="number" defaultValue={movie.year} disabled={!editando} />
                    </div>

                    <div className={styles.field}>
                        <label>Tipo:</label>
                        <select defaultValue={movie.type} disabled={!editando}>
                        <option value="pelicula">Película</option>
                        <option value="serie">Serie</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Rating (0-10):</label>
                        <input type="number" min="0" max="10" defaultValue={movie.rating} disabled={!editando} />
                    </div>

                    <div className={styles.field}>
                        <label>Reseña:</label>
                        <textarea 
                            defaultValue={movie.review} 
                            disabled={!editando} 
                            rows="4" 
                            className={styles.reviewArea}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={editando ? styles.saveBtn : styles.editBtn}
                            onClick={() => setEditando(!editando)}
                        >
                            {editando ? 'Guardar' : 'Editar'}
                        </button>

                        <button
                            className={styles.deleteBtn}
                            onClick={() => alEliminar(movie.id)}
                        >Eliminar
                        </button>

                    </div>

                </div>
            )}


        </div>
    )
}

export default MovieItem;