import styles from './Book.module.css';

import React, { useState } from 'react';

function Book(props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div style={{backgroundColor: `${props.color}`}} className={styles.container} onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.text}>
            {props.title.split(' ').slice(0, 2).join(' ') + '...'}
            </div>
            <div id={props.book_id} className={`${styles.image} ${isHovered ? styles.hovered : ''}`}>
                <img src={props.img} alt="Cover Image" />
            </div>
                
        </div>
    );
}

export default Book;

