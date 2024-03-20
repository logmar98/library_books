import styles from './Library.module.css';
import React, { useState, useEffect } from 'react';
import { User } from '../../types.jsx'
import httpClient from '../../httpClient';
import LibrarySection from '../../components/LibrarySection/LibrarySection.jsx';

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
            <h1 className={styles.header}>hello, {user.username}</h1>
            <LibrarySection />

        </div>
    );
}


export default Library;