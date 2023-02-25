import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ConditionalContent from '../../components/ConditionalContent';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
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

  useEffect(() => {
    dispatch(getAllPokemons())
  }, [dispatch]);

  return (
    <PageWrapper
      title="Shop"
    >
      <div className={styles.shop}>
        <ConditionalContent
          condition={loading}
          first={<CircularProgress sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />}
          second={
            <ConditionalContent
              condition={!!error}
              first={<p>{error}</p>}
              second={
                <div className={styles.cardsWrapper}>
                  {
                    pokemons.map((pokemon) =>
                      <PokemonCard
                        key={pokemon._id}
                        id={pokemon._id}
                        name={pokemon.name}
                        index={pokemon.index}
                        imgUrl={pokemon.imgUrl}
                        types={pokemon.types}
                        level={pokemon.level}
                        price={pokemon.price}
                        ownerID={pokemon.ownerID}
                      />
                    )
                  }
                </div>
              }
            />
          }
        />
      </div>
    </PageWrapper>
  );
}
