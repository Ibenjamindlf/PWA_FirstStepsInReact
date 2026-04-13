import React from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.css';

export const ConfirmModal = ({ itemName, onConfirm, onCancel }) => {
    
    const modalContent = (
        // El overlay oscuro que cierra el modal si hacés clic afuera
        <div className={styles.overlay} onClick={onCancel}>
            
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Ícono de advertencia (opcional pero le da buen toque) */}
                <div className={styles.warningIcon}>⚠️</div>
                
                <h2 className={styles.title}>
                    ¿Estás seguro de eliminar {itemName ? `"${itemName}"` : 'este ítem'}?
                </h2>
                
                <p className={styles.description}>
                    Al confirmar, este ítem desaparecerá de tu listado. Si deseás tenerlo nuevamente, deberás agregarlo de forma manual.
                </p>

                <div className={styles.actionButtons}>
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );

    // Lo teletransportamos al body
    return createPortal(modalContent, document.body);
};