import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import ImageUploadPerfil from './imagePerfilUpload';

const GetUserPerfilImage = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { store, actions } = useContext(Context);

    const fetchPerfilImage = async () => {
        try {
            // Llama a la acción para obtener la imagen de perfil
            const response = await actions.getUserPerfilImage(); 
            setImage(response.foto_perfil); // Actualiza el estado de la imagen
        } catch (error) {
            setError("No se pudo cargar la imagen de perfil.");
        }
    };

    const handleDeleteClick = async () => {
        try {
            await actions.deletePerfilImage(); // Llama a la acción para eliminar la imagen
            setImage(null); // Actualiza el estado de la imagen
        } catch (error) {
            setError("No se pudo eliminar la imagen de perfil.");
        }
    };

    useEffect(() => {
        fetchPerfilImage(); // Llama a la función al montar el componente
    }, []);

    return (
        <div>
            <h3>Imagen de Perfil</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {image ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={image}
                        alt="Imagen de Perfil"
                        style={{ maxWidth: '200px', height: 'auto', margin: '10px' }}
                    />
                    <button 
                        onClick={handleDeleteClick} 
                        style={{ position: 'absolute', bottom: '5px', left: '5px' }}
                    >
                        Eliminar
                    </button>
                </div>
            ) : (
                <ImageUploadPerfil fetchPerfilImage={fetchPerfilImage} /> // Muestra el componente de carga si no hay imagen
            )}
        </div>
    );
};

export default GetUserPerfilImage;
