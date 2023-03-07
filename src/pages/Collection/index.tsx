import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonsByUserId } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Collection.module.scss';

export interface ICollectionProps {
}

export default function Collection(props: ICollectionProps) {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(getPokemonsByUserId(currentUser?._id!))
  }, [dispatch, currentUser?._id]);

  let content;
  if (loading) content = <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }} />
  else if (error) content = <p className={styles.errorText}>{error}</p>
  else if(pokemons.length === 0) content = <p className={styles.errorText}>No pokemons yet. Go buy some!</p>
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
    <PageWrapper title="Collection">
      <div className={styles.collection}>
        {content}
      </div>
    </PageWrapper>
  );
}
