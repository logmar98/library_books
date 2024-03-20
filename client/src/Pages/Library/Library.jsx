import styles from './Library.module.css';
import React, { useState, useEffect } from 'react';
import { User } from '../../types.jsx'
import httpClient from '../../httpClient';

function Library() {
    const [user, setUser] = useState(User);
    console.log(user);
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
        <div className={styles.librarySection}>
            <div className={styles.libraryContainer}>
                <h1 className={styles.header}>Library</h1>
                <p>hello, {user.username}</p>
            </div>
        </div>
    );
}


export default Library;