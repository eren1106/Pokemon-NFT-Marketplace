import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import { Pokemon } from '../../constant/pokemonInterface';
import styles from './Shop.module.scss';

export interface IShopProps {
}

export default function Shop(props: IShopProps) {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  const fetchAllPokemons = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemons`);
    data.sort((a: Pokemon, b: Pokemon) => a.no - b.no)
    setAllPokemons(data);
    console.log(data);
  }

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <PageWrapper
      title="Shop"
    >
      <div className={styles.shop}>
      <div className={styles.cardsWrapper}>
        {
          allPokemons.map((pokemon) =>
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
    </div>
    </PageWrapper>
  );
}
