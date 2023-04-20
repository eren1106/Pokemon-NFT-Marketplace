import React, { useState, useEffect } from 'react';
import styles from './SearchAndFilter.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Popover } from '@mui/material';
import TYPES from '../../constant/types';

interface ISearchAndFilterProps {
  setSearchText(text: string): void,
  setFilterTypesToParent(types: Array<string>): void,
}

const SearchAndFilter: React.FC<ISearchAndFilterProps> = ({ setSearchText, setFilterTypesToParent }) => {
  // POP OVER
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // SEARCH
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }

  // FILTER
  const [filterTypes, setFilterTypes] = useState<Array<string>>([]);
  const handleToggleFilterTypes = (type: string) => {
    if (filterTypes.includes(type)) {
      const newFilterTypes = filterTypes.filter((t) => t !== type);
      setFilterTypes(newFilterTypes);
    }
    else {
      setFilterTypes([...filterTypes, type]);
    }
  }
  useEffect(() => { // pass filter types to parent
    setFilterTypesToParent(filterTypes);
  }, [filterTypes, setFilterTypesToParent]);
  const handleClearAll = () => {
    setFilterTypes([]);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <SearchIcon className={styles.icon} />
        <input
          className={styles.textfield}
          type="text"
          placeholder="Search Here"
          onChange={handleSearchChange}
        />
      </div>
      <div
        className={styles.filter}
        onClick={handleClick}
      >
        Types
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={styles.popover}
      >
        <div className={styles.filterPopover} >
          <div className={styles.filterTop}>
            <p className={styles.popoverTitle}>Types</p>
            <button
              className={styles.clearBtn}
              onClick={handleClearAll}
            >
              Clear
            </button>
          </div>
          <div className={styles.typesContainer}>
            {Object.entries(TYPES).map(([key, value]) => // value is Type
              <div
                key={key}
                className={styles.type}
                onClick={() => {
                  handleToggleFilterTypes(key);
                }}
                style={{
                  border: filterTypes.includes(key) ? `1px solid ${value.color}` : 'none'
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/${value.imageUrl}`}
                  alt="pokemon icon"
                  className={styles.icon}
                />
                <p
                  style={{ color: value.color }}
                  className={styles.typeText}
                >
                  {value.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default SearchAndFilter;
