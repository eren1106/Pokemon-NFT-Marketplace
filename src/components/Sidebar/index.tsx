import React, { useState } from 'react';
import styles from './Sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

export interface ISidebarProps {
}

export default function Sidebar (props: ISidebarProps) {
  interface MenuItem {
    path: string;
    name: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    {
      path: "/",
      name: "Home",
      icon: <HomeIcon />
    },
    {
      path: "/shop",
      name: "Shop",
      icon: <AddShoppingCartIcon />
    },
    {
      path: "/collections",
      name: "Collections",
      icon: <CollectionsBookmarkIcon />
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <PersonIcon />
    },
  ];

  // TODO: use useSelector from redux to replace this
  const [selectedTabName, setSelectedTabName] = useState<string>(menuItems[0].name);

  return (
    <div className={styles.sidebar}>
      <MenuIcon className={styles.burgerMenu} />
      <img
        className={styles.bigLogo}
        src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
        alt="pokemon logo"
      />
      <div className={styles.navItems}>
        {
          menuItems.map((item) => 
            <NavLink
              className={`${styles.navItem} ${selectedTabName === item.name && styles.selectedItem}`}
              key={item.name}
              to={item.path}
              onClick={() => {
                setSelectedTabName(item.name);
              }}
            >
              <div className={styles.icon}>{item.icon}</div>
              <p className={styles.navText}>{item.name}</p>
            </NavLink>
          )
        }
      </div>
    </div>
  );
}
