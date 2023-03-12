import { CircularProgress } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { getProfileUser } from '../../features/profileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Profile.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ConditionalContent from '../../components/ConditionalContent';
import { Pokemon } from '../../constant/pokemonInterface';
import { updateUser } from '../../features/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import CustomButton from '../../components/CustomButton';

export interface IProfileProps {
}

export default function Profile(props: IProfileProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const currentUserLoading = useAppSelector((state) => state.auth.loading);
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const pokemons = useAppSelector((state) => state.profile.pokemons);
  const loading = useAppSelector((state) => state.profile.loading);
  const error = useAppSelector((state) => state.profile.error);

  const [edit, setEdit] = useState<boolean>(false);

  const handleOpenEdit = () => {
    setEdit(true);
  }

  const handleNavigateLogin = () => {
    navigate('/login');
  }

  const [formState, setFormState] = useState({
    name: "",
    bio: "",
  });
  useEffect(() => { // set initial form state
    if (profileUser) {
      setFormState({
        name: profileUser.name,
        bio: profileUser.bio,
      });
    }
  }, [profileUser]);
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser({
      userId: currentUser?._id!,
      object: formState,
    })).unwrap()
      .then(() => {
        setEdit(false);
      })
      .catch((e) => {
        toast.error("Error when update profile");
      });
  }

  const handleCancel = () => {
    setEdit(false);
    if (profileUser) {
      setFormState({
        name: profileUser.name,
        bio: profileUser.bio,
      });
    }
  }

  useEffect(() => {
    if (id) dispatch(getProfileUser(id));
    else if (currentUser) dispatch(getProfileUser(currentUser?._id));
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
    <h1>{profileUser?.name}</h1>
    <section className={styles.infoSection}>
      <img
        className={styles.profilePic}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsRP8S852ovM0UkBMt9REF2quhYPs12aVFbA&usqp=CAU"
        alt="profile pic"
      />
      <form onSubmit={handleSubmit} className={styles.infoSectionRight}>
        <div className={styles.info}>
          <p className={styles.label}>Name:</p>
          <ConditionalContent
            condition={edit}
            first={
              <input
                className={styles.textfield}
                value={formState.name}
                name="name"
                placeholder="Write your name here"
                onChange={handleChange}
                required
              />
            }
            second={
              <p className={styles.content}>{profileUser?.name}</p>
            }
          />
        </div>
        <div className={styles.info}>
          <p className={styles.label}>Bio:</p>
          <ConditionalContent
            condition={edit}
            first={
              <textarea
                className={styles.textfield}
                value={formState.bio}
                name="bio"
                placeholder="Write your bio here"
                onChange={handleChange}
                required
                rows={3}
              />
            }
            second={
              <p className={styles.content}>{profileUser?.bio}</p>
            }
          />
        </div>
        <ConditionalContent
          condition={edit}
          first={
            <div className={styles.btnGroup}>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`${styles.btn} ${styles.saveBtn}`}
                type="submit"
              >
                <ConditionalContent
                  condition={currentUserLoading}
                  first={<CircularProgress size={18} />}
                  second="Save"
                />
              </button>
            </div>
          }
        />
      </form>
    </section>
    <section className={styles.pokemonSection}>
      <h1>Owned Pokemon(s): {pokemons.length}</h1>
      <div className={styles.pokemonsDiv}>
        {
          pokemons.map((pokemon: Pokemon) =>
            <img
              className={styles.pokemonImg}
              src={pokemon.imgUrl}
              alt="pokemon img"
              key={pokemon._id}
            />
          )
        }
      </div>
    </section>
    <ConditionalContent
      condition={!edit && ((!!currentUser && !id) || (!!currentUser && currentUser._id === id))}
      first={
        <div
          className={styles.editBtn}
          onClick={handleOpenEdit}
        >
          <BorderColorIcon />
        </div>
      }
    />
    <Toaster />
  </>
  return (
    <PageWrapper title="Profile">
      <div className={styles.wrapper}>
        {currentUser ? <div className={styles.panel}>
          {content}
        </div> : <div className={`${styles.center} ${styles.pleaseLogin}`}>
          <p>Please Log In</p>
          <CustomButton
            text="Login"
            onClick={handleNavigateLogin}
          />
        </div>
        }
      </div>
    </PageWrapper>
  );
}
