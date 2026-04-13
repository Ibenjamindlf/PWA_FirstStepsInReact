import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieItemModal.module.css';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'; // Importamos el modal de confirmación

export const MovieItemModal = ({ movie, onClose, onSave, onDelete }) => {
    // Estados para manejar la edición y la confirmación de eliminación
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...movie });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    if (!movie) return null;

    // Función para actualizar el estado del formulario mientras el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para guardar los cambios
    const handleSave = () => {
        onSave(formData); // Ejecutamos la función que vendrá del padre
        setIsEditing(false); // Volvemos a la vista normal
    };

    // Función para confirmar la eliminación desde este modal
    const handleConfirmDelete = () => {
        onDelete(movie.id);
        setIsConfirmOpen(false);
        onClose(); // Cerramos también este modal de detalles
    };

    const modalContent = (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()} 
            >
                <button className={styles.closeIcon} onClick={onClose} aria-label="Cerrar modal">
                    &times;
                </button>

                <div className={styles.modalBody}>
                    <div className={styles.textColumn}>
                        
                        {/* RENDERIZADO CONDICIONAL: Modo Edición vs Modo Vista */}
                        {isEditing ? (
                            <div className={styles.editForm}>
                                <input name="title" value={formData.title} onChange={handleChange} className={styles.editInput} placeholder="Título" />
                                <input name="year" type="number" value={formData.year} onChange={handleChange} className={styles.editInput} placeholder="Año" />
                                <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} className={styles.editInput} placeholder="Puntaje" />
                                <input name="genre" value={formData.genre} onChange={handleChange} className={styles.editInput} placeholder="Género" />
                                <input name="director" value={formData.director} onChange={handleChange} className={styles.editInput} placeholder="Director" />
                                <input name="production" value={formData.production} onChange={handleChange} className={styles.editInput} placeholder="Producción" />
                                <input name="actors" value={formData.actors} onChange={handleChange} className={styles.editInput} placeholder="Elenco" />
                                <textarea name="review" value={formData.review} onChange={handleChange} className={styles.editTextarea} rows="4" placeholder="Sinopsis"></textarea>
                            </div>
                        ) : (
                            <>
                                <h2 className={styles.title}>
                                    {movie.title} <span className={styles.year}>({movie.year})</span>
                                </h2>
                                
                                <div className={styles.badges}>
                                    <span className={styles.rating}>⭐ {movie.rating}</span>
                                    <span className={styles.genre}>{movie.genre || 'Género no definido'}</span>
                                </div>

                                <div className={styles.infoGrid}>
                                    <p><strong>Director:</strong> {movie.director || 'No especificado'}</p>
                                    <p><strong>Producción:</strong> {movie.production || 'No especificada'}</p>
                                    <p className={styles.fullWidth}><strong>Elenco:</strong> {movie.actors || 'No especificado'}</p>
                                </div>

                                <div className={styles.review}>
                                    <h3>Sinopsis</h3>
                                    <p>{movie.review || 'No hay reseña disponible para esta película.'}</p>
                                </div>
                            </>
                        )}

                        {/* Botones de Acción */}
                        <div className={styles.actionButtons}>
                            {isEditing ? (
                                <>
                                    <button className={styles.saveBtn} onClick={handleSave}>Guardar</button>
                                    <button className={styles.closeBtn} onClick={() => setIsEditing(false)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Editar</button>
                                    <button className={styles.deleteBtn} onClick={() => setIsConfirmOpen(true)}>Eliminar</button>
                                    <button className={styles.closeBtn} onClick={onClose}>Cerrar</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.imageColumn}>
                        <img 
                            src={movie.image || "https://via.placeholder.com/300x450/1e293b/7c3aed?text=Poster+No+Disponible"} 
                            alt={`Poster de ${movie.title}`} 
                            className={styles.poster}
                        />
                    </div>
                </div>
            </div>

            {/* Modal de confirmación por encima de este modal */}
            {isConfirmOpen && (
                <ConfirmModal 
                    itemName={movie.title} 
                    onConfirm={handleConfirmDelete} 
                    onCancel={() => setIsConfirmOpen(false)} 
                />
            )}
        </div>
    );

    return createPortal(modalContent, document.body);
};