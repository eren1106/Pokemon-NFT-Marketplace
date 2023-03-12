import { CircularProgress } from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';
import { clearError, registerUser, setAuthError } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Register.module.scss';
import toast, { Toaster } from 'react-hot-toast';

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
        setShowModal(true);
      })
    // .catch((err) => {
    //   toast.error("Invalid email");
    // })
  }

  // POP UP MODAL
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => {
    setShowModal(false);
    if (!error) navigate("/login");
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
        <CustomModal
          open={showModal}
          title={error ? "Fail" : "Success"}
          onClose={handleCloseModal}
          description={error ? error : "Registered Successfully"}
        />
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default Register;
