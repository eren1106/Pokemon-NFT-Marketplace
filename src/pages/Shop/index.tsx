import * as React from 'react';
import PokemonCard from '../../components/PokemonCard';
import pokemons from '../../mocks/pokemons';
import styles from './Shop.module.scss';

export interface IShopProps {
}

export default function Shop (props: IShopProps) {
  return (
    <div className={styles.shop}>
      <div className={styles.cardsWrapper}>
        {
          pokemons.map((pokemon) => 
            <PokemonCard
              name={pokemon.name}
              index={pokemon.index}
              imgUrl={pokemon.imgUrl}
              types={pokemon.types}
              price={pokemon.price}
              ownerID={pokemon.ownerID}
            />
          )
        }
      </div>
    </div>
  );
}
