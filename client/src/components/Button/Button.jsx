import React, { useState } from 'react';
import styles from './Button.module.css';

function Button(props) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyle = {
        background: props.background,
        color: props.color,
    };

    if (isHovered) {
        buttonStyle.background = props.color;
        buttonStyle.color = props.background;
    }

    return (
        <div
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.btn}
        >
            <p>{props.text}</p>
        </div>
    );
}

Button.defaultProps = {
    background: '#B5AC95',
    color: '#454545',
    text: 'Click me',
};

export default Button;
