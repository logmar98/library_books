import React from 'react';
import logo from '../../Images/logo.png'
import styles from './Navbar.module.css'
import Button from '../../components/Button/Button';

function Navbar() {


    return (
        <nav className={styles.navbar}>
            <div>
                <img className={styles.img} src={logo} alt="logo of the site" />
                <ul className={styles.links}>
                    <li><a href="">Library</a></li>
                    <li><a href="">books</a></li>
                </ul>
            </div>
            <div>
                <a className={styles.signin} href="/login">login</a>
                <a className={styles.signup} href="/signup"><Button text="Register"/></a>
            </div>
        </nav>

    )
}

export default Navbar;