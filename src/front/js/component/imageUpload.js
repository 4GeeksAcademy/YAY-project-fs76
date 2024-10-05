import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux

const ImageUpload = () => {
    const [file, setFile] = useState(null); // Para el archivo seleccionado
    const [imageUrl, setImageUrl] = useState(""); // Para almacenar la URL de la imagen subida
    const [error, setError] = useState(null); // Para manejar errores
    const { actions } = useContext(Context); // Acceder a las acciones de Flux

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setError(null); // Limpiar errores previos
        } else {
            setError("Por favor, selecciona un archivo de imagen válido.");
        }
    };

    const handleUpload = () => {
        if (file) {
          actions.uploadImage(file)
            .then((data) => {
              setImageUrl(data.url); // Almacenar la URL de la imagen devuelta por el servidor
              console.log("ImageUrl:", imageUrl); // Add this line to check the imageUrl value
            })
            .catch((error) => setError("Hubo un problema al subir la imagen."));
        }
      };

      return (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Subir Imagen</button>
      
          {/* Mostrar errores si los hay */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      
          {/* Mostrar la imagen subida si existe una URL */}
          {imageUrl ? (
            <img src={imageUrl} alt="Imagen subida" style={{ marginTop: '20px', maxWidth: '100%' }} key={imageUrl} />
          ) : (
            <div>
              {/* Agregar un indicador de carga o una imagen de placeholder */}
              <p>Cargando imagen...</p>
            </div>
          )}
        </div>
      );
};

export default ImageUpload;
