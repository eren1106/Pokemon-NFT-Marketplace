import { CircularProgress } from '@mui/material';
import React, { FormEvent, useEffect } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { clearError, loginUser } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from '../Register/Register.module.scss';

interface ILoginProps {
}

const Login: React.FC<ILoginProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector((state) => state.auth.error);
    const loading = useAppSelector((state) => state.auth.loading);
    const currentUser = useAppSelector(state => state.auth.currentUser);

    useEffect(() => {
        dispatch(clearError()); // clear error at start
    }, [dispatch]);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        dispatch(loginUser({ email, password })).unwrap()
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                // TODO: Show "invalid password or email" if login fail
                console.error('Login failed:', err);
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <img
                    className={styles.logo}
                    src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
                    alt="pokemon logo"
                />
                <form onSubmit={handleSubmit} className={styles.container}>
                    <input
                        className={styles.textfield}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        className={styles.textfield}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <p className={styles.error}>{error && "Authentication failed"}</p>
                    <button type="submit" className={styles.btn}>
                        {loading ? <CircularProgress size={25} thickness={6} /> : "Login"}
                    </button>
                    <NavLink
                        to="/register"
                        className={styles.link}
                    >
                        Don't have an account? Register here
                    </NavLink>
                </form>
            </div>
        </div>
    );
};

export default Login;
