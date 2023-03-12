import React from 'react';
import styles from './Footer.module.scss';

interface IFooterProps {
}

const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className={styles.wrapper}>
      Copyright © 2023 Lii Studio. All rights reserved.
    </div>
  );
};

export default Footer;
