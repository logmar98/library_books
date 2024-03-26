import { useState, useEffect } from 'react';
import styles from './LibraryRows.module.css';
import Book from '../Book/Book.jsx';

function LibraryRows(props) {
    const { books, width } = props;
    const [booksPerRow, setBooksPerRow] = useState(3); // Default to 3 books per row

    useEffect(() => {
        function calculateBooksPerRow() {
            const containerWidth = document.getElementById('librarySection').offsetWidth;
            const bookWidth = 80; // Adjust according to the actual width of the book
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
    for (let i = 0; i < books.length; i += booksPerRow) {
        const rowKey = `row-${i}`;
        const booksInRow = books.slice(i, i + booksPerRow).map((book, index) => (
            <Book key={index} color={generateColor()} title={book.book_name} />
        ));
        rows.push(
            <div key={rowKey} className={styles.libraryRow}>
                {booksInRow}
            </div>
        );
    }

    if (rows.length === 0) {
        rows.push(<div key="empty-row" className={styles.libraryRow}></div>);
    }

    return (
        <div id="librarySection" style={{ width: `${width}%` }} className={styles.librarySection}>
            <p>{props.text}</p>
            {rows}
        </div>
    );
}

function generateColor() {
    const colors = ['30348C', '161B93', '308C39', '4C4D5E', '868AD0', '8C3030', '8C3078', '8C3083', '8C4C30', '8C7230'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return '#' + colors[randomIndex];
}

export default LibraryRows;
