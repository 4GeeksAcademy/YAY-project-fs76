import React, { useContext } from 'react';
import { Context } from '../../store/appContext';
import { Landing_Fondo } from './landing_fondo';

export const Landing_Partner = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className='mb-10 pt-5 pb-5' style={{ position: 'relative', marginInline: '5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 330" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                <style type="text/css">
                    {`
                        .bg-elements-10-0 { fill: none; stroke: #7c488f; }
                        .bg-elements-10-1 { fill: none; stroke: #FFFFFF; }
                        .bg-elements-10-2 { fill: none; stroke: #7c488f; }
                        .bg-elements-10-3 { fill: #7c488f; }
                        .bg-elements-10-4 { fill: #7c488f; } 

                    `}
                </style>
                <g>
                    <defs>
                        <circle id="bgElements10_1" cx="105.5" cy="151.5" r="59" />
                    </defs>
                    <clipPath id="bgElements10_2">
                        <use xlinkHref="#bgElements10_1" style={{ overflow: 'visible' }} />
                    </clipPath>
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="82" y1="56" x2="200.5" y2="174.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="73" y1="56" x2="191.5" y2="174.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="73" y1="65" x2="191.5" y2="183.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="64" y1="65" x2="182.5" y2="183.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="64" y1="74" x2="182.5" y2="192.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="55" y1="74" x2="173.5" y2="192.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="55" y1="83" x2="173.5" y2="201.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="46" y1="83" x2="164.5" y2="201.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="46" y1="92" x2="164.5" y2="210.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="37" y1="92" x2="155.5" y2="210.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="37" y1="101" x2="155.5" y2="219.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="28" y1="101" x2="146.5" y2="219.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="28" y1="110" x2="146.5" y2="228.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="28" y1="119" x2="146.5" y2="237.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="19" y1="119" x2="137.5" y2="237.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="19" y1="128" x2="137.5" y2="246.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="10" y1="128" x2="128.5" y2="246.5" />
                    <line className="bg-elements-10-0" clipPath="url(#bgElements10_2)" opacity=".5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" y1="128" x2="119.5" y2="246.5" />
                </g>
                <g>
                    <defs>
                        <path id="bgElements10_3" d="M1831.9,39.4c-0.1,12.4-0.2,24.4,6.6,35.6c4.9,8.1,12.6,14.1,21.5,17.3c11.7,4,26.5,2.3,36,11.4 c5.1,4.8,7.4,11.8,6.3,18.8c-2.7,18.1-20.4,22.7-36.3,22.9c-18.6,0.3-38.3-3.3-52.7,11.4c-8.5,8.8-12.4,23.3-23.9,29.1 c-16.9,8.6-29.5-12-34.9-25c-4.7-11.8-9.1-23.6-11.5-36.2c-1.3-6.5-1.8-13.4,0.4-19.7c5.2-15.5,21.8-13.2,33.9-19.7 c6.4-3.5,11.1-9,13.8-15.7c4.9-12.2,4.9-25.9,5.8-38.9c0.9-12.3,10.9-27.6,25.4-21.2c6.6,2.9,9.2,9.9,9.6,16.8 c0.1,4.3,0.1,8.7,0.1,13z" />
                    </defs>
                    <use xlinkHref="#bgElements10_3" className="bg-elements-10-4" style={{ overflow: 'visible' }} />
                    <clipPath id="bgElements10_4">
                        <use xlinkHref="#bgElements10_3" style={{ overflow: 'visible' }} />
                    </clipPath>
                    <path className="bg-elements-10-1" clipPath="url(#bgElements10_4)" strokeWidth="3" strokeMiterlimit="10" d="M1770.3,80.9c0,0-13.6,17.3,11.5,49c25.1,31.7,2.8,66.3,2.8,66.3" />
                    <path className="bg-elements-10-1" clipPath="url(#bgElements10_4)" strokeWidth="3" strokeMiterlimit="10" d="M1786,70.4c0,0-13.6,17.3,11.5,49s2.8,66.3,2.8,66.3" />
                    <path className="bg-elements-10-1" clipPath="url(#bgElements10_4)" strokeWidth="3" strokeMiterlimit="10" d="M1797,22.3c0,0-16.6,21.3,14.6,60.5c31.2,39.4,4.2,81.7,4.2,81.7" />
                    <path className="bg-elements-10-1" clipPath="url(#bgElements10_4)" strokeWidth="3" strokeMiterlimit="10" d="M1830.8,13.4c0,0-16.6,21.3,14.6,60.5c31.2,39.3,4.2,81.7,4.2,81.7" />
                </g>
                <circle className="bg-elements-10-2" strokeWidth="4" strokeMiterlimit="10" cx="313.5" cy="77.5" r="21.5" />
                <circle className="bg-elements-10-2" strokeWidth="3" strokeMiterlimit="10" cx="372.2" cy="162" r="10.5" />
                <circle className="bg-elements-10-3" cx="1630" cy="209.4" r="50.7" />
                <g>
                    <line className="bg-elements-10-1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1577" y1="239.4" x2="1624.3" y2="186" />
                    <line className="bg-elements-10-1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1577" y1="266.4" x2="1624.3" y2="213" />
                    <line className="bg-elements-10-1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1577" y1="293.4" x2="1624.3" y2="240" />
                </g>
                </svg>
                <div className="text-center mb-7 content-space-b-2" style={{ position: 'relative', zIndex: 1 }}>
                <div className="mb-7 mt-5 pt-5">
                    <h1 className='h1 mb-3'  style={{ letterSpacing: '3px' }}>¿Quieres organizar eventos en Yay?</h1>
                    <h4 className='mb-3'  style={{fontWeight: '300'}}>Si tienes un negocio, eres una organización, asociación o agrupación, 
                        <br/>
                        no pierdas la oportunidad de darte a conocer y construir comunidad junto a nuestros usuarios. </h4>
                </div>
                <a className="btn btn-transition btn-lg mt-0"  style={{ backgroundColor: '#7c488f', color: 'white' }}>Hazte Partner</a>
            </div>

        </div>
    );
}