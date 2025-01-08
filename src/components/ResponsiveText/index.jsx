import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';
import textFit from 'textfit';

const ResponsiveText = ({ message }) => {
    const textRef = useRef();

    useEffect(() => {
        if (textRef.current) {
            textFit(textRef.current, {
                alignVert: true,
                maxFontSize: 50,
                minFontSize: 10,
            });
        }
    }, [message]);

    return (
        <h1
            ref={textRef}
            className="leading-tight text-center overflow-hidden"
            style={{
                position: 'relative',
                width: '90%',
                height: '50%'
            }}
        >
            {message}
        </h1>

    );
};

export default ResponsiveText;



ResponsiveText.propTypes = {
    message: PropTypes.string.isRequired,
};