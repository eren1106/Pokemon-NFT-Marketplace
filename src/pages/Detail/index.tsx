import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConditionalContent from '../../components/ConditionalContent';
import PageWrapper from '../../components/PageWrapper';
import { Pokemon } from '../../constant/pokemonInterface';
import TYPES from '../../constant/types';
import { refreshUser } from '../../features/authSlice';
import { buyPokemon, getPokemonById, sellPokemon } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Detail.module.scss';

export interface IDetailProps {
}

export default function Detail(props: IDetailProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.currentPokemon);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const tradeLoading = useAppSelector((state) => state.pokemon.tradeLoading);
  const tradeError = useAppSelector((state) => state.pokemon.tradeError);
  // const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  // TODO: call api to fetch owner name
  const [ownerName, setOwnerName] = useState<string>("-");

  const currentUser = useAppSelector((state: any) => state.auth.currentUser);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getPokemonById(id));
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (pokemon?.ownerID) {
      // fetch owner name
      const fetchOwner = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${pokemon.ownerID}`);
          setOwnerName(res.data.name);
        }
        catch (err) {
          console.error(err);
        }
      }
      fetchOwner();
    }
  }, [pokemon?.ownerID]);

  const handleTradePokemon = async () => {
    if (currentUser && currentUser.pokemons.includes(pokemon?._id)) {
      if (pokemon?.forSale) { // cancel

      }
      else { // sell
        const price = priceRef.current?.value;
        if(price === "") {
          alert("Cannot be empty");
          return;
        }
        dispatch(sellPokemon({
          pokemonId: id!,
          price: parseInt(price!),
        }));
      }
    }
    else { // buy
      if (!pokemon?.forSale) {
        alert("Pokemon not for sale");
        return;
      }
      if (currentUser.coins < pokemon?.price!) {
        alert("Not enough coins");
        return;
      }
      dispatch(buyPokemon({
        pokemonId: id!,
        buyerId: currentUser._id,
        sellerId: pokemon?.ownerID!,
        price: pokemon?.price,
      })).unwrap().then(() => {
        window.location.reload();
      });
    }
  }

  const convertPokedexNum = (num: number | undefined): string => {
    if (!num) return "Undefined";
    const paddedNum = num.toString().padStart(3, '0');
    return `#${paddedNum}`;
  }

  // CONTENT
  let content;
  if (loading) content = <CircularProgress
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  />
  else if (error) content = <p>{error}</p>
  else {
    content = <>
      <div className={styles.left}>
        <h1 className={styles.name}>{pokemon?.name}</h1>
        <img className={styles.pokemonImg} src={pokemon?.imgUrl} alt="pokemon" />
      </div>
      <div className={styles.right}>
        <Row
          children={[
            <Info
              label="Type"
              element={
                <div className={styles.types}>
                  {
                    pokemon?.types.map((type) =>
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
              text={pokemon?.level}
            />
          ]}
        />
        <Row
          children={[
            <Info
              label="Pokedex Number"
              text={convertPokedexNum(pokemon?.no)}
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
              text={pokemon?.atk}
            />,
            <Info
              label="Defense"
              text={pokemon?.def}
            />
          ]}
        />
        <Row
          children={[
            <Info
              label="HP"
              text={pokemon?.hp}
            />,
            <Info
              label="Speed"
              text={pokemon?.speed}
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
              text={pokemon?.prevPrice ?? "-"}
            />
          ]}
        />
        <div className={styles.btmSection}>
          <ConditionalContent
            condition={currentUser && currentUser.pokemons.includes(pokemon?._id)}
            first={
              <div className={styles.saleForDiv}>
                <p className={styles.price}>Sale for $</p>
                <ConditionalContent
                  condition={pokemon?.forSale}
                  first={
                    <p className={styles.price}>{pokemon?.price}</p>
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
              <p className={styles.price}>{pokemon?.forSale ? `$${pokemon?.price}` : "Unavailable"}</p>
            }
          />
          <ConditionalContent
            condition={!!tradeError}
            first={<p>{tradeError}</p>}
          />
          <button
            onClick={handleTradePokemon}
            className={`${styles.buyBtn} ${(!currentUser || (!currentUser.pokemons.includes(pokemon?._id) && !pokemon?.forSale)) && styles.unavailable}`}
          >
            <ConditionalContent
              condition={tradeLoading}
              first={
                <CircularProgress />
              }
              second={
                <ConditionalContent
                  condition={currentUser && currentUser.pokemons.includes(pokemon?._id)}
                  first={
                    <ConditionalContent
                      condition={pokemon?.forSale}
                      first="Cancel"
                      second="Sell Now"
                    />
                  }
                  second="Buy Now"
                />
              }
            />
          </button>
          {/* <ConditionalContent
            condition={currentUser && currentUser.pokemons.includes(pokemon?._id)}
            first={
              <ConditionalContent
                condition={pokemon?.forSale}
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
                className={`${styles.buyBtn} ${(!currentUser || !pokemon?.forSale) && styles.unavailable}`}
              >
                Buy Now
              </button>
            }
          /> */}
        </div>
        <ConditionalContent
          condition={!currentUser}
          first={
            <p className={styles.message}>
              Log in to buy {pokemon?.name}!
            </p>
          }
        />
      </div>
    </>
  }

  return (
    <PageWrapper
      title={`${pokemon ? pokemon.name : ""} ${pokemon ? convertPokedexNum(pokemon.no) : ""}`}
    >
      <div className={styles.wrapper}>
        {content}
      </div>
    </ PageWrapper>
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
