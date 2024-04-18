import { useState, useEffect } from 'react';
import styles from './LibraryRows.module.css';
import Book from '../Book/Book.jsx';

function LibraryRows(props) {
    const { books, width } = props;
    const [booksPerRow, setBooksPerRow] = useState(); // Default to 3 books per row

    useEffect(() => {
        function calculateBooksPerRow() {
            const containerWidth = width * 0.01 * window.innerWidth;
            const bookWidth = 70; // Adjust according to the actual width of the book
            const newBooksPerRow = Math.floor(containerWidth / bookWidth);
            setBooksPerRow(newBooksPerRow || 1); // Ensure at least one book per row
        }

        // Calculate books per row on mount and on resize
        calculateBooksPerRow();
        window.addEventListener('resize', calculateBooksPerRow);
        
        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', calculateBooksPerRow);
    }, [width]);

    const rows = [];
    const firstRowClass = props.isFirstRow ? styles.firstRow : styles.noRadius;

    for (let i = 0; i < books.length; i += booksPerRow) {
        const rowKey = `row-${i}`;
        const booksInRow = books.slice(i, i + booksPerRow).map((book, index) => (
            <Book key={index} book_id={book.book_id} id={book.id} img={book.img} color={book.color} title={book.book_name} />
        ));

        rows.unshift(
            <div key={rowKey} className={styles.libraryRow}>
                {booksInRow}
            </div>
        );
    }

    if (rows.length === 0) {
        rows.push(<div key="empty-row" className={styles.libraryRow}></div>);
    }

    return (
        <div id="librarySection" style={{ width: `${width}%` }} className={`${styles.librarySection}  ${firstRowClass}`}>
            <p>{props.text}</p>
            {rows}
        </div>
    );
}


export default LibraryRows;
