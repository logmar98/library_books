import styles from './Library.module.css';
import React, { useState, useEffect } from 'react';
import { User } from '../../types.jsx'
import httpClient from '../../httpClient';
import LibrarySection from '../../components/LibrarySection/LibrarySection.jsx';

function Library() {
    const [user, setUser] = useState(User);
    const [books, setBooks] = useState([]);
    const [readLater, setReadLater] = useState([]);
    const [reading, setReading] = useState([]);
    const [doneReading, setDoneReading] = useState([]);
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
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/library");
                const fetchedBooks = resp.data.libraries;
                setBooks(fetchedBooks);
                setReadLater(fetchedBooks.filter(book => book.status === 'Read Later'));
                setReading(fetchedBooks.filter(book => book.status === 'Reading'));
                setDoneReading(fetchedBooks.filter(book => book.status === 'Done Reading'));
            } catch (error) {
                console.log("Not authenticated: ", error);
            }
        })();
    }, []);


    return (
        <div className={styles.librarySection}>
            <h1 className={styles.header}>hello, {user.username}</h1>
            <LibrarySection books={readLater} text='Read Later' />
            <LibrarySection books={reading} text='Reading' />
            <LibrarySection books={doneReading} text='Done Reading'/>
        </div>
    );
}


export default Library;