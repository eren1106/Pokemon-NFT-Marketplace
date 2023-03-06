import React, { useEffect, useState } from 'react';
import { setTitle } from '../../features/selectedTitleSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Sidebar from '../Sidebar';
import styles from './PageWrapper.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Topbar from '../Topbar';
import { setClose } from '../../features/sidebarSlice';

interface IPageWrapperProps {
    children?: React.ReactNode;
    title: string;
}

const PageWrapper: React.FunctionComponent<IPageWrapperProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();
    const isClosed = useAppSelector((state) => state.sidebar.isClosed);

    const handleToggle = () => {
        dispatch(setClose(!isClosed));
    }

    useEffect(() => {
        dispatch(setTitle(title));
    }, [dispatch, title]);

    return (
        <div className={styles.wrapper}>
            <Sidebar onToggle={handleToggle} isClosed={isClosed} />
            <div className={`${styles.right} ${!isClosed && styles.shrink}`}>
                <div className={`${!isClosed && styles.blackOverlay}`} />
                <div className={styles.topSidebar}>
                    <div
                        className={styles.burgerMenu}
                        onClick={handleToggle}
                    >
                        <MenuIcon />
                    </div>
                    <img
                        className={styles.bigLogo}
                        src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
                        alt="pokemon logo"
                    />
                </div>
                <Topbar />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageWrapper;
