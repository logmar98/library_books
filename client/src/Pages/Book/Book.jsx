import style from './Book.module.css';
import { useState, useEffect } from 'react';

function Book(props) {
    const [books, setBooks] = useState([]);
    const { id } = props.match.params;
    console.log(search)
    useEffect(() => {
        (async () => {
            try {
                if (search === "") return;
                const apiKey = "AIzaSyB2S7wSIKHFQQ_gfUe_nAEVPcr9wgIDxMQ";
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/?key=${apiKey}`);
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


    return (
        <h1>book</h1>
    );
}


export default Book;