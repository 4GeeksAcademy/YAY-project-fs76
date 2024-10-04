import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const libraries = ["places", "geometry"];

export const Mapa = () => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState({ lat: 40.1402000, lng: -3.4226700 });
    const [center, setCenter] = useState({ lat: 40.1402000, lng: -3.4226700 });


    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                setMarkerPosition(newPosition);
                setCenter(newPosition); // Update the center state
                setAddress(place.formatted_address); // Update the address state
                if (mapRef.current) {
                    google.maps.event.addListenerOnce(mapRef.current, 'idle', () => {
                        mapRef.current.panTo(newPosition);
                    });
                }
            }
        }
    };

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    };

    const mapRef = React.useRef();

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA"
            libraries={libraries}
        >
            <GoogleMap
                ref={mapRef}
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
                <Autocomplete
                    onLoad={autocomplete => setAutocomplete(autocomplete)}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Buscar dirección"
                        value={address} // Asigna el estado al input
                        onChange={(e) => setAddress(e.target.value)}
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
                <Marker position={markerPosition} />
            </GoogleMap>
        </LoadScript>
    );
};