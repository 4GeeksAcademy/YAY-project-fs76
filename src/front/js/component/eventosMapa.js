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
        width: "900px",
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
            <div>
            <h2 className="mb-2">Eventos disponibles <i class="fa-solid fa-map-location-dot"></i></h2>
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
            </div>
            <div className="event-info">
                {selectedEvent ? (
                    <div className="container w-100 d-flex justify-content-center">
                        <div className="card ms-5 mt-2" key={selectedEvent.id} style={{ borderColor: '#ffc107' }}>
                            <img src="https://cdn-icons-png.freepik.com/512/3544/3544735.png" alt="profileImage" className="card-img-top rounded-circle mx-auto mt-3" style={{ width: 'auto', height: '200px' }} />
                            <div className="card-body text-center">
                                <h2 className="card-title">{selectedEvent.nombre}</h2>
                                <p className="card-text">Fecha: {selectedEvent.fecha}</p>
                                <p className="card-text">Horario: {selectedEvent.horario}</p>
                                <p className="card-text">Ubicación: {selectedEvent.direccion}</p>
                                <p className="card-text">Descripción: {selectedEvent.descripción}</p>
                                <p className="card-text">Plazas: {selectedEvent.cupo}</p>
                                <p className="card-text">Dificultad: {selectedEvent.dificultad}</p>
                                <p className="card-text">Accesibilidad: {selectedEvent.accesibilidad}</p>
                                <p className="card-text">Precio: {selectedEvent.precio}</p>
                                <p className="card-text">Observaciones: {selectedEvent.observaciones}</p>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className='d-flex flex-column align-items-center text-center w-100'>
                        <h3 className='m-5' style={{color:  '#7c488f'}}>Selecciona un evento para ver más información</h3>
                        <img src='https://i.ibb.co/6BTLRVj/mapa-click.png' style={{ maxHeight: '200px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};