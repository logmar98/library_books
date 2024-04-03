import React, { useEffect, useState } from 'react';
import logo from '../../Images/logo.png'
import styles from './Navbar.module.css'
import Button from '../../components/Button/Button';
import { User } from '../../types';
import httpClient from '../../httpClient';

function Navbar() {
    const [user, setUser] = useState(null);

    const logout = async () => {
        const resp = await httpClient.post("//localhost:5000/logout");
        window.location.href = '/login';
    }

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                setUser(resp.data);
            } catch (error) {
                console.log("Not authenticated");
            }
        })();
    }, []);

    return (
        <nav className={styles.navbar}>
            <div>
                <img className={styles.img} src={logo} alt="logo of the site" />
                {user != null && (
                    <ul className={styles.links}>
                        <li><a href="/library">Library</a></li>
                        <li><a href="/books">books</a></li>
                    </ul>
                )} 

            </div>
            {user != null ? (
            <div>
                <a className={styles.register} onClick={logout}><Button text="Logout"/></a>
            </div>
            ) : (
            <div>
                <a className={styles.login} href="/login">login</a>
                <a className={styles.register} href="/register"><Button text="Register"/></a>
            </div>
            )}
        </nav>

    )
}

export default Navbar;