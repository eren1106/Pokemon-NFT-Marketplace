import axios from 'axios';
import * as React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Pokemon } from '../../constant/pokemonInterface';

export interface IHomeProps {
}

export default function Home(props: IHomeProps) {
  const pokemonQuantity = 25;
  const capitalizeFirstLetter = (str: string): string => { // Capitalize pokemon name (only first letter)
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const generatePokemons = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonQuantity}`);
    const pokemonList = response.data.results;
    console.log(pokemonList);

    await Promise.all(
      pokemonList.map(async (pokemon: any) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const newPokemon: Pokemon = {
          name: capitalizeFirstLetter(data.name),
          no: data.id,
          index: 1,
          types: data.types.map((type: { type: { name: string } }) => type.type.name),
          level: 1,
          atk: data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'attack').base_stat,
          def: data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'defense').base_stat,
          hp: data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'hp').base_stat,
          speed: data.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'speed').base_stat,
          imgUrl: data.sprites.other["official-artwork"].front_default,
          price: 10,
        }

        const res = await axios.post("http://localhost:3001/api/pokemons/create", newPokemon);
        console.log(res.data);
      }),
    );
  };

  const handleGenerate = () => {
    generatePokemons();
  }
  return (
    <PageWrapper title="Home">
      <div>
        Home
        <button
          onClick={handleGenerate}
          style={{backgroundColor: 'var(--orange)'}}
        >
          Generate Pokemon NFTs
        </button>
      </div>
    </PageWrapper>
  );
}
