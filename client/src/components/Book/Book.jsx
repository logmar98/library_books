import styles from './Book.module.css';
import bookcover from '../../Images/bookcover.jpg';
import React, { useState } from 'react';

function Book(props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div style={{backgroundColor: `${props.color}`}} className={styles.container} onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.text}>
                {props.title}
            </div>
            <div className={`${styles.image} ${isHovered ? styles.hovered : ''}`}>
                <img src={bookcover} alt="Cover Image" />
            </div>
                
        </div>
    );
}

export default Book;

