import * as React from 'react';
import { useAppSelector } from '../../hooks';
import styles from './Topbar.module.scss';

export interface ITopbarProps {
}

export default function Topbar (props: ITopbarProps) {
  const selectedTitle = useAppSelector(state => state.selectedTitle.title);

  return (
    <div className={styles.topbar}>
      <h1>
        {selectedTitle}
      </h1>
    </div>
  );
}
