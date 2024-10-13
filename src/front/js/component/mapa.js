import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const libraries = ["places", "geometry"];

export const Mapa = ({ setDireccion, initialDireccion }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState(initialDireccion || { lat: 40.1402000, lng: -3.4226700 });
    const [center, setCenter] = useState(initialDireccion || { lat: 40.1402000, lng: -3.4226700 });

    const mapRef = React.useRef();

    useEffect(() => {
        if (initialDireccion) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: initialDireccion }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    const newPosition = {
                        lat: location.lat(),
                        lng: location.lng()
                    };
                    setMarkerPosition(newPosition);
                    setCenter(newPosition);
                    setAddress(initialDireccion);
                } else {
                    console.error("Geocoding failed: " + status);
                }
            });
        }
    }, [initialDireccion]);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                setMarkerPosition(newPosition);
                setCenter(newPosition);
                setAddress(place.formatted_address);
                setDireccion(place.formatted_address, newPosition.lat, newPosition.lng);
                if (mapRef.current) {
                    google.maps.event.addListenerOnce(mapRef.current, 'idle', () => {
                        mapRef.current.panTo(newPosition);
                        mapRef.current.setZoom(15);
                    });
                }
            }
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
                setAddress(results[0].formatted_address);
            }
        });
    };

    const mapContainerStyle = {
        height: "400px",
        width: "800px",
        cursor: 'pointer'
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onPlaceChanged();
        }
    };


    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA"
            libraries={libraries}
        >
            <GoogleMap
                ref={mapRef}
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                onClick={onMapClick} // Agrega el manejador aquí
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
                <Marker position={markerPosition}
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
                />

            </GoogleMap>
        </LoadScript>
    );
};