import * as React from 'react';
import TYPES from '../../constant/types';
import styles from './PokemonCard.module.scss';

interface IPokemonCardProps {
  name: string;
  index: number;
  imgUrl: string;
  types: Array<string>;
  price: number;
  ownerID: string | null;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({
  name,
  index,
  imgUrl,
  types,
  price,
  ownerID,
}) => {
  return (
    <div className={styles.pokemonCard}>
      <div className={styles.upper} style={{backgroundColor: TYPES[types[0].toLowerCase()].color}}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.typeDiv}>
              {
                types.map((type) => 
                  <img
                    src={TYPES[type.toLowerCase()].imageUrl}
                    alt="type icon"
                    className={styles.typeIcon}
                  />
                )
              }
            </div>
          </div>
          <div className={styles.diamond}>
              <p className={styles.index}>{index}</p>
          </div>
        </div>
        <img className={styles.pokemonImage} src={imgUrl} alt="pokemon" />
      </div>
      <div className={styles.lower}>
        <div className={styles.lowerLeft}>
          <p className={styles.price}>{`$${price}`}</p>
          <p className={styles.owner}>None</p>
        </div>
        <button className={styles.buyBtn}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
