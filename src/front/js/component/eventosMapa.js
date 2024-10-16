import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Inscripciones } from './inscripciones';
import { CustomMarker } from './customMarker';
import { GetEventoImage } from './getEventoImage';

const libraries = ["places", "geometry"];

export const EventosMapa = () => {
    const { store, actions } = useContext(Context);
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 41.39124311587592, lng: 2.1558980676717767 });
    const [zoom, setZoom] = useState(15);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [inscripcionIds, setInscripcionIds] = useState([]);
    const [interes, setInteres] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const mapContainerStyle = {
        height: "600px",
        width: "900px",
    };

    const mapRef = React.useRef();

    useEffect(() => {
        actions.loadInscripciones()
        const userId = actions.getUserId();
        if (userId) {
            actions.getProfile(userId).then(profile => {
                if (profile && profile.latitud && profile.longitud) {
                    setMapCenter({ lat: profile.latitud, lng: profile.longitud });
                    setZoom(14);
                }
            }).catch(error => {
                console.error("Error al obtener el perfil del usuario:", error);
            });
        } else {
            console.error("No se pudo obtener el userId.");
        }
        actions.loadEventosConUsuarios().then(() => {
            const eventoId = parseInt(params.theid);
            actions.getInteresPorEvento(eventoId).then((data) => {
                if (data) {
                    setInteres(data);
                }
            }).catch(error => {
                console.error("Error al cargar el interés:", error);
            });
        }).catch(error => {
            console.error("Error al cargar eventos:", error);
        });


    }, []);

    const handleMarkerClick = (evento) => {
        setSelectedEvent(evento);
        setMapCenter({ lat: evento.latitud, lng: evento.longitud });
        setZoom(15);
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
                        mapRef.current.setZoom(15);
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

    const onMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkerPosition(newPosition);
        setCenter(newPosition);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPosition }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const formattedAddress = results[0].formatted_address;
                setAddress(formattedAddress); // Actualiza el estado del input
                setDireccion(formattedAddress, newPosition.lat, newPosition.lng); // Llama a setDireccion
            }
        });
    };


    console.log('Inscripciones:', inscripcionIds);

    const setInscripcionIdForEvento = (eventoId, id) => {
        setInscripcionIds(prev => ({ ...prev, [eventoId]: id }));
        console.log('Inscripcion IDs:', inscripcionIds);
    };


    return (
        <div className="container d-flex  justify-content-center">
            <div className="container d-flex m-5 justify-content-center">
                <div className='ms-5'>
                    <div className="d-flex justify-content-between">
                        <h2 className="mb-2">Eventos disponibles <i className="fa-solid fa-map-location-dot"></i></h2>
                        <button className="custom-button btn btn-lg mb-3"
                            onClick={() => navigate(`/eventos`)}
                            style={{
                                borderColor: '#ffc107',
                                color: '#494949'
                            }}
                        >
                            Ver en Lista  <i className="fa-solid fa-rectangle-list" style={{ color: '#7c488f' }}></i>
                        </button>
                    </div>
                    <LoadScript googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA" libraries={libraries}>

                        <GoogleMap
                            ref={mapRef}
                            mapContainerStyle={mapContainerStyle}
                            center={mapCenter}
                            zoom={zoom}
                            onClick={onMapClick}
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
                                <CustomMarker
                                    key={evento.id}
                                    evento={evento}
                                    position={{ lat: evento.latitud, lng: evento.longitud }}
                                    onClick={() => handleMarkerClick(evento)}
                                />

                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>

                {selectedEvent ? (
                    <div className='d-flex flex-column align-items-center justify-content-cente mt-5 ms-5' style={{ marginInline: 'auto' }}>
                        <div className="card-pinned card-ancla p-0" >
                            <div className=" mt-2" key={selectedEvent.id} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', marginBottom: '10px', width: '500px' }}>
                                <div style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', margin: '0', padding: '0', overflow: 'hidden' }}>
                                    <GetEventoImage
                                        eventoId={selectedEvent.id}
                                        setImagenUrl={(url) => selectedEvent.foto_evento = url}
                                        partnerId={selectedEvent.partner_id === parseInt(localStorage.getItem("partner_id"))}
                                    />
                                </div>

                                <div className="card-body mx-3" >
                                <div className="row mb-3 px-0  text-center" style={{backgroundColor: '#7c488f'}}>
                                    <h1 className="card-title text-white pb-2" style={{ fontSize: '2rem' }}>{selectedEvent.nombre}</h1>
</div>
                                    {/* Distribución de información en filas y columnas */}
                                    <div className="row mb-3">
                                    <div className="col-md-12 mx-auto">
                                        <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Fecha</b>: {selectedEvent.fecha}</p>
                                    </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Horario</b>: {selectedEvent.horario}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Accesibilidad</b>: {selectedEvent.accesibilidad ? 'Sí' : 'No'}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Descripción</b>: {selectedEvent.descripción}</p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Plazas</b>: {selectedEvent.cupo}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Precio</b>: {selectedEvent.precio} €</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                    <div className="col-md-12 ">
                                        <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Dificultad</b>: {selectedEvent.dificultad}</p>
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <div className="col-md-12">
                                        <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Interés</b>: {interes ? interes.nombre : 'No especificado'}</p>
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <div className="col-md-12">
                                        <p className="card-text text-muted" style={{ fontSize: '1.2rem' }}><b>Observaciones</b>: {selectedEvent.observaciones}</p>
                                    </div>
                                    </div>
                                    <div className="row mb-3">
                                    <div className="col-md-12">
                                        <p className="card-text text-muted mb-3" style={{ fontSize: '1.2rem' }}><b>Ubicación</b>: {selectedEvent.direccion}</p>
                                    </div>
                                    </div>
                                    <div className="row mb-5 pb-5 text-center d-flex justify-content-center">
                                    <Inscripciones
                                        usuarioId={actions.getUserId()}
                                        eventoId={selectedEvent.id}
                                        nombreEvento={selectedEvent.nombre}
                                        inscripcionId={inscripcionIds[selectedEvent.id]}
                                        setInscripcionId={(id) => setInscripcionIdForEvento(selectedEvent.id, id)}
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>


                ) : (
                    <div className='d-flex flex-column align-items-center justify-content-center text-center w-100 ms-5'>
                        <h3 className='mx-5 mt-5 mb-3' style={{ color: '#7c488f' }}>Selecciona un evento en el mapa para ver más información</h3>
                        <img src='https://i.ibb.co/6BTLRVj/mapa-click.png' style={{ maxHeight: '200px', marginLeft: '60px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};