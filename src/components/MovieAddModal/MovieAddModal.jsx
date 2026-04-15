import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieAddModal.module.css';

export const MovieAddModal = ({ onClose, onSave }) => {
    // Estado inicial vacío para una nueva película/serie
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        rating: '',
        genre: '',
        director: '',
        production: '',
        actors: '',
        review: '',
        image: '',
        type: 'pelicula' // Por defecto
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // La comente por que esta bueno que este pero no con un alert
        // Validación básica (mínimo que tenga título)
        // if (!formData.title.trim()) {
        //     alert('El título es obligatorio');
        //     return;
        // }

        // Ejecutamos la función de guardado enviada por el padre
        onSave(formData);
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

                <h2 className={styles.title}>Agregar Nuevo Contenido</h2>
                <p className={styles.subtitle}>Completa los datos para sumar a tu lista.</p>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.inputGrid}>
                        <input name="title" value={formData.title} onChange={handleChange} className={styles.inputField} placeholder="Título (Obligatorio)*" required />
                        
                        <select name="type" value={formData.type} onChange={handleChange} className={styles.inputField}>
                            <option value="pelicula">Película</option>
                            <option value="serie">Serie</option>
                        </select>

                        <input name="year" type="number" value={formData.year} onChange={handleChange} className={styles.inputField} placeholder="Año" />
                        <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} className={styles.inputField} placeholder="Puntaje (ej. 8.5)" />
                        
                        <select name="genre" value={formData.genre} onChange={handleChange} className={styles.inputField}>
                            <option value="">Selecciona un género...</option>
                            <option value="Acción">Acción</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Drama">Drama</option>
                            <option value="Thriller">Thriller</option>
                        </select>

                        <input name="director" value={formData.director} onChange={handleChange} className={styles.inputField} placeholder="Director / Creador" />
                        <input name="production" value={formData.production} onChange={handleChange} className={styles.inputField} placeholder="Producción / Estudio" />
                        <input name="actors" value={formData.actors} onChange={handleChange} className={styles.inputField} placeholder="Elenco principal" />
                        <input name="image" value={formData.image} onChange={handleChange} className={`${styles.inputField} ${styles.fullWidth}`} placeholder="URL de la imagen (Poster)" />
                        
                        <textarea name="review" value={formData.review} onChange={handleChange} className={`${styles.inputField} ${styles.fullWidth}`} rows="4" placeholder="Sinopsis o Reseña"></textarea>
                    </div>

                    <div className={styles.actionButtons}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
                        <button type="submit" className={styles.saveBtn}>Guardar Contenido</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};