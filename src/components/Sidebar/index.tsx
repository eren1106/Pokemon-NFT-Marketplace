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

export default function Sidebar(props: ISidebarProps) {
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

  // TODO: use useSelector from redux to replace this
  const [selectedTabName, setSelectedTabName] = useState<string>(menuItems[0].name);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  return (
    <div className={`${styles.sidebar} ${isClosed && styles.closed}`}>
      <div
        className={`${styles.burgerMenu} ${isClosed && styles.alignCenter}`}
        onClick={() => {
          setIsClosed(!isClosed);
        }}
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
                setSelectedTabName(item.name);
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
