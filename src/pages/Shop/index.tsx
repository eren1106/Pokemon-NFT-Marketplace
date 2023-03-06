import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import SearchAndFilter from '../../components/SearchAndFilter';
import { Pokemon } from '../../constant/pokemonInterface';
import { getAllPokemons } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Shop.module.scss';

export interface IShopProps {
}

export default function Shop(props: IShopProps) {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const [displayedPokemon, setDisplayedPokemon] = useState<Array<Pokemon>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getAllPokemons()).unwrap();
      if(res.data) {
        setDisplayedPokemon(res.data);
      }
    }
    fetchData();
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [filterTypes, setFilterTypes] = useState<Array<string>>([]);

  useEffect(() => {
    if(pokemons) {
      const searchedPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase()));
      if(filterTypes.length > 0) {
        const filteredPokemons = pokemons.filter((pokemon) => pokemon.types.some((type) => filterTypes.includes(type)));
        const finalList = searchedPokemons.filter((pokemon) => filteredPokemons.some((filteredPokemon) => filteredPokemon.name === pokemon.name));
        setDisplayedPokemon(finalList);
        return;
      }
      setDisplayedPokemon(searchedPokemons);
    }
  }, [pokemons, searchText, filterTypes]);

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
      <SearchAndFilter
        setSearchText={setSearchText}
        setFilterTypesToParent={setFilterTypes}
      />
      <div className={styles.cardsWrapper}>
        {displayedPokemon.map((pokemon) => <PokemonCard
          key={pokemon._id}
          pokemon={pokemon} />
        )}
      </div>
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
