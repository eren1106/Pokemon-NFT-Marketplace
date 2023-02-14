import React, { useState } from 'react';
import styles from './Sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTitle } from '../../features/selectedTitleSlice';

export interface ISidebarProps {
  onToggle: () => void;
  isClosed: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({ onToggle, isClosed }) => {
  interface MenuItem {
    path: string;
    name: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    {
      path: "/",
      name: "Home",
      icon: <HomeIcon className={styles.icon} />
    },
    {
      path: "/shop",
      name: "Shop",
      icon: <AddShoppingCartIcon className={styles.icon} />
    },
    {
      path: "/collections",
      name: "Collections",
      icon: <CollectionsBookmarkIcon className={styles.icon} />
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <PersonIcon className={styles.icon} />
    },
  ];

  const selectedTabName = useAppSelector(state => state.selectedTitle.title);
  const dispatch = useAppDispatch();

  return (
    <div className={`${styles.sidebar} ${isClosed && styles.closed}`}>
      <div
        className={`${styles.burgerMenu} ${isClosed && styles.alignCenter}`}
        onClick={onToggle}
      >
        <MenuIcon />
      </div>
      <div className={styles.logoDiv}>
        {isClosed ?
          <img
            className={styles.smallLogo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/800px-Pok%C3%A9_Ball_icon.svg.png"
            alt="pokeball logo"
          /> :
          <img
            className={styles.bigLogo}
            src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
            alt="pokemon logo"
          />
        }
      </div>
      <div className={styles.navItems}>
        {
          menuItems.map((item) =>
            <NavLink
              className={`${styles.navItem} ${selectedTabName === item.name && styles.selectedItem}`}
              key={item.name}
              to={item.path}
              onClick={() => {
                dispatch(setTitle(item.name))
              }}
            >
              {item.icon}
              {!isClosed && <p className={styles.navText}>{item.name}</p>}
            </NavLink>
          )
        }
      </div>
    </div>
  );
}

export default Sidebar;
