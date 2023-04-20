export interface Types {
    [key: string]: Type; // allows accessing properties with a string index
    normal: Type;
    fire: Type;
    water: Type;
    electric: Type;
    grass: Type;
    ice: Type;
    fighting: Type;
    poison: Type;
    ground: Type;
    flying: Type;
    psychic: Type;
    bug: Type;
    rock: Type;
    ghost: Type;
    dragon: Type;
    dark: Type;
    steel: Type;
    fairy: Type;
}

export interface Type {
    name: string;
    imageUrl: string;
    color: string;
}

export const TYPES: Types = {
    normal: {
        name: "Normal",
        imageUrl: "normal.png",
        color: "#A8A878",
    },
    fire: {
        name: "Fire",
        imageUrl: "fire.png",
        color: "#F08030",
    },
    water: {
        name: "Water",
        imageUrl: "water.png",
        color: "#6890F0",
    },
    electric: {
        name: "Electric",
        imageUrl: "electric.png",
        color: "#F8D030",
    },
    grass: {
        name: "Grass",
        imageUrl: "grass.png",
        color: "#78C850",
    },
    ice: {
        name: "Ice",
        imageUrl: "ice.png",
        color: "#98D8D8",
    },
    fighting: {
        name: "Fighting",
        imageUrl: "fighting.png",
        color: "#C03028",
    },
    poison: {
        name: "Poison",
        imageUrl: "poison.png",
        color: "#A040A0",
    },
    ground: {
        name: "Ground",
        imageUrl: "ground.png",
        color: "#E0C068",
    },
    flying: {
        name: "Flying",
        imageUrl: "flying.png",
        color: "#A890F0",
    },
    psychic: {
        name: "Psychic",
        imageUrl: "psychic.png",
        color: "#F85888",
    },
    bug: {
        name: "Bug",
        imageUrl: "bug.png",
        color: "#A8B820",
    },
    rock: {
        name: "Rock",
        imageUrl: "rock.png",
        color: "#B8A038",
    },
    ghost: {
        name: "Ghost",
        imageUrl: "ghost.png",
        color: "#705898",
    },
    dragon: {
        name: "Dragon",
        imageUrl: "dragon.png",
        color: "#7038F8",
    },
    dark: {
        name: "Dark",
        imageUrl: "dark.png",
        color: "#705848",
    },
    steel: {
        name: "Steel",
        imageUrl: "steel.png",
        color: "#B8B8D0",
    },
    fairy: {
        name: "Fairy",
        imageUrl: "fairy.png",
        color: "#EE99AC",
    }
};

export default TYPES;