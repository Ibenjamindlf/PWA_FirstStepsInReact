import React, { useState } from 'react';
import styles from './MovieItem.module.css';
import { MovieItemModal } from '../MovieItemModal/MovieItemModal';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

// NUEVO: Agregamos "alEditar" a las props que recibe el componente
const MovieItem = ({movie, alEliminar, alEditar}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleConfirmDelete = () => {
        alEliminar(movie.id);
        setIsConfirmOpen(false); 
    };

    return (
        <>
            {/* Tarjeta principal */}
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
                            disabled={true} 
                        />
                    </div>

                    <div className={styles.buttonsWrapper}>
                        <button
                            className={styles.infoBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            +Info
                        </button> 
                        
                        <button
                            className={styles.deleteIconBtn}
                            onClick={() => setIsConfirmOpen(true)}
                            title="Eliminar de la lista"
                        >
                            🗑️
                        </button>
                    </div>           
                </div>
            </div>

            {/* Modal de Información y Edición */}
            {isModalOpen && (
                <MovieItemModal 
                    movie={movie} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={alEditar} // CONEXIÓN: Le pasamos la función de guardado
                    onDelete={alEliminar} // CONEXIÓN: Le pasamos la función de eliminado
                />
            )}

            {/* Modal de Confirmación para el botón de la tarjeta */}
            {isConfirmOpen && (
                <ConfirmModal 
                    itemName={movie.title} 
                    onConfirm={handleConfirmDelete} 
                    onCancel={() => setIsConfirmOpen(false)} 
                />
            )}
        </>
    )
}

export default MovieItem;