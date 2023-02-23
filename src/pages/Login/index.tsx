import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../constant/userInterface';
import { setCurrentUser } from '../../features/currentUserSlice';
import { useAppDispatch } from '../../hooks';
import styles from '../Register/Register.module.scss';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password) {
            // TODO: Show proper error message above login button
            alert("Please complete all the fields");
            return;
        }

        try {
            // TODO: Show loading
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                email,
                password,
            });
            
            // TODO: Setup thunk and do this inside createAsyncThunk
            if(res.status === 200) {
                const { data } = res;
                const currentUser: User = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    pokemons: data.pokemons,
                    coins: data.coins
                }
                dispatch(setCurrentUser(currentUser));

                navigate('/');
            }
        }
        catch(err) {
            console.log(err);
            alert(err);
        }

        // TODO: Show "invalid password or email" if login fail
        // TODO: Navigate to home page if success
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
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
                <button type="submit" className={styles.btn}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
