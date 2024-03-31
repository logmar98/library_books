import styles from './BookProdact.module.css';
import cover from '../../Images/bookcover.jpg';

function BookProdact(props) {


  
    
    return (
        <a  href={`/books/${props.id}`}>
            <div className={styles.container}>
                <img className={styles.imgCover} src={props.img} alt="" />
                <p className={styles.text}>{props.title}</p>
            </div>
        </a>
    );
}


export default BookProdact;