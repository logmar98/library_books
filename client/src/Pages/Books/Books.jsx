import styles from './Books.module.css';
import searchImg from '../../Images/search.png';
import BookProdact from '../../components/BookProdact/BookProdact.jsx';
import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';

function Books() {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const resp = await httpClient.get("//localhost:5000/@me");
                if (resp.status === 401) {
                    window.location.href = '/login';
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
                if (search === "") return;
                setLoading(true);
                const apiKey = "AIzaSyCsivG4nGLUIm_3d10Eee07dns17pCSf6k";
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apiKey}&maxResults=40&orderBy=relevance`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data.items);
            } catch (error) {
                console.log("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [search]);

    

    const divs = books && books.map((book, index) => (
        <BookProdact 
            key={index}
            id={book.id}
            title={book.volumeInfo?.title} 
            img={book.volumeInfo?.imageLinks?.medium ||
                book.volumeInfo?.imageLinks?.small ||
                book.volumeInfo?.imageLinks?.thumbnail ||
                book.volumeInfo?.imageLinks?.smallThumbnail
            } 
        />
    ));

    



    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <img onClick={handleclick} className={styles.searchImg} src={searchImg} alt="" />
                <input onKeyDown={(e) => handleSearch(e)} id='inputsearch' className={styles.search} type="text" />
            </div>
            {loading ? <div>Loading...</div> : (
            (!books || books.length == 0) ? <div>No books found</div> : 
                <div className={styles.books}>
                    {divs}
                </div>
            )}
        </div>
    )
}

export default Books;