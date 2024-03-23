import styles from './Book.module.css';
import bookcover from '../../Images/bookcover.jpg';
import React, { useState } from 'react';

function Book() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className={styles.container}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.text}>some book</div>
              {isHovered && 
                <div className={styles.image}>
                    <img src={bookcover} alt="Cover Image" />
                </div>
                }
        </div>
    );
}

export default Book;