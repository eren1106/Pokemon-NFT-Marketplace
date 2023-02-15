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
        imageUrl: "https://archives.bulbagarden.net/media/upload/9/95/Normal_icon_SwSh.png",
        color: "#A8A878",
    },
    fire: {
        name: "Fire",
        imageUrl: "https://archives.bulbagarden.net/media/upload/a/ab/Fire_icon_SwSh.png",
        color: "#F08030",
    },
    water: {
        name: "Water",
        imageUrl: "https://archives.bulbagarden.net/media/upload/8/80/Water_icon_SwSh.png",
        color: "#6890F0",
    },
    electric: {
        name: "Electric",
        imageUrl: "https://archives.bulbagarden.net/media/upload/7/7b/Electric_icon_SwSh.png",
        color: "#F8D030",
    },
    grass: {
        name: "Grass",
        imageUrl: "https://archives.bulbagarden.net/media/upload/a/a8/Grass_icon_SwSh.png",
        color: "#78C850",
    },
    ice: {
        name: "Ice",
        imageUrl: "https://archives.bulbagarden.net/media/upload/6/66/Ice_icon_SwSh.png",
        color: "#98D8D8",
    },
    fighting: {
        name: "Fighting",
        imageUrl: "https://archives.bulbagarden.net/media/upload/3/3b/Fighting_icon_SwSh.png",
        color: "#C03028",
    },
    poison: {
        name: "Poison",
        imageUrl: "https://archives.bulbagarden.net/media/upload/8/8d/Poison_icon_SwSh.png",
        color: "#A040A0",
    },
    ground: {
        name: "Ground",
        imageUrl: "https://archives.bulbagarden.net/media/upload/2/27/Ground_icon_SwSh.png",
        color: "#E0C068",
    },
    flying: {
        name: "Flying",
        imageUrl: "https://archives.bulbagarden.net/media/upload/b/b5/Flying_icon_SwSh.png",
        color: "#A890F0",
    },
    psychic: {
        name: "Psychic",
        imageUrl: "https://archives.bulbagarden.net/media/upload/7/73/Psychic_icon_SwSh.png",
        color: "#F85888",
    },
    bug: {
        name: "Bug",
        imageUrl: "https://archives.bulbagarden.net/media/upload/9/9c/Bug_icon_SwSh.png",
        color: "#A8B820",
    },
    rock: {
        name: "Rock",
        imageUrl: "https://archives.bulbagarden.net/media/upload/1/11/Rock_icon_SwSh.png",
        color: "#B8A038",
    },
    ghost: {
        name: "Ghost",
        imageUrl: "https://archives.bulbagarden.net/media/upload/0/01/Ghost_icon_SwSh.png",
        color: "#705898",
    },
    dragon: {
        name: "Dragon",
        imageUrl: "https://archives.bulbagarden.net/media/upload/7/7e/Dragon_icon_SwSh.png",
        color: "#7038F8",
    },
    dark: {
        name: "Dark",
        imageUrl: "https://archives.bulbagarden.net/media/upload/7/79/Dark_icon_SwSh.png",
        color: "#705848",
    },
    steel: {
        name: "Steel",
        imageUrl: "https://archives.bulbagarden.net/media/upload/0/09/Steel_icon_SwSh.png",
        color: "#B8B8D0",
    },
    fairy: {
        name: "Fairy",
        imageUrl: "https://archives.bulbagarden.net/media/upload/3/3b/Fairy_icon_SwSh.png",
        color: "#EE99AC",
    }
};

export default TYPES;