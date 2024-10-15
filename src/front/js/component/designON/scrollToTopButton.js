import React from 'react';

export const ScrollToTopButton = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <a
            className="js-go-to go-to position-fixed animated hs-go-to-prevent-event fadeInUp"
            href="javascript:;"
            style={{ right: '3rem', bottom: '3rem' }}
            onClick={handleClick}
            data-hs-go-to-options='{
                "offsetTop": 700,
                "position": {
                    "init": {
                        "right": "2rem"
                    },
                    "show": {
                        "bottom": "2rem"
                    },
                    "hide": {
                        "bottom": "-2rem"
                    }
                }
            }'
        >
            <i className="fa-solid fa-chevron-up flecha-top"></i>
        </a>
    );
};
