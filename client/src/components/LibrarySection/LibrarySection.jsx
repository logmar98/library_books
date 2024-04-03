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



    function resizebyhight() {
        if (detailsRef.current.open) {
        summaryRef.current.classList.add(styles.headerInactive);
        } else {
        summaryRef.current.classList.remove(styles.headerInactive);
        }
    }
    useEffect(() => {
        if (props.text === 'Read Later') {
            setArray(props.books.filter(book => book.library === 'Read Later'));
            setArray1(props.books.filter(book => book.library === 'Read Next'));
        }
        else if (props.text === 'Reading') {
            setArray(props.books.filter(book => book.library === 'Reading'));
            setArray1(props.books.filter(book => book.library === 'Stop Reading'));
            //setArray2(props.books.filter(book => book.library === 'Complete'));
        }
    }, [props.text, props.books]);
    
    useEffect(() => {
        let completedBooksByYear = {};
    
        props.books.forEach(book => {
            if (book.complited_at) {
                let year = book.complited_at.split('-')[0];
                if (!completedBooksByYear[year]) {
                    completedBooksByYear[year] = [];
                }
                completedBooksByYear[year].push(book);
            }
        });
    
        if (props.text === 'Read Later') {
            setDivtoshow(
                <div className={styles.containerBody}>
                    <LibraryRows isFirstRow={true} books={array} text="Read Later" width="70" />
                    <LibraryRows isFirstRow={true} books={array1} text="Read Next" width="30" />
                </div>
            )
        }
        else if (props.text === 'Reading') {
            setDivtoshow(
                <div className={styles.containerBody}>
                    <LibraryRows isFirstRow={true} books={array} text="Reading" width="70" />
                    <LibraryRows isFirstRow={true} books={array1} text="stop Reading" width="30" />
                    
                </div>
            )
        }
        else if (props.text === 'Done Reading') {
            let divToShow = [];
            let i = 0;
            let completlen = Object.keys(completedBooksByYear).length;
            let firstRow;
            for (let year in completedBooksByYear) {
                if (i === completlen - 1) {
                    firstRow = true;
                }
                else {
                    firstRow = false;
                }
                divToShow.unshift(
                    <LibraryRows key={year} isFirstRow={firstRow} books={completedBooksByYear[year]} text={year} width="100" />
                );
                i++;
            }
            if (completlen === 0) {
                divToShow.push(<LibraryRows key='empty' isFirstRow={true} books={[]} text='No Books Here' width="100" />);
            }
            setDivtoshow(<div className={styles.containerBodyComplited}>{divToShow}</div>);
        }
    }, [props.text, array, array1, array2, props.books]);
    
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