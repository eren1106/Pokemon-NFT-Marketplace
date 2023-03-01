import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { FormEvent, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearError, registerUser, setAuthError } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Register.module.scss';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(clearError()); // clear error at start
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      dispatch(setAuthError("Password not match with Confirm Password"));
      return;
    }
    dispatch(registerUser({ name, email, password })).unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        // TODO: Show "invalid password or email" if login fail
        console.error('Login failed:', err);
      })
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
          name="name"
          placeholder="Name"
          required
        />
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
        <input
          className={styles.textfield}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <p className={styles.error}>{error && "Authentication failed"}</p>
        <button type="submit" className={styles.btn}>
          {loading ? <CircularProgress size={25} thickness={6} /> : "Register"}
        </button>
        <NavLink
          to="/login"
          className={styles.link}
        >
          Already have an account? Login here
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
