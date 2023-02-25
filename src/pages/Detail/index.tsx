import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConditionalContent from '../../components/ConditionalContent';
import PageWrapper from '../../components/PageWrapper';
import { Pokemon } from '../../constant/pokemonInterface';
import TYPES from '../../constant/types';
import { useAppSelector } from '../../hooks';
import styles from './Detail.module.scss';

export interface IDetailProps {
}

export default function Detail(props: IDetailProps) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  // TODO: call api to fetch owner name
  const [ownerName, setOwnerName] = useState<string>("-");

  const currentUser = useAppSelector((state: any) => state.auth.currentUser);

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
    if (currentUser.coins < pokemon?.price!) {
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

  const handleSellPokemon = async () => {
    // TODO: call api to sell pokemon
  }

  const handleCancelSell = async () => {
    // TODO: call api to cancel sell
  }

  const convertPokedexNum = (num: number): string => {
    const paddedNum = num.toString().padStart(3, '0');
    return `#${paddedNum}`;
  }
  // TODO: using redux thunk to show loading
  if (!pokemon) return <div>Fetching data</div>
  return (
    <PageWrapper
      title={`${pokemon.name} ${convertPokedexNum(pokemon.no)}`}
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
                text={convertPokedexNum(pokemon.no)}
              />,
              // <Info
              //   label="Serial Number"
              //   text={pokemon.index}
              // />
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
                text={pokemon.prevPrice ?? "-"}
              />
            ]}
          />
          <div className={styles.btmSection}>
            <ConditionalContent
              condition={currentUser && currentUser.pokemons.includes(pokemon._id)}
              first={
                <div className={styles.saleForDiv}>
                  <p className={styles.price}>Sale for $</p>
                  <ConditionalContent
                    condition={pokemon.forSale}
                    first={
                      <p className={styles.price}>{pokemon.price}</p>
                    }
                    second={
                      <input
                        className={`${styles.priceInput}`}
                        type="number"
                        ref={priceRef}
                      />
                    }
                  />
                </div>
              }
              second={
                <p className={styles.price}>{pokemon.forSale ? `$${pokemon.price}` : "Unavailable"}</p>
              }
            />
            <ConditionalContent
              condition={currentUser && currentUser.pokemons.includes(pokemon._id)}
              first={
                <ConditionalContent
                  condition={pokemon.forSale}
                  first={
                    <button
                      onClick={handleCancelSell}
                      className={styles.buyBtn}
                    >
                      Cancel
                    </button>
                  }
                  second={
                    <button
                      onClick={handleSellPokemon}
                      className={styles.buyBtn}
                    >
                      Sell Now
                    </button>
                  }
                />
              }
              second={
                <button
                  onClick={handleBuyPokemon}
                  className={`${styles.buyBtn} ${!pokemon.forSale && styles.unavailable}`}
                >
                  Buy Now
                </button>
              }
            />
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
