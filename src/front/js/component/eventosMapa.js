import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Context } from '../store/appContext';

const libraries = ["places", "geometry"];

export const EventosMapa = () => {
    const { store, actions } = useContext(Context);
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 40.1402000, lng: -3.4226700 });
    const [zoom, setZoom] = useState(10);
    const [address, setAddress] = useState('');
    const mapContainerStyle = {
        height: "600px",
        width: "800px",
    };

    const mapRef = React.useRef();

    useEffect(() => {
        actions.loadEventosConUsuarios();
    }, []);

    const handleMarkerClick = (evento) => {
        setSelectedEvent(evento);
        setMapCenter({ lat: evento.latitud, lng: evento.longitud });
        setZoom(14);
        setAddress(evento.direccion);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place && place.geometry && place.geometry.location) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                setMapCenter(newPosition);
                setAddress(place.formatted_address);
                if (mapRef.current) {
                    google.maps.event.addListenerOnce(mapRef.current, 'idle', () => {
                        mapRef.current.panTo(newPosition);
                    });
                }
            } else {
                console.error("El lugar seleccionado no tiene una geometría válida:", place);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onPlaceChanged();
        }
    };


    return (
        <div className="d-flex m-5">
            <LoadScript googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA" libraries={libraries}>
                <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={zoom}
                >
                    <Autocomplete
                        onLoad={autocomplete => setAutocomplete(autocomplete)}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Buscar dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{
                                position: 'absolute',
                                top: '50px',
                                left: '10px',
                                zIndex: 1,
                                padding: '10px',
                                width: '300px'
                            }}
                        />
                    </Autocomplete>
                    {store.eventos.map(evento => (
                        <Marker
                            key={evento.id}
                            position={{ lat: evento.latitud, lng: evento.longitud }}
                            onClick={() => handleMarkerClick(evento)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <div className="event-info">
                {selectedEvent ? (
                    <div className='m-5'>
                        <h2>{selectedEvent.nombre}</h2>
                        <p>Fecha: {selectedEvent.fecha}</p>
                        <p>Horario: {selectedEvent.horario}</p>
                        <p>Ubicación: {selectedEvent.direccion}</p>
                        {/* Agrega más información según sea necesario */}
                    </div>
                ) : (
                    <p className='m-5'>Selecciona un evento para ver más información.</p>
                )}
            </div>
        </div>
    );
};