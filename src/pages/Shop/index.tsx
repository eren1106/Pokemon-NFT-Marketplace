import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import ConditionalContent from '../../components/ConditionalContent';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
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

  useEffect(() => {
    dispatch(getAllPokemons())
  }, [dispatch]);

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
    <PageWrapper
      title="Shop"
    >
      <div className={styles.shop}>
        {content}
      </div>
    </PageWrapper>
  );
}
