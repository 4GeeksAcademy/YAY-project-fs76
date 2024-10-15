import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import ImageUploadPerfil from './imagePerfilUpload'; // Asegúrate de que el nombre y la ruta sean correctos
import "../../styles/imagenes.css";

const GetUserPerfilImage = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { store, actions } = useContext(Context);

    const fetchPerfilImage = async () => {
        try {
            const response = await actions.getUserPerfilImage();
            setImage(response.foto_perfil);
        } catch (error) {
            setError(<span style={{ color: 'grey' }}>Sube una imagen de perfil</span>);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await actions.deletePerfilImage();
            setImage(null);
        } catch (error) {
            setError("No se pudo eliminar la imagen de perfil.");
        }
    };

    useEffect(() => {
        fetchPerfilImage();
    }, []);

    return (
        <div className="perfil-image-container">
            {error && <p className="error-message">{error}</p>}
            {image ? (
                <div className="image-wrapper">
                    <img
                        src={image}
                        alt="Imagen de Perfil"
                        className="perfil-image"
                    />
                    <button 
                        onClick={handleDeleteClick} 
                        className="delete-button"
                    >
                        x
                    </button>
                    
                </div>
            ) : (
                <ImageUploadPerfil fetchPerfilImage={fetchPerfilImage} /> // Este componente se muestra si no hay imagen
            )}
        </div>
    );
};

export default GetUserPerfilImage;