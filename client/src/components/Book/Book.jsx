import styles from './Book.module.css';
import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient.jsx';


function Book(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Read Later');
    const [close, setClose] = useState(false);
    const [compliteDate, setCompliteDate] = useState(getCurrentDate());


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
    async function deleteBook() {
        try {
            const resp = await httpClient.delete(`//localhost:5000/delete_book/${props.id}`);
            if (resp.status === 200) {
                setClose(false);
            }
        }
        catch (error) {
            console.log("Not authenticated");
        }
    }
    async function updateBook() {
        try {
            const resp = await httpClient.patch(`//localhost:5000/update_book`, { 
            "id": props.id,
            "library": selectedOption,
            "update_at": getCurrentDate(),
            "completed_at": (selectedOption === "Done Reading" ? compliteDate : "")
        });
        if (resp.status === 200) {
            setClose(false);
        }
        }
        catch (error) {
            console.log("Not authenticated: ", error);
        }
        
    }

    const handleCompliteDate = (e) => {
        setCompliteDate(e.target.value);
    }
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const openEdit = () => {
        setClose(true);
    }
    const closeEdit = (event) => {
        if (event.target.id === 'compliteContainer' || event.target.id === 'close') {
            setClose(false);
        }
    }
    return (
        <div style={{backgroundColor: `${props.color}`}} className={styles.container} onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.text}>
            {props.title.split(' ').slice(0, 2).join(' ') + '...'}
            </div>
            <div id={props.book_id} className={`${styles.image} ${isHovered ? styles.hovered : ''}`}>
                <img src={props.img} alt="Cover Image" />
                <button onClick={openEdit} className={styles.edit}>#</button>
            </div>
            {close &&
                <div onClick={(e) => closeEdit(e)} onMouseEnter={() => setIsHovered(false)} id='compliteContainer'  className={styles.editContainer}>
                    <div className={styles.editSection}>
                        <span className={styles.close} onClick={closeEdit} id='close'>X</span>
                        <h1>Update Library</h1>
                        <p><b>Book Name: </b>{props.title}</p>
                        <select value={selectedOption} onChange={handleSelectChange}>
                            <option value="Read Later">Read Later</option>
                            <option value="Read Next">Read Next</option>
                            <option value="Reading">Reading</option>
                            <option value="Stop Reading">Stop Reading</option>
                            <option value="Done Reading">Done Reading</option>
                        </select>
                        {selectedOption === "Done Reading" && 
                        <input value={compliteDate} onChange={handleCompliteDate} type="date" />}
                        <button className={styles.update} onClick={updateBook}>Update</button>
                        <button className={styles.delete} onClick={deleteBook}>Delete</button>
                    </div>   
                </div>
            } 
        </div>
    );
}

export default Book;

