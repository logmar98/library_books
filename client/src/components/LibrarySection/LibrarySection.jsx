import styles from './LibrarySection.module.css';
import React, { useRef, useState, useEffect } from 'react';
import LibraryRows from '../LibraryRow/LibraryRows.jsx';


function LibrarySection(props) {
    const detailsRef = useRef();
    const summaryRef = useRef();
    const [array, setArray] = useState([]);
    const [array1, setArray1] = useState([]);
    const [array2, setArray2] = useState([]);
    const [divtoshow, setDivtoshow] = useState([]);


    useEffect(() => {
        if (props.text === 'Read Later') {
            setArray(props.books.filter(book => book.library === 'Read Later'));
            setArray1(props.books.filter(book => book.library === 'Read Next'));
        }
        else if (props.text === 'Reading') {
            setArray(props.books.filter(book => book.library === 'Reading'));
            setArray1(props.books.filter(book => book.library === 'Stop Reading'));
            setArray2(props.books.filter(book => book.library === 'Complete'));
        }
        else if (props.text === 'Done Reading') {
            setArray([]); 
        }
    }, [props.text, props.books]);

    function resizebyhight() {
        if (detailsRef.current.open) {
        summaryRef.current.classList.add(styles.headerInactive);
        } else {
        summaryRef.current.classList.remove(styles.headerInactive);
        }
    }
    useEffect(() => {
        (async () => {
            if (props.text === 'Read Later') {
                setDivtoshow(<div className={styles.containerBody}>
                                <LibraryRows books={array} text="Read Later" width="70" booksnumber={9}/>
                                <LibraryRows books={array1} text="Read Next" width="30" booksnumber={3}/>
                            </div>)
            }
            else if (props.text === 'Reading') {
                setDivtoshow(<div className={styles.containerBody}>
                                <LibraryRows books={array} text="Reading" width="60" booksnumber={5}/>
                                <LibraryRows books={array1} text="stop Reading" width="20" booksnumber={3}/>
                                <LibraryRows books={array2} text="complete" width="20" booksnumber={3}/>
                            </div>)
            }
            else if (props.text === 'Done Reading') {
                setDivtoshow(<div className={styles.containerBody}>
                                <LibraryRows books={[]} text="2022" width="100" booksnumber={9}/>
                            </div>)
            }
        })();
    }, [props.text, array, array1, array2]);
    
  return (
    <div>
      <details onToggle={resizebyhight} ref={detailsRef} id='container' className={styles.container}>
        <summary ref={summaryRef} id='header' className={styles.containerHeader}>{props.text}</summary>
        {divtoshow}
      </details>
    </div>
  );
}

export default LibrarySection;