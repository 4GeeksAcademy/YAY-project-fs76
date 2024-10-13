import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';

export const Landing_Header = () => {
    const { store, actions } = useContext(Context);
    const [text, setText] = useState('');
    const strings = [' a ti', ' reir', ' bailar', ' crear', ' vivir',];
    let index = 0;
    let charIndex = 0;
    let typingSpeed = 90;
    let backSpeed = 30;
    let backDelay = 2500;
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const type = () => {
            if (charIndex < strings[index].length) {
                setText(prev => prev + strings[index][charIndex]);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setBlink(true);
                setTimeout(() => {
                    setTimeout(() => {
                        setBlink(false);
                        backspace();
                    }, backDelay);
                }, backSpeed);
            }
        };

        const backspace = () => {
            if (charIndex > 0) {
                setText(prev => prev.slice(0, -1));
                charIndex--;
                setTimeout(backspace, backSpeed);
            } else {
                index = (index + 1) % strings.length;
                charIndex = 0;
                setTimeout(type, typingSpeed);
            }
        };

        type();
    }, []);


    return (
        <>
            <div className="row w-100 d-flex justify-content-center mt-5 text-center">
                <h3 className="p-0" style={{
                    backgroundColor: '#a7d0cdbd',
                    color: '#494949',
                    letterSpacing: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ margin: '0', display: 'inline' }}>·</h1>
                    <span style={{ margin: '0 10px', display: 'inline', fontSize:'35px'}}>HAZ DE TU BARRIO UN HOGAR</span>
                    <h1 style={{ margin: '0', display: 'inline' }}>·</h1>
                </h3>
            </div>
            <div className="position-relative overflow-hidden content-space-t-md-4">
                <div className="container">
                    <div className="position-relative content-space-t-3 content-space-t-md-0 content-space-t-lg-3 content-space-b-2 content-space-b-md-3 content-space-b-xl-5">
                        <div className="row position-relative zi-2 mt-md-n5">
                            <div className="col-md-8 mb-7 mb-md-0" style={{
                                backgroundColor: '#de8f79',
                                color: '#494949',
                                borderRadius: '15px',
                                padding: '30px',


                            }}>
                                {/* Heading */}
                                <div className="w-md-75 mb-7" >
                                    <h1 className="display-4" style={{ color: '#7c488f' }}>
                                        Aquí y ahora te toca
                                        <span className="text text-highlight-warning" style={{ color: '#494949' }}>
                                            <span className="js-typedjs">
                                                {text}
                                            </span>
                                            <span className={`typed-cursor ${blink ? 'typed-cursor--blink' : ''}`} aria-hidden="true">|</span>
                                        </span>
                                    </h1>
                                    <p className="lead">Aquí no solo compartimos experiencias, sino que creamos nuevos recuerdos.</p>
                                </div>
                                {/* End Heading */}

                                <div className="d-flex gap-3">
                                    <button className="btn btn-lg btn-transition registraYay" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Regístrate en YAY</button>
                                    <a className="btn btn-link saberMas" href="#" style={{ color: '#A7D0CD', fontSize: '25px' }}> Saber más<i className="fa-solid fa-chevron-right small ms-1"></i></a>
                                </div>

                                <p className="form-text small">
                                    * Yay es para personas de 60 años en adelante.
                                </p>
                            </div>
                            {/* End Col */}

                            <div className="col-md-6 position-md-absolute top-0 end-0">
                                <img
                                    className="img-fluid"
                                    src=" https://i.ibb.co/5RNhGfV/terraza.jpg"
                                    alt="Image Description"
                                />

                                {/* SVG Shape */}
                                <div
                                    className="position-absolute bottom-0 end-0 zi-n1 mb-n10 me-n7"
                                    style={{ width: '12rem' }}
                                >
                                    <img
                                        className="img-fluid"
                                        src="https://htmlstream.com/preview/front-v4.3.1/assets/svg/components/dots-lg.svg"
                                        alt="Image Description"
                                    />
                                </div>
                                {/* End SVG Shape */}
                            </div>
                        </div>
                        {/* End Row */}
                    </div>
                </div>

                <div
                    className="col-md-10 position-absolute top-0 start-0 zi-n1 gradient-y-three-sm-primary h-100"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #primary, #primary)`,
                        backgroundSize: `calc(1000px + (100vw - 1000px) / 2)`,
                    }}
                />
            </div>
        </>
    )
}