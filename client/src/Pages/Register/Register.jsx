import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import Button from '../../components/Button/Button';
import httpClient from '../../httpClient';

function Register() {

    const [name, setname] = useState('');
    const [mail, setmail] = useState('');
    const [pass, setPass] = useState('');

    const checkpassword = () => {
        const password = document.getElementById('Password');
        const confirmPassword = document.getElementById('confirmPassword');
        if (password.value !== confirmPassword.value) {
            confirmPassword.style.outline = '2px solid #ff0000b8';
        }
        else {
            confirmPassword.style.outline = '2px solid #00ff00b8';
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                if (resp.status === 200) {
                    window.location.href = '/library';
                }
            } catch (error) {
                console.log("Not authenticated");
            }
        })();
    }, []);
    const checkemail = () => {
        const email = document.getElementById('email');
        if (email.value.includes('@') && email.value.includes('.com')) {
            email.style.outline = '2px solid #00ff00b8';
        }
        else {
            email.style.outline = '2px solid #ff0000b8';
        }
    }

    const checkpasswordlength = () => {
        const password = document.getElementById('Password');
        if (password.value.length < 8) {
            password.style.outline = '2px solid #ff0000b8';
        }
        else {
            password.style.outline = '2px solid #00ff00b8';
        }
    }

    const registerUser = async () => {
        const alert = document.getElementById('alert');

        try {
            const resp = await httpClient.post("//localhost:5000/register", {
                username: name,
                email: mail,
                password: pass
            });
            window.location.href = '/library';
        } catch (error) {
            if (error.response.status === 409) {
                alert.innerHTML = 'Email already exists';
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('Password');
        const confirmPassword = document.getElementById('confirmPassword');
        const alert = document.getElementById('alert');
        if (username.value === '' || email.value === '' || password.value === '' || confirmPassword.value === '') {
            alert.innerHTML = 'Please fill in all the fields';
        }
        else if (password.value !== confirmPassword.value) {
            alert.innerHTML = 'Passwords do not match';
        }
        else if (!email.value.includes('@') || !email.value.includes('.com')) {
            alert.innerHTML = 'Invalid email';
        }
        else if (password.value.length < 8) {
            alert.innerHTML = 'Password must be at least 8 characters';
        }
        else {
            registerUser();
        }
    }


    const handleUsername = (e) => {
        setname(e.target.value);
    }
    const handleEmail = (e) => {
        setmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPass(e.target.value);
    }
    return (
        <div className={styles.registerSection}>
            <div className={styles.registerContainer}>
                <h1 className={styles.header}>Register</h1>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div>
                        <input onChange={(event) => handleUsername(event)} className={styles.inputs} placeholder='User Name' type="text" id="username" name="username" />
                    </div>
                    <div>
                        <input onChange={(event) => {
                                        handleEmail(event);
                                        checkemail();
                                        }} className={styles.inputs} placeholder='Email' type="text" id="email" name="email" />
                    </div>
                    <div>
                        <input onChange={(event) => {
                                        handlePassword(event);
                                        checkpasswordlength();
                                        }} className={styles.inputs} placeholder='Password' type="password" id="Password" name="confirmPassword" />
                    </div>
                    <div>
                        <input onChange={checkpassword} className={styles.inputs} placeholder='Confirm Password' type="password" id="confirmPassword" name="confirmPassword" />
                    </div>
                    <p id='alert' className={styles.alert}></p>
                    <div className={styles.btn}>
                        <Button text='Register' background='#B5AC95' color='#453939'/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Register;