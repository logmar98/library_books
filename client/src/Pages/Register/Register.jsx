import React from 'react';
import styles from './Register.module.css';
import Button from '../../components/Button/Button';

function Register() {
    

    return (
        <div className={styles.registerSection}>
            <div className={styles.registerContainer}>
                <h1 className={styles.header}>Register</h1>
                <form className={styles.registerForm}>
                    <div>
                        <input className={styles.inputs} placeholder='User Name' type="text" id="username" name="username" />
                    </div>
                    <div>
                        <input className={styles.inputs} placeholder='Email' type="password" id="password" name="password" />
                    </div>
                    <div>
                        <input className={styles.inputs} placeholder='Password' type="password" id="confirmPassword" name="confirmPassword" />
                    </div>
                    <div>
                        <input className={styles.inputs} placeholder='Confirm Password' type="password" id="confirmPassword" name="confirmPassword" />
                    </div>
                    <div>
                        <Button text='Sign Up' background='#B5AC95' color='#454545'/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Register;