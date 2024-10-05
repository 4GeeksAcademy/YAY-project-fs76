import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import ImageUpload from './imageUpload';

const GetUserImages = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const { store, actions } = useContext(Context);

    const fetchImages = async () => {
        try {
            const response = await actions.getUserImages();
            setImages(response.fotos);
        } catch (error) {
            setError("No se pudieron cargar las imágenes.");
        }
    };

    const handleDeleteClick = async (image) => {
        const usuario_id = store.user_id; 
        const public_id = image.split('/').pop().split('.')[0]; // Obtiene el public_id

        try {
            await actions.deleteImage(usuario_id, public_id); // Llama a la acción para eliminar la imagen
            setImages(images.filter((img) => img !== image)); // Actualiza el estado de las imágenes
        } catch (error) {
            setError("No se pudo eliminar la imagen.");
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            <h3>Imágenes del Usuario</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {images.length >= 5 && (
                <p style={{ color: 'orange' }}>Has alcanzado el límite de 5 imágenes.</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {images.map((url, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            style={{ maxWidth: '200px', height: 'auto', margin: '10px' }}
                        />
                        <button 
                            onClick={() => handleDeleteClick(url)} 
                            style={{ position: 'absolute', bottom: '5px', left: '5px' }}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            {images.length < 5 && <ImageUpload fetchImages={fetchImages} />}
        </div>
    );
};

export default GetUserImages;
