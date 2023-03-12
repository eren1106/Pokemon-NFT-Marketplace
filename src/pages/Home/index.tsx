import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import PageWrapper from '../../components/PageWrapper';
import PokemonCard from '../../components/PokemonCard';
import { getPokemonsByRandom } from '../../features/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Home.module.scss';

export interface IHomeProps {
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const loading = useAppSelector((state) => state.pokemon.loading);
  const error = useAppSelector((state) => state.pokemon.error);
  
  useEffect(() => {
    dispatch(getPokemonsByRandom());
  }, [dispatch]);

  const handleNavigateShop = () => {
    navigate('/shop');
  }

  let recommend;
  if (loading) recommend = <CircularProgress />
  else if (error) recommend = <p className={styles.errorText}>{error}</p>
  else if(pokemons.length === 0) recommend = <p className={styles.errorText}>No pokemons are recommended</p>
  else recommend =
  <div className={styles.cardsWrapper}>
    {
      pokemons.map((pokemon) =>
        <PokemonCard
          key={pokemon._id}
          pokemon={pokemon}
          root="recommend"
        />
      )
    }
  </div>
  return (
    <PageWrapper title="Home">
      <div className={styles.wrapper}>
        <section className={styles.intro}>
          <div className={styles.introLeft}>
            <h1 className={styles.title}>Collect your favourite pokemon now!</h1>
            <p className={styles.description}>Welcome to the largest pokemon marketplace that allows users to buy and sell Pokemon with in-game currency.</p>
            <CustomButton
              text="Explore"
              onClick={handleNavigateShop}
            />
          </div>
          <div className={styles.introRight}>
            <img
              className={styles.introImg}
              src="https://pngimage.net/wp-content/uploads/2018/06/turma-pokemon-png.png"
              alt="intro"
            />
          </div>
        </section>
        <section className={styles.recommend}>
          <h1>Recommend</h1>
          {recommend}
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
