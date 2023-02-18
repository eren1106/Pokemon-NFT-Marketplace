import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import TYPES from '../../constant/types';
import styles from './PokemonCard.module.scss';

interface IPokemonCardProps {
  id: string
  name: string;
  index: number;
  imgUrl: string;
  types: Array<string>;
  level: number;
  price: number;
  ownerID?: string;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({
  id,
  name,
  index,
  imgUrl,
  types,
  price,
  level,
  ownerID,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(id);
  }
  return (
    <div className={styles.pokemonCard}
      onClick={handleNavigate}
    >
      <div className={styles.upper} style={{ background: `linear-gradient(to bottom, ${TYPES[types[0].toLowerCase()].color}30 0%, ${TYPES[types[0].toLowerCase()].color} 100%)` }}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.typeDiv}>
              {
                types.map((type) =>
                  <img
                    key={type}
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
        <p className={styles.level}>Lv. {level}</p>
      </div>
      <div className={styles.lower}>
        <p className={styles.price}>{`$${price}`}</p>
        <p className={styles.owner}>@None</p>
      </div>
    </div>
  );
};

export default PokemonCard;
