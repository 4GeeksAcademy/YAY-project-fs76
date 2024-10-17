import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CustomMarker } from '../customMarker';
import { GetEventoImage } from '../getEventoImage';
import { Link } from 'react-router-dom';


export const Landing_Maps = () => {
    const { store, actions } = useContext(Context);
    const libraries = ["places", "geometry"];
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 41.39124311587592, lng: 2.1558980676717767 });
    const [zoom, setZoom] = useState(15);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [inscripcionIds, setInscripcionIds] = useState([]);
    const [interes, setInteres] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [mapType, setMapType] = useState('satellite');
    const [isVisible, setIsVisible] = useState(false);
    const params = useParams();
    const mapContainerStyle = {
        position: 'relative',
        height: "600px",
        width: "75rem",
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
    };


    const mapRef = React.useRef();

    useEffect(() => {
        actions.loadInscripciones()
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
        const handleScroll = () => {
            const cardTop = document.querySelector('.landing-card').getBoundingClientRect().top;
            const scrollPosition = window.scrollY + window.innerHeight;
            if (scrollPosition > cardTop) {
                setIsVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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

    const handleShowInfoModal = () => {
        setShowModalInfo(true);
    };

    console.log('Inscripciones:', inscripcionIds);

    const setInscripcionIdForEvento = (eventoId, id) => {
        setInscripcionIds(prev => ({ ...prev, [eventoId]: id }));
        console.log('Inscripcion IDs:', inscripcionIds);
    };

    const handleMapTypeChange = (type) => {
        setMapType(type);
    };

    const onMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPosition }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const formattedAddress = results[0].formatted_address;
                setAddress(formattedAddress); // Actualiza el estado del input
                setDireccion(formattedAddress, newPosition.lat, newPosition.lng); // Llama a setDireccion
            }
        });
    };



    return (
        <div className="content-space-b-2 content-space-b-lg-3 mt-5 mb-0">
            {/* Title */}
            <div className="w-md-75 w-lg-100 text-center ms-0 p-0 mx-md-auto mb-7 mb-md-9">
                <h1 className='display-3'>Encuentra eventos en tu zona <i className="fa-solid fa-map-location-dot"></i></h1>
                <h4>
                    Conocer tu barrio va más allá de reconocer las calles y los edificios; se trata de construir un hogar.
                    <br></br>
                    Conecta con tus vecinos, crea redes de apoyo que enriquecen la vida cotidiana.
                    <br></br>
                    ¡Descubre el poder de la comunidad y transforma tu entorno!
                </h4>
            </div>
            {/* End Title */}

            <div className="d-flex m-5 mt-2 justify-content-center">
                <div>
                    <div className="d-flex justify-content-start">
                        {/* Nav */}
                        <ul className="nav navMap nav-segment mb-3" id="featuresTab" role="tablist" >
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" href="#forSatellite" id="forSatellite-tab" data-bs-toggle="tab" data-bs-target="#forSatellite" role="tab" aria-controls="forSatellite" aria-selected="true"
                                    onClick={() => handleMapTypeChange('satellite')}
                                    style={{ fontWeight: '500' }}>
                                    satélite</a>
                            </li>
                            <li className="nav-item" role="presentation" >
                                <a className="nav-link" href="#forRoad" id="forRoad-tab" data-bs-toggle="tab" data-bs-target="#forRoad" role="tab" aria-controls="forRoad" aria-selected="false" tabIndex="-1"
                                    onClick={() => handleMapTypeChange('roadmap')}
                                    style={{ fontWeight: '500' }}>básico</a>
                            </li>

                        </ul>
                        {/* End Nav */}
                    </div>

                    <LoadScript googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA" libraries={libraries}>

                        <GoogleMap

                            mapContainerStyle={mapContainerStyle}
                            center={mapCenter}
                            zoom={zoom}
                            mapTypeId={mapType}
                            onClick={onMapClick}
                        // options={mapOptions} 
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
                                        top: '10px',
                                        left: '10px',
                                        zIndex: 1,
                                        padding: '10px',
                                        width: '500px',
                                        borderColor: '#7c488f',
                                        borderRadius: '5px'
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
                <div className="event-info d-flex justify-content-center align-items-center ms-5">
                    {selectedEvent ? (
                        <div key={selectedEvent.id} className="col mb-3">
                            {/* Card */}
                            <div className={`card landing-card card-flush card-land h-100 ${isVisible ? 'animate' : ''}`}>
                                <div className="card-pinned card-ancla">
                                    <div className="card-img card-imgagenLand no-hover">
                                        <GetEventoImage
                                            eventoId={selectedEvent.id}
                                            setImagenUrl={(url) => {
                                                if (selectedEvent && selectedEvent.foto_evento) {
                                                    selectedEvent.foto_evento = url;
                                                }
                                            }}
                                            partnerId={selectedEvent.partner_id === parseInt(localStorage.getItem("partner_id"))}
                                        />                               
                                        </div>
                                </div>
                                {/* Body */}
                                <div className="card-body margen-body">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-12">
                                            <span><i className="fa-solid fa-calendar-days" style={{ color: '#7c488f' }}></i> {selectedEvent.fecha}</span>
                                            <h3 className="card-title text-inherit mb-3">{selectedEvent.nombre}</h3>
                                            <div className='descripcion-card'>
                                                <span >{selectedEvent.breve_descripcion}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-end mb-3">
                                            <button className='btn' style={{ backgroundColor: '#7c488f', color: 'white', fontWeight: '500' }} onClick={handleShowInfoModal}>Saber más</button>
                                        </div>
                                    </div>
                                </div>
                                {/* End Body */}
                            </div>
                            {/* End Card */}

                        </div>
                    ) : (
                        <div className='d-flex flex-column align-items-center justify-content-center text-center w-100 mx-5 mt-5'>
                            <h3 style={{ color: '#7c488f', fontWeight: '300' }}>Selecciona un evento en el mapa para ver más información</h3>
                            <img
                                src='https://i.ibb.co/6BTLRVj/mapa-click.png'
                                style={{ maxHeight: '150px', width: 'auto', display: 'block', marginLeft: '50px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Tab Content */}
            <div className="tab-content" id="houseHeroTabContent">
                <div className="tab-pane fade show active" id="forSatellite" role="tabpanel" aria-labelledby="forSatellite-tab">
                    <div className="row gx-3">

                    </div>
                </div>
            </div>

            {showModalInfo && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Detalles del Evento</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModalInfo(false)} aria-label="Close" onFocus={(e) => e.target.blur()}></button>                            </div>
                            <div className="modal-body text-center mt-3">
                                <h5>¿Quieres saber más de este evento?</h5>
                                <Link to="/signup">
                                    <button className="btn btn-lg my-3" style={{ backgroundColor: '#7c488f', color: 'white' }}>Regístrate y YAY</button>
                                </Link>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalInfo(false)} onFocus={(e) => e.target.blur()}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};