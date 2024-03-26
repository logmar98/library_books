import styles from './BookProdact.module.css';
import cover from '../../Images/bookcover.jpg';

function BookProdact(props) {


    function handleclick() {
        window.location = `/books/${props.id}`;
    }

    return (
        <div className={styles.container} onClick={handleclick}>
            <img className={styles.imgCover} src={props.img} alt="" />
            <p className={styles.text}>{props.title}</p>
        </div>
    );
}


export default BookProdact;