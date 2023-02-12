import * as React from 'react';
import styles from './Topbar.module.scss';

export interface ITopbarProps {
}

export default function Topbar (props: ITopbarProps) {
  return (
    <div className={styles.topbar}>
      <h1>
        Title
      </h1>
    </div>
  );
}
