import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Pokemon } from '../../constant/pokemonInterface';
import TYPES from '../../constant/types';
import styles from './Detail.module.scss';

export interface IDetailProps {
}

export default function Detail(props: IDetailProps) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // TODO: call api to fetch owner name
  const [ownerName, setOwnerName] = useState<string>("@Nobody");

  const currentUser = useSelector((state: any) => state.currentUser.currentUser);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemons/${id}`);
      console.log(data);
      if (data) {
        setPokemon(data);
      }
    }
    fetchPokemonData();
  }, [id]);

  const handleBuyPokemon = async () => {
    if(currentUser.coins < pokemon?.price!) {
      alert("Not enough coins");
      return;
    }
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pokemons/buy`, {
      pokemonId: id,
      buyerId: currentUser._id,
      sellerId: pokemon?.ownerID,
      price: pokemon?.price,
    });

    console.log(res);
  }

  if (!pokemon) return <div>Fetching data</div>
  return (
    <PageWrapper
      title={`${pokemon.name} #${pokemon.index}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h1 className={styles.name}>{pokemon.name}</h1>
          <img className={styles.pokemonImg} src={pokemon.imgUrl} alt="pokemon" />
        </div>
        <div className={styles.right}>
          <Row
            children={[
              <Info
                label="Type"
                element={
                  <div className={styles.types}>
                    {
                      pokemon.types.map((type) =>
                        <div
                          key={type}
                          className={styles.typeDiv}
                        >
                          <img
                            className={styles.typeImg}
                            src={TYPES[type.toLowerCase()].imageUrl}
                            alt="pokemon"
                          />
                          <p className={styles.typeText}>{type}</p>
                        </div>
                      )
                    }
                  </div>
                }
              />,
              <Info
                label="Level"
                text={pokemon.level}
              />
            ]}
          />
          <Row
            children={[
              <Info
                label="Pokedex Number"
                text={pokemon.no}
              />,
              <Info
                label="Serial Number"
                text={pokemon.index}
              />
            ]}
          />
          <div className={styles.divider} />
          <Row
            children={[
              <Info
                label="Attack"
                text={pokemon.atk}
              />,
              <Info
                label="Defense"
                text={pokemon.def}
              />
            ]}
          />
          <Row
            children={[
              <Info
                label="HP"
                text={pokemon.hp}
              />,
              <Info
                label="Speed"
                text={pokemon.speed}
              />
            ]}
          />
          <div className={styles.divider} />
          <Row
            children={[
              <Info
                label="Owner"
                text={ownerName}
              />,
              <Info
                label="Previous Price"
                text={pokemon.prevPrice}
              />
            ]}
          />
          <div className={styles.btmSection}>
            <p className={styles.price}>{pokemon.forSale ? `$${pokemon.price}` : "Unavailable"}</p>
            <button
              onClick={handleBuyPokemon}
              className={`${styles.buyBtn} ${!pokemon.forSale && styles.unavailable}`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

interface RowProps {
  children: Array<JSX.Element>;
}

const Row: React.FC<RowProps> = ({
  children,
}) => {
  return (
    <div className={styles.row}>
      {children.map((child) => child)}
    </div>
  );
};

interface InfoProps {
  label: string;
  text?: string | number;
  element?: JSX.Element;
}

const Info: React.FC<InfoProps> = ({
  label,
  text,
  element,
}) => {
  return (
    <div className={styles.info}>
      <p className={styles.label}>{label}</p>
      {text && <p className={styles.text}>{text}</p>}
      {element && element}
    </div>
  );
};
