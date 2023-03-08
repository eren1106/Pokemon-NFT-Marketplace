import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { getProfileUser } from '../../features/profileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Profile.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export interface IProfileProps {
}

export default function Profile(props: IProfileProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const pokemons = useAppSelector((state) => state.profile.pokemons);
  const loading = useAppSelector((state) => state.profile.loading);
  const error = useAppSelector((state) => state.profile.error);

  useEffect(() => {
    const userId = id || currentUser?._id;
    dispatch(getProfileUser(userId!));
  }, [dispatch, currentUser, id]);

  let content;
  if (loading) content = <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }} />
  else if (error) content = <p>{error}</p>
  else content = <>
    <section className={styles.infoSection}>
      <img
        className={styles.profilePic}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsRP8S852ovM0UkBMt9REF2quhYPs12aVFbA&usqp=CAU"
        alt="profile pic"
      />
      <div className={styles.infoSectionRight}>
        <div className={styles.info}>
          <p className={styles.label}>Name:</p>
          <p className={styles.content}>{profileUser?.name}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.label}>Bio:</p>
          <p className={styles.content}>{profileUser?.bio}</p>
        </div>
      </div>
      <div className={styles.editIcon}>
        <BorderColorIcon />
      </div>
    </section>
    <section className={styles.pokemonSection}>
      <h1>Owned Pokemon(s): {pokemons.length}</h1>
      <div className={styles.pokemonsDiv}>
        {
          pokemons.map((pokemon) =>
            <img
              className={styles.pokemonImg}
              src={pokemon.imgUrl}
              alt="pokemon img"
            />
          )
        }
      </div>
    </section>
  </>
  return (
    <PageWrapper title="Profile">
      <div className={styles.wrapper}>
        <div className={styles.panel}>
          {content}
        </div>
      </div>
    </PageWrapper>
  );
}
