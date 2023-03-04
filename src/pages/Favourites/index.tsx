import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonsByFavourites, getPokemonsByUserId } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Favourites.module.scss';

export interface IFavouritesProps {
}

export default function Favourites(props: IFavouritesProps) {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(getPokemonsByFavourites(currentUser?._id!))
  }, [dispatch, currentUser?._id]);

  let content;
  if (loading) content = <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }} />
  else if (error) content = <p>{error}</p>
  else content =
    <div className={styles.cardsWrapper}>
      {
        pokemons.map((pokemon) =>
          <PokemonCard
            key={pokemon._id}
            pokemon={pokemon}
          />
        )
      }
    </div>

  return (
    <PageWrapper title="Favourites">
      <div className={styles.favourites}>
        {content}
      </div>
    </PageWrapper>
  );
}
