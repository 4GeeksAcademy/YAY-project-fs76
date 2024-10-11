import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CambiarLetra = () => {
    const [valor, setValor] = useState('A');
    const valores = ['O', 'A'];
    let indice = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            setValor(valores[indice]);
            indice = (indice + 1) % valores.length;
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return <h1 style={styles.title}>SOBRE NOSOTR{valor}S</h1>;
};


export const SobreNosotros = () => {
    return (
        <div style={styles.container}>
            <CambiarLetra />
            <p style={styles.paragraph}>
                En YAY hemos creado un espacio pensado para aquellos que saben que la vida está llena de momentos por compartir.
                Nuestra misión es conectar a personas mayores de 60 años, ofreciendo un lugar donde puedan crear redes y participar en eventos de su zona.
                Nos asociamos con empresas locales que generan espacios seguros para conocer personas con tus mismos intereses a la vuelta de la esquina. 
            </p>
            <p style={styles.paragraph}>
                Ya sea un taller, una actividad al aire libre o una mera reunión social, en YAY creemos en la importancia de estar activos,
                de seguir explorando y disfrutando junto a otros. ¡Aquí no solo compartimos experiencias, sino que creamos nuevos recuerdos!
            </p>

            <img
                src='https://img.freepik.com/premium-photo/minimalist-community-support-theme-with-safety-motifs_818261-68492.jpg?w=1480'
                alt='comunidad'
                style={styles.imagePlaceholder}
            />
            <Link to="/eventos-yay">
                <button className="btn btn-lg me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Ver Actividades</button>
            </Link>
            <Link to="/partners">
                <button className="btn btn-lg me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Conviértete en Partner</button>
            </Link>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '20px',
        fontWeight: '10px'
    },
    paragraph: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        marginBottom: '40px',
    },
    imagePlaceholder: {
        width: '100%',
        height: '350px',
        objectFit: 'cover', 
        objectPosition: 'bottom',
        border: '2px solid #000',
        borderColor: '#ffc107', 
        marginBottom: '20px',
      },
};