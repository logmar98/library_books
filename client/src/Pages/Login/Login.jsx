import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';
import httpClient from '../../httpClient';

function Login() {

    const [mail, setmail] = useState('');
    const [pass, setPass] = useState('');

    const handleEmail = (e) => {
        setmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPass(e.target.value);
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
    const loginUser = async () => {
        const alert = document.getElementById('alert');

        try {
            const resp = await httpClient.post("//localhost:5000/login", {
                email: mail,
                password: pass
            });
            window.location.href = '/library';
        } catch (error) {
            if (error.response.status === 401) {
                alert.innerHTML = 'Invalid email or password';
            }
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('email');
        const password = document.getElementById('Password');
        const alert = document.getElementById('alert');
        if (email.value === '' || password.value === '') {
            alert.innerHTML = 'Please fill in all the fields';
        }
        else {
            alert.innerHTML = '';
            loginUser();
        }
    }

    return (
        <div className={styles.loginSection}>
            <div className={styles.loginContainer}>
                <h1 className={styles.header}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div>
                        <input onChange={(event) => handleEmail(event)} className={styles.inputs} placeholder='Email' type="text" id="email" name="email" />
                    </div>
                    <div>
                        <input onChange={(event) => handlePassword(event)} className={styles.inputs} placeholder='Password' type="password" id="Password" name="Password" />
                    </div>
                    <p id='alert' className={styles.alert}></p>
                    <div className={styles.btn}>
                        <Button text='Login' background='#453939' color='#DAD2BD'/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;