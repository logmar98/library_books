import styles from './Book.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import httpClient from '../../httpClient';
import BookProdact from '../../components/BookProdact/BookProdact.jsx';

function Book(props) {
    const [books, setBooks] = useState([]);
    const [img, setImg] = useState('');
    const bookId = useParams().bookId;
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [compliteDate, setCompliteDate] = useState(getCurrentDate());
    const [authorBooks, setAuthorBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const apiKey = "AIzaSyCsivG4nGLUIm_3d10Eee07dns17pCSf6k";
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/`+ bookId +`?key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.log("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        }
        )();
    } , [bookId]);
    
    useEffect(() => {
        (async () => {
            try {
                const apiKey = "AIzaSyCsivG4nGLUIm_3d10Eee07dns17pCSf6k";
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${books.volumeInfo?.authors}&key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setAuthorBooks(data.items);
            } catch (error) {
                console.log("Error fetching books:", error);
            }
        }
        )();
    }, [books]);

    useEffect(() => {
        (async () => {
            let imageUrl = '';
            const imageSizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
    
            for (const size of imageSizes) {
                if (books.volumeInfo?.imageLinks?.[size]) {
                    imageUrl = books.volumeInfo.imageLinks[size];
                    break; 
                }
            }
            if (!imageUrl) {
                imageUrl = '';
            }
            setImg(imageUrl);
        })();
    }, [books]);
    function getCurrentDate() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; 
        var year = currentDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return year + "-" + month + "-" + day;
    }

    function generateColor() {
        const colors = ['30348C', '161B93', '308C39', '4C4D5E', '868AD0', '8C3030', '8C3078', '8C3083', '8C4C30', '8C7230'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return '#' + colors[randomIndex];
    }

    function insertBook(status, library, complite = "") {
        try {
        const resp = httpClient.put("//localhost:5000/new_book", {"book_name": books.volumeInfo?.title,
                                                                    "book_id": bookId,
                                                                    "img": books.volumeInfo.imageLinks.smallThumbnail || books.volumeInfo.imageLinks.thumbnail,
                                                                    "color": generateColor(),
                                                                    "status": status,
                                                                    "library": library,
                                                                    "create_at": getCurrentDate(),
                                                                    "update_at": getCurrentDate(),
                                                                    "complited_at": complite});
        }
        catch (error) {
            console.log("Not authenticated");
        }
    }
    
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }
    if (books.length === 0) {
        return <div className={styles.loading}>No books found</div>;
    }
    const htmlContainer = { __html: books.volumeInfo?.description };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = (event) => {
        if (event.target.id === 'compliteContainer' || event.target.id === 'close') {
            setOpen(false);
        }
    }
    const handleCompliteDate = (e) => {
        setCompliteDate(e.target.value);
        console.log(compliteDate);
    }
    return (
        <div className={styles.container}>
            <div className={styles.bookinfo}>
                <div className={styles.imgContainer}>

                    <img className={styles.img} src={img} alt="" />
                </div>
                <div className={styles.book}>
                    <div className={styles.title}><h1>{books.volumeInfo?.title}</h1></div>
                    <div className={styles.author}><b>Authors: </b>{books.volumeInfo?.authors}</div>
                    <div className={styles.publishedDate}><b>Published Date: </b>{books.volumeInfo?.publishedDate}</div>
                    <div className={styles.pageCount}><b>Pages: </b>{books.volumeInfo?.pageCount}</div>
                    <div className={styles.categories}><b>Categories: </b>{books.volumeInfo?.categories}</div>
                    <br />
                    <h3>Description:</h3>
                    <div className={styles.description} dangerouslySetInnerHTML={htmlContainer} />
                    <div className={styles.btns}>
                        <div>
                            <h3>Read Later:</h3>
                            <div onClick={() => insertBook("Read Later", "Read Later")}>
                                <Button text="Read Later" />
                            </div>
                            <div onClick={() => insertBook("Read Later", "Read Next")}>
                                <Button text="Read Next" />
                            </div>
                        </div>
                        <div>
                            <h3>Reading:</h3>
                            <div onClick={() => insertBook("Reading", "Reading")}>
                                <Button text="Reading" />
                            </div>
                            <div onClick={() => insertBook("Reading", "Stop Reading")}>
                                <Button text="Stop Reading" />
                            </div>
                        </div>
                        <div>
                            <h3>Done Reading:</h3>
                            <div onClick={handleOpen}>
                                <Button text="Done Reading" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            {authorBooks.length === 0 ? null :
            <div className={styles.authorBooks}>
                <h1>More books by {books.volumeInfo?.authors}</h1>
                <div className={styles.authorBooksContainer}>
                    {authorBooks.map((book) => {
                        return (
                            <div className={styles.authorBook} key={book.id}>
                                <BookProdact id={book.id} title={book.volumeInfo.title} img={book.volumeInfo.imageLinks?.thumbnail} />
                            </div>
                        );
                    })}
                </div>
            </div>}
            
            {open &&
                <div id='compliteContainer' onClick={(e) => handleClose(e)} className={styles.compliteSection}>
                    <div className={styles.compliteContainer}>
                        <button id='close' className={styles.close} onClick={handleClose}>X</button>
                        <div className={styles.date}>
                            <h2>Complite Date:</h2>
                            <input value={compliteDate} onChange={handleCompliteDate} type="date" />
                        </div>
                        <div onClick={() => insertBook("Done Reading", "Done Reading", compliteDate)}>
                            <Button text="Complite" />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}


export default Book;