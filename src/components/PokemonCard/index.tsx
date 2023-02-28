import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../../constant/pokemonInterface';
import TYPES from '../../constant/types';
import styles from './PokemonCard.module.scss';

interface IPokemonCardProps {
  pokemon: Pokemon,
}

const PokemonCard: React.FC<IPokemonCardProps> = ({
  pokemon,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(pokemon._id!);
  }
  const [ownerName, setOwnerName] = useState("No owner");

  useEffect(() => {
    if (pokemon.ownerID) {
      // fetch owner name
      const fetchOwner = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${pokemon.ownerID}`);
          setOwnerName(`@${res.data.name}`);
        }
        catch (err) {
          console.error(err);
        }
      }
      fetchOwner();
    }
  }, [pokemon.ownerID]);

  return (
    <div className={styles.pokemonCard}
      onClick={handleNavigate}
    >
      <div className={styles.upper} style={{ background: `linear-gradient(to bottom, ${TYPES[pokemon.types[0].toLowerCase()].color}30 0%, ${TYPES[pokemon.types[0].toLowerCase()].color} 100%)` }}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h2 className={styles.name}>{pokemon.name}</h2>
            <div className={styles.typeDiv}>
              {
                pokemon.types.map((type) =>
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
          {/* <div className={styles.diamond}>
            <p className={styles.index}>{pokemon.index}</p>
          </div> */}
        </div>
        <img className={styles.pokemonImage} src={pokemon.imgUrl} alt="pokemon" />
        <p className={styles.level}>Lv. {pokemon.level}</p>
      </div>
      <div className={styles.lower}>
        <p className={styles.price}>{pokemon.forSale ? `$${pokemon.price}` : 'Unavailable'}</p>
        <p className={styles.owner}>{ownerName}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
