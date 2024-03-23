import styles from './LibraryRows.module.css';
import Book from '../Book/Book.jsx';

function LibraryRows() {
    

    return (
        <div className={styles.librarySection}>
            <p>Read Later</p>
            <div className={styles.libraryRow}>
                <Book />
                <Book />
            </div>
        </div>
    );
}

export default LibraryRows;