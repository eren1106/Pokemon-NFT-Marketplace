import React, { useRef } from 'react';
import styles from './Register.module.scss';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {

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
