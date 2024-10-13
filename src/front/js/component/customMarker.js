import React from 'react';
import { Marker } from '@react-google-maps/api';

export const CustomMarker = ({ evento, onClick, position }) => {
    return (
        <Marker
            key={evento.id}
            position={position} 
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
            onClick={onClick}
        />
    );
};
