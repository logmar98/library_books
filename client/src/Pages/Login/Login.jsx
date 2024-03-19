import React from 'react';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';

function Login() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('email');
        const password = document.getElementById('Password');
        const alert = document.getElementById('alert');
        if (email.value === '' || password.value === '') {
            alert.innerHTML = 'Please fill in all the fields';
        }
        else if (!email.value.includes('@') || !email.value.includes('.com')) {
            alert.innerHTML = 'Invalid email';
        }
        else if (password.value.length < 8) {
            alert.innerHTML = 'Password must be at least 8 characters';
        }
        else {
            alert.innerHTML = '';
        }
    }

    return (
        <div className={styles.loginSection}>
            <div className={styles.loginContainer}>
                <h1 className={styles.header}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div>
                        <input className={styles.inputs} placeholder='Email' type="text" id="email" name="email" />
                    </div>
                    <div>
                        <input className={styles.inputs} placeholder='Password' type="password" id="Password" name="Password" />
                    </div>
                    <p id='alert' className={styles.alert}> </p>
                    <div className={styles.btn}>
                        <Button text='Login' background='#453939' color='#DAD2BD'/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;