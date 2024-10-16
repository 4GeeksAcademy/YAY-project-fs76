import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import ImageUpload from './imageUpload'; // Asegúrate de que el nombre y la ruta sean correctos
import "../../styles/imagenes.css";

const GetUserImages = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [error, setError] = useState(null);
    const { store, actions } = useContext(Context);

    const fetchImages = async () => {
        try {
            const response = await actions.getUserImages();
            setImages(response.fotos);
        } catch (error) {
            setError(<span style={{ color: 'grey' }}>Completa para que los demás puedan conocerte</span>);
        }
    };

    const handleDeleteClick = async (image) => {
        const usuario_id = store.user_id; 
        const public_id = image.split('/').pop().split('.')[0]; 
        
        try {
            await actions.deleteImage(usuario_id, public_id);
            setImages(images.filter((img) => img !== image));
        } catch (error) {
            setError("No se pudo eliminar la imagen.");
        }
    };

    const handleImageClick = (url) => {
        setSelectedImage(url); // Establece la imagen seleccionada
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
        setSelectedImage(null); // Limpia la imagen seleccionada
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="user-gallery-container">
            <h3 className="user-gallery-title">Tu galería de imágenes</h3>
            {error && <p className="user-gallery-error-message">{error}</p>}
            <div className="user-gallery-wrapper">
                {images.map((url, index) => (
                    <div key={index} className="user-gallery-image-card">
                        <img
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            className="user-gallery-image"
                            onClick={() => handleImageClick(url)} 
                        />
                        <button 
                            onClick={() => handleDeleteClick(url)} 
                            className="user-gallery-delete-button"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>

            {images.length < 5 && <ImageUpload fetchImages={fetchImages} />}

            {isModalOpen && (
                <div className="user-gallery-modal" onClick={closeModal}>
                    <div className="user-gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="user-gallery-modal-close" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Imagen grande" className="user-gallery-modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetUserImages;
