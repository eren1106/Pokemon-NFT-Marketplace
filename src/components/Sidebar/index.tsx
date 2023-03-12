import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTitle } from '../../features/selectedTitleSlice';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../../features/authSlice';
import ConditionalContent from '../ConditionalContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { setClose } from '../../features/sidebarSlice';

export interface ISidebarProps {
  onToggle: () => void;
  isClosed: boolean;
}

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
    path: "/collection",
    name: "Collection",
    icon: <CollectionsBookmarkIcon className={styles.icon} />
  },
  {
    path: "/favourites",
    name: "Favourites",
    icon: <FavoriteIcon className={styles.icon} />
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon className={styles.icon} />
  },
  {
    path: "/admin",
    name: "Admin",
    icon: <AdminPanelSettingsIcon className={styles.icon} />
  },
];

const Sidebar: React.FC<ISidebarProps> = ({ onToggle, isClosed }) => {
  const [selectedTabName, setSelectedTabName] = useState("");
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname) {
      const getCurrentTab = () => {
        switch (true) {
          case pathname === "/" || pathname.startsWith("/recommend"):
            return "Home";
          case pathname.startsWith("/shop"):
            return "Shop";
          case pathname.startsWith("/user"):
            return "Shop";
          case pathname.startsWith("/collection"):
            return "Collection";
          case pathname.startsWith("/favourites"):
            return "Favourites";
          case pathname.startsWith("/profile"):
            return "Profile";
          case pathname.startsWith("/admin"):
            return "Admin";
          default:
            return "404 Not Found";
        }
      }

      const path = getCurrentTab();
      setSelectedTabName(path);
    }
  }, [pathname]);

  const handleLog = () => {
    if (currentUser) { // if current user exist then logout
      dispatch(logoutUser());
    }
    navigate("/login");
  }

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
          menuItems.map((item) => {
            if(item.name === "Admin" && (!currentUser || currentUser.email !== process.env.REACT_APP_ADMIN_EMAIL)){
              return "";
            }
            return (
              <NavLink
                className={`${styles.navItem} ${selectedTabName === item.name && styles.selectedItem}`}
                key={item.name}
                to={item.path}
                onClick={() => {
                  // dispatch(setTitle(item.name))
                  if(screenWidth < 768){
                    dispatch(setClose(true));
                  }
                }}
              >
                {item.icon}
                <p className={`${styles.navText} ${isClosed && styles.isClosed}`}>{item.name}</p>
              </NavLink>
            )
          })
        }
      </div>
      <button
        className={styles.logBtn}
        onClick={handleLog}
      >
        <ConditionalContent
          condition={!!currentUser}
          first={
            <div className={styles.btnContent}>
              <LogoutIcon />
              <p className={`${styles.btnText} ${isClosed && styles.isClosed}`}>Log out</p>
            </div>
          }
          second={
            <div className={styles.btnContent}>
              <LoginIcon />
              <p className={`${styles.btnText} ${isClosed && styles.isClosed}`}>Log in</p>
            </div>
          }
        />
      </button>
    </div>
  );
}

export default Sidebar;
