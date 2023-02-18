import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TYPES from '../../constant/types';
import { setTitle } from '../../features/selectedTitleSlice';
import { useAppDispatch } from '../../hooks';
import pokemons, { Pokemon } from '../../mocks/pokemons';
import styles from './Detail.module.scss';

export interface IDetailProps {
}

export default function Detail(props: IDetailProps) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  // TODO: call api to fetch owner name
  const [ownerName, setOwnerName] = useState<string>("@Nobody");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: call api to fetch data
    const data = pokemons.find((p) => p.id === id);
    if (data) {
      setPokemon(data);
      dispatch(setTitle(`${data.name} #${data.index}`));
    }
  }, [id, dispatch]);

  if (!pokemon) return <div>Fetching data</div>
  return (
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
              label="Defend"
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
          <p className={styles.price}>{`$${pokemon.price}`}</p>
          <button className={styles.buyBtn}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
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
