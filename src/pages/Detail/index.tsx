import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConditionalContent from '../../components/ConditionalContent';
import PageWrapper from '../../components/PageWrapper';
import TYPES from '../../constant/types';
import { refreshUser, toggleFavourite } from '../../features/authSlice';
import { buyPokemon, getPokemonById, sellPokemon } from '../../features/pokemonSlice';
import { setBackRoute } from '../../features/topbarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Detail.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomModal from '../../components/CustomModal';
import toast, { Toaster } from 'react-hot-toast';

export interface IDetailProps {
  backRoute: string,
}

const Detail: React.FC<IDetailProps> = ({ backRoute }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.currentPokemon);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const tradeLoading = useAppSelector((state) => state.pokemon.tradeLoading);
  const tradeError = useAppSelector((state) => state.pokemon.tradeError);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const [ownerName, setOwnerName] = useState<string>("-");

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  }

  const currentUser = useAppSelector((state: any) => state.auth.currentUser);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setBackRoute(backRoute)); // there is a back button in detail page, will set the back route here

    return () => { // React unmount
      dispatch(setBackRoute(null));
    }
  }, [dispatch, backRoute]);

  useEffect(() => {
    if (id) {
      dispatch(getPokemonById(id));
    };
  }, [id, dispatch]);

  useEffect(() => { // fetch owner name
    if (pokemon?.ownerID) {
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
        dispatch(sellPokemon({
          pokemonId: id!,
        })).unwrap().then(() => {
          window.location.reload();
        });
      }
      else { // sell
        const price = priceRef.current?.value;
        if (price === "") {
          alert("Cannot be empty");
          return;
        }
        dispatch(sellPokemon({
          pokemonId: id!,
          price: parseInt(price!),
        })).unwrap().then(() => {
          window.location.reload();
        });
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
        setShowModal(true);
      });
    }
  }

  const handleToggleFavourite = () => {
    const isFavourite = currentUser.favourites.includes(pokemon?._id);
    const promise = dispatch(toggleFavourite(pokemon?._id!));
    toast.promise(promise, {
      loading: 'Loading',
      success: isFavourite ? 'Removed from favourites' : 'Added to favourites',
      error: 'Error when fetching',
    });
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
        <div className={styles.leftTop}>
          <h1>{pokemon?.name}</h1>
          <div
            className={styles.favourite}
            onClick={handleToggleFavourite}
          >
            <ConditionalContent
              condition={currentUser.favourites.includes(pokemon?._id)}
              first={<FavoriteIcon className={styles.icon} />}
              second={<FavoriteBorderIcon className={styles.icon} />}
            />
          </div>
        </div>
        <img className={styles.pokemonImg} src={pokemon?.imgUrl} alt="pokemon" />
      </div>
      <div className={styles.right}>
        <Row>
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
          />
          <Info
            label="Level"
            text={pokemon?.level}
          />
        </Row>
        <Row>
          <Info
            label="Pokedex Number"
            text={convertPokedexNum(pokemon?.no)}
          />
          {/* <Info
               label="Serial Number"
               text={pokemon.index}
             /> */}
        </Row>
        <div className={styles.divider} />
        <Row>
          <Info
            label="Attack"
            text={pokemon?.atk}
          />
          <Info
            label="Defense"
            text={pokemon?.def}
          />
        </Row>
        <Row>
          <Info
            label="HP"
            text={pokemon?.hp}
          />
          <Info
            label="Speed"
            text={pokemon?.speed}
          />
        </Row>
        <div className={styles.divider} />
        <Row>
          <Info
            label="Owner"
            text={ownerName}
          />
          <Info
            label="Previous Price"
            text={pokemon?.prevPrice ?? "-"}
          />
        </Row>
        <div className={styles.btmSection}>
          <ConditionalContent
            condition={currentUser && currentUser.pokemons.includes(pokemon?._id)}
            first={
              <div className={styles.saleForDiv}>
                <p className={styles.price}>Sell for</p>
                <ConditionalContent
                  condition={pokemon?.forSale}
                  first={
                    <p className={styles.price}>{`$${pokemon?.price}`}</p>
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
              <p className={styles.price}>{pokemon?.forSale ? `$${pokemon?.price}` : "Not For Sale"}</p>
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
      <CustomModal
        open={showModal}
        title={error ? "Fail" : "Gotcha!"}
        onClose={handleCloseModal}
        description={error ? error : `Added ${pokemon?.name} in your collection`}
        children={
          !error &&
          <img className={styles.modalImg} src={pokemon?.imgUrl} alt="pokemon" />
        }
        width={400}
        height={320}
      />
      <Toaster />
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
  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({
  children,
}) => {
  return (
    <div className={styles.row}>
      {children}
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

export default Detail;

