import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export const Landing_Maps = () => {
    const { store, actions } = useContext(Context);
    const libraries = ["places", "geometry"];
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 40.1402000, lng: -3.4226700 });
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


    return (
        <div className="content-space-b-2 content-space-b-lg-3 my-5">
            {/* Title */}
            <div className="w-md-75 w-lg-100 text-center ms-0 p-0 mx-md-auto mb-7 mb-md-9">
                <h1>Encuentra eventos en tu zona <i className="fa-solid fa-map-location-dot"></i></h1>
                <p style={{ color: '#494949', fontSize: '20px' }}>Conocer tu barrio va más allá de reconocer las calles y los edificios; se trata de construir un hogar.
                    <br></br>
                    Conecta con tus vecinos, crea redes de apoyo que enriquecen la vida cotidiana.
                    <br></br>
                    ¡Descubre el poder de la comunidad y transforma tu entorno!
                </p>
            </div>
            {/* End Title */}

            <div className="d-flex m-5 mt-2 justify-content-center">
                <div>
                    <div className="d-flex justify-content-center">
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
                                        borderColor: '#de8f79',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Autocomplete>
                            {store.eventos.map(evento => (
                                 <Marker
                                 key={evento.id}
                                 position={{ lat: evento.latitud, lng: evento.longitud }}
                                 icon={{
                                     url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                                         <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 384 512">
                                             <defs>
                                                 <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                                     <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                                                     <feOffset dx="0" dy="2" result="offsetblur" />
                                                     <feFlood flood-color="rgba(0, 0, 0, 0.5)" />
                                                     <feComposite in2="offsetblur" operator="in" />
                                                     <feMerge>
                                                         <feMergeNode />
                                                         <feMergeNode in="SourceGraphic" />
                                                     </feMerge>
                                                 </filter>
                                             </defs>
                                             <g filter="url(#shadow)">
                                                 <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" fill="#7c488f"/>
                                             </g>
                                         </svg>
                                     `),
                                     scaledSize: new window.google.maps.Size(40, 40) 
                                 }}
                                 onClick={() => handleMarkerClick(evento)}
                             />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="event-info d-flex justify-content-start align-items-center ms-5">
                    {selectedEvent ? (
                        <div className={`card landing-card card-flush card-land mx-4 shadow-none ${isVisible ? 'animate' : ''}`} key={selectedEvent.id} style={{ borderColor: 'none' }}>

                            {/* Card */}
                            <div className="card-pinned card-ancla">
                                <img
                                    className="card-img card-imgagenLand"
                                    style={{ width: '300px', height: 'auto' }}
                                    src="https://fastly.picsum.photos/id/548/480/320.jpg?hmac=F-cPw28Zn_C4ipB9LGe52Azc63qetaHJbX6f9XFosso"
                                    alt="Image Description"
                                />
                            </div>

                            <div className="card-body p-3">
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
                                        <button className='btn' style={{ backgroundColor: '#A7D0CD', color: '#494949', fontWeight: '500' }} onClick={handleShowInfoModal}>Saber más</button>
                                    </div>
                                </div>
                            </div>

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
                                <Link to="/usuarios">
                                    <button className="btn btn-lg mb-3" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Regístrate y YAY</button>
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