import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import styles from './Register.module.scss';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const register = async () => {
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if(!name || !email || !password || !confirmPassword) {
            // TODO: Show proper error message above register button
            alert("Please complete all the fields");
            return;
        }

        if(password !== confirmPassword) {
            // TODO: Show proper error message above register button
            alert("Unsimilar password!");
            return;
        }

        try {
            // TODO: Show loading
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
                name,
                email,
                password,
            });
            console.log(res);
        }
        catch(err) {
            console.log(err);
        }

        // TODO: Show pop up to inform register success or fail
        // TODO: Navigate to login page if success
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register();
    }

    return (
        <div className={styles.wrapper}>
            <img
                className={styles.logo}
                src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
                alt="pokemon logo"
            />
            <form onSubmit={handleSubmit} className={styles.container}>
                <input
                    className={styles.textfield}
                    type="text"
                    ref={nameRef}
                    placeholder="Name"
                />
                <input
                    className={styles.textfield}
                    type="email"
                    ref={emailRef}
                    placeholder="Email"
                />
                <input
                    className={styles.textfield}
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                />
                <input
                    className={styles.textfield}
                    type="password"
                    ref={confirmPasswordRef}
                    placeholder="Confirm Password"
                />
                <button type="submit" className={styles.btn}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
