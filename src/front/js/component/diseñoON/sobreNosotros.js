import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
   

export const SobreNosotros = () => {
    const [text, setText] = useState('');
    const strings = [' nosotros', ' nosotras'];
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
        <div style={styles.container}>

                                    <h1 className="display-4 mb-5" style={{ color: '#7c488f' }}>
                                    Sobre {text}
                                        <span className="text text-highlight-warning" style={{ color: '#7c488f' }}>
                                            <span className={`typed-cursor ${blink ? 'typed-cursor--blink' : ''}`} aria-hidden="true">|</span>
                                        </span>
                                    </h1>
            <h5 style={styles.paragraph}>
                En YAY hemos creado un espacio pensado para aquellos que saben que la vida está llena de momentos por compartir.
                Nuestra misión es conectar a personas mayores de 60 años, ofreciendo un lugar donde puedan crear redes y participar en eventos de su zona.
                Nos asociamos con empresas locales que generan espacios seguros para conocer personas con tus mismos intereses a la vuelta de la esquina. 
            </h5>
            <h5 style={styles.paragraph}>
                Ya sea un taller, una actividad al aire libre o una mera reunión social, en YAY creemos en la importancia de estar activos,
                de seguir explorando y disfrutando junto a otros. ¡Aquí no solo compartimos experiencias, sino que creamos nuevos recuerdos!
            </h5>

            <a className="btn btn-link saberMas me-5" href="/#land-eventos" style={{ color: '#7c488f', fontSize: '25px' }}> <i className="fa-solid fa-chevron-left small ms-1"></i> Ver Actividades</a>
            <a className="btn btn-link saberMas ms-5" href="/partners-signup" style={{ color: '#7c488f', fontSize: '25px' }}>Conviértete en Partner<i className="fa-solid fa-chevron-right small ms-1"></i></a>

        </div>
                    <img
                    src='https://img.freepik.com/premium-photo/minimalist-community-support-theme-with-safety-motifs_818261-68492.jpg?w=1480'
                    alt='comunidad'
                    style={styles.imagePlaceholder}
                />
                </>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '20px',
        marginBottom: '0',
        paddingBottom: '0'
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '20px',
        fontWeight: '10px'
    },
    paragraph: {
        lineHeight: '1.6',
        fontWeight: '400',
        marginBottom: '40px',
    },
    imagePlaceholder: {
        width: '100%',
        height: '400px',
        objectFit: 'cover', 
        objectPosition: 'bottom',
        marginTop: '40px',
        marginBottom: '0'
      },
};