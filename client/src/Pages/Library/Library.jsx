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
    const [search, setSearch] = useState('');
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                if (resp.status === 401) {
                    window.location.href = '/login';
                } else {
                    setUser(resp.data);
                }
            } catch (error) {
                console.log("Not authenticated ", error);
                if (error.response.status === 401){
                    window.location.href = '/login';
                }
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/library");
                const fetched = resp.data.libraries;
                const fetchedBooks = fetched.filter(book => book.book_name.toLowerCase().includes(search.toLowerCase()));
                setBooks(fetchedBooks);
                setReadLater(fetchedBooks.filter(book => book.status === 'Read Later'));
                setReading(fetchedBooks.filter(book => book.status === 'Reading'));
                setDoneReading(fetchedBooks.filter(book => book.status === 'Done Reading'));
            } catch (error) {
                console.log("Not authenticated: ", error);
            }
        })();
    }, [search]);

    const handlesearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className={styles.librarySection}>
            <h1 className={styles.header}>hello, {user.username}</h1>
            <input className={styles.search} placeholder='Search For Book' value={search} onChange={handlesearch} type="text" />
            <LibrarySection books={readLater} text='Read Later' />
            <LibrarySection books={reading} text='Reading' />
            <LibrarySection books={doneReading} text='Done Reading'/>
        </div>
    );
}


export default Library;