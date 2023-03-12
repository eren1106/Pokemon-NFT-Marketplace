import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import styles from './Topbar.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface ITopbarProps {
}

export default function Topbar(props: ITopbarProps) {
  const selectedTitle = useAppSelector((state) => state.selectedTitle.title);
  const backRoute = useAppSelector((state) => state.topbar.backRoute);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const isClosed = useAppSelector((state) => state.sidebar.isClosed);

  const navigate = useNavigate();

  const handleBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  }

  return (
    <div className={`${styles.topbar} ${isClosed && styles.large}`}>
      <div className={styles.left}>
        {backRoute &&
          <div
            className={styles.backBtn}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </div>
        }
        <h1 className={styles.title}>
          {selectedTitle}
        </h1>
      </div>
      {currentUser && <p>{`Money: $${currentUser.coins}`}</p>}
    </div>
  );
}
