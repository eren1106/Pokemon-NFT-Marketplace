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
  const navigate = useNavigate();

  const handleBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  }

  return (
    <div className={styles.topbar}>
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
    </div>
  );
}
