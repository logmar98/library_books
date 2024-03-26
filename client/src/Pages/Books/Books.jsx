import styles from './Books.module.css';
import searchImg from '../../Images/search.png';
import BookProdact from '../../components/BookProdact/BookProdact.jsx';
import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';

function Books() {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);

    const handleSearch = (e) => {
        if (e.key !== "Enter") return;
        setSearch(e.target.value);
    }
    const handleclick = () => {
        setSearch(document.getElementById('inputsearch').value);
    }

    useEffect(() => {
        (async () => {
            try {
                if (search === "") return;
                const apiKey = "AIzaSyB2S7wSIKHFQQ_gfUe_nAEVPcr9wgIDxMQ";
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data.items);
            } catch (error) {
                console.log("Error fetching books:", error);
            }
        })();
    }, [search]);

    const divs = books && books.map((book, index) => (
        <BookProdact 
            key={index}
            id={book.id}
            title={book.volumeInfo?.title} 
            img={book.volumeInfo?.imageLinks?.thumbnail} 
        />
    ));

    



    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <img onClick={handleclick} className={styles.searchImg} src={searchImg} alt="" />
                <input onKeyDown={(e) => handleSearch(e)} id='inputsearch' className={styles.search} type="text" />
            </div>
            <div className={styles.books}>
                {divs}
            </div>
        </div>
    )
}

export default Books;