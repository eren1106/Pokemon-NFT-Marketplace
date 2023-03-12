import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonsByFavourites, getPokemonsByUserId } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Favourites.module.scss';

export interface IFavouritesProps {
}

export default function Favourites(props: IFavouritesProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if(currentUser) {
      dispatch(getPokemonsByFavourites(currentUser?._id!));
    }
  }, [dispatch, currentUser]);

  const handleNavigateLogin = () => {
    navigate('/login');
  }

  let content;
  if(!currentUser) {
    content = <div className={`${styles.center} ${styles.pleaseLogin}`}>
      <p>Please Log In</p>
      <CustomButton
        text="Login"
        onClick={handleNavigateLogin}
      />
    </div>
  }
  else if (loading) content = <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }} />
  else if (error) content = <p className={styles.center}>{error}</p>
  else if(pokemons.length === 0) content = <p className={styles.center}>You did not add any pokemon to favourites yet!</p>
  else content =
    <div className={styles.cardsWrapper}>
      {
        pokemons.map((pokemon) =>
          <PokemonCard
            key={pokemon._id}
            pokemon={pokemon}
          />
        )
      }
    </div>

  return (
    <PageWrapper title="Favourites">
      <div className={styles.favourites}>
        {content}
      </div>
    </PageWrapper>
  );
}
