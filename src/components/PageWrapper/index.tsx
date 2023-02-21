import React, { useEffect, useState } from 'react';
import { setTitle } from '../../features/selectedTitleSlice';
import { useAppDispatch } from '../../hooks';
import Sidebar from '../Sidebar';
import styles from './PageWrapper.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Topbar from '../Topbar';

interface IPageWrapperProps {
    children?: React.ReactNode;
    title: string;
}

const PageWrapper: React.FunctionComponent<IPageWrapperProps> = ({ children, title }) => {
    const [isClosed, setIsClosed] = useState<boolean>(false);

    const handleToggle = () => {
        setIsClosed(!isClosed);
    }
    const dispatch = useAppDispatch();

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
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
