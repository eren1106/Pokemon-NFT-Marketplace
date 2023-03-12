import { CircularProgress, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import SearchAndFilter from '../../components/SearchAndFilter';
import { Pokemon } from '../../constant/pokemonInterface';
import { getAllPokemons } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Shop.module.scss';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { sortStandards } from '../../constant/sortStandards';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ConditionalContent from '../../components/ConditionalContent';

export interface IShopProps {
}

export default function Shop(props: IShopProps) {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [displayedPokemons, setDisplayedPokemons] = useState<Array<Pokemon>>([]);
  useEffect(() => {
    dispatch(getAllPokemons())
    // const fetchData = async () => {
    //   const res = await dispatch(getAllPokemons()).unwrap();
    //   if (res.data) {
    //     setDisplayedPokemons(res.data);
    //   }
    // }
    // fetchData();
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [filterTypes, setFilterTypes] = useState<Array<string>>([]);

  // SORT
  const [sortStandard, setSortStandard] = useState(sortStandards.lowestPrice);

  useEffect(() => {
    if (pokemons) {
      const searchedPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase()));
      let finalList = searchedPokemons;
      if (filterTypes.length > 0) {
        const filteredPokemons = pokemons.filter((pokemon) => pokemon.types.some((type) => filterTypes.includes(type)));
        finalList = searchedPokemons.filter((pokemon) => filteredPokemons.some((filteredPokemon) => filteredPokemon.name === pokemon.name));
      }

      // SORT
      switch (sortStandard) {
        case sortStandards.lowestPrice:
          finalList = finalList.sort((a: Pokemon, b: Pokemon) => {
            if (a.forSale && b.forSale) return a.price - b.price;
            if (a.forSale) return -1;
            if (b.forSale) return 1;
            return a.no - b.no;
          });
          break;
        case sortStandards.highestPrice:
          finalList = finalList.sort((a: Pokemon, b: Pokemon) => {
            if (a.forSale && b.forSale) return b.price - a.price;
            if (a.forSale) return -1;
            if (b.forSale) return 1;
            return a.no - b.no;
          });
          break;
        default:
      }
      setDisplayedPokemons(finalList);
    }
  }, [pokemons, searchText, filterTypes, sortStandard]);

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

  const handleClickSort = (standard: string) => {
    setSortStandard(standard);
    setAnchorEl(null);
  }

  // CONTENT
  let content;
  if (loading) content = <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }} />
  else if (error) content = <p>{error}</p>
  else content =
    <>
      <div className={styles.topSection}>
        <SearchAndFilter
          setSearchText={setSearchText}
          setFilterTypesToParent={setFilterTypes}
        />
        <div className={styles.haveCoin}>
          Have:
          <div className={styles.coins}>
            {currentUser?.coins}
            <MonetizationOnIcon className={styles.coinIcon} />
          </div>
        </div>
      </div>
      <div className={styles.numberAndSort}>
        <h2>{`${displayedPokemons.length} Pokemons`}</h2>
        <div className={styles.sortBtn} onClick={handleClick}>
          <ImportExportIcon />
          <p>{sortStandard}</p>
        </div>
      </div>
      <ConditionalContent
        condition={displayedPokemons.length > 0}
        first={
          <div className={styles.cardsWrapper}>
            {
              displayedPokemons.map((pokemon) => <PokemonCard
                key={pokemon._id}
                pokemon={pokemon} />
              )
            }
          </div>
        }
        second={<p className={styles.emptyText}>No available pokemon</p>}
      />
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
          {
            Object.entries(sortStandards).map(([key, value]) =>
              <p
                key={key}
                className={styles.sortText}
                onClick={() => {
                  handleClickSort(value);
                }}
              >{value}</p>
            )
          }
        </div>
      </Popover>
    </>

  return (
    <PageWrapper
      title="Shop"
    >
      <div className={styles.shop}>
        {content}
      </div>
    </PageWrapper>
  );
}
