import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import PageWrapper from '../../components/PageWrapper';
import legendaryPokemonList from '../../constant/legendaryPokemonList';
import { Pokemon } from '../../constant/pokemonInterface';
import { useAppSelector } from '../../hooks';

export interface IAdminProps {
}

const Admin: React.FC<IAdminProps> = (props: IAdminProps) => {
  const pokemonQuantity = 493; // generate how many pokemons
  const capitalizeFirstLetter = (str: string): string => { // Capitalize pokemon name (only first letter)
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [loading, setLoading] = useState(false);

  // CHECK IF IS ADMIN
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  if (!currentUser || currentUser.email !== process.env.REACT_APP_ADMIN_EMAIL) {
    return <Navigate to="/" />;
  }

  const calculateInitialPrice = (
    atk: number,
    def: number,
    hp: number,
    speed: number,
    spAtk: number,
    spDef: number,
    no: number,
  ) => {
    let price = 10;
    let tempStat = 200;
    const totalStat = atk + def + hp + speed + spAtk + spDef;

    while (tempStat <= totalStat) { // the highest the stat the higher the price
      price+=10;
      tempStat += 50;
    }
    
    if (legendaryPokemonList.includes(no)) {
      price += 100; // add extra 100$ for legendary pokemon
    }

    return price;
  }

  const generatePokemons = async () => {
    setLoading(true);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonQuantity}`);
    const pokemonList = response.data.results;
    console.log(pokemonList);

    await Promise.all(
      pokemonList.map(async (pokemon: any) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

        // pokemon stat
        const atk = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'attack').base_stat;
        const def = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'defense').base_stat;
        const hp = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'hp').base_stat;
        const speed = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'speed').base_stat;
        const spAtk = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'special-attack').base_stat;
        const spDef = data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'special-defense').base_stat;

        const price = calculateInitialPrice(atk, def, hp, speed, spAtk, spDef, data.id);

        const newPokemon: Pokemon = {
          name: capitalizeFirstLetter(data.name),
          no: data.id,
          index: 1,
          types: data.types.map((type: { type: { name: string } }) => type.type.name),
          level: 1,
          atk: atk,
          def: def,
          hp: hp,
          speed: speed,
          spAtk: spAtk,
          spDef: spDef,
          imgUrl: data.sprites.other["official-artwork"].front_default,
          price: price,
          forSale: true,
        }

        const res = await axios.post("http://localhost:3001/api/pokemons/create", newPokemon);
        console.log(res.data);
        setLoading(false);
      }),
    );
  };

  const handleGenerate = () => {
    generatePokemons();
  }
  return (
    <PageWrapper title="Admin">
      <div>
        <CustomButton
          text="Generate Pokemons"
          onClick={handleGenerate}
          loading={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default Admin;

