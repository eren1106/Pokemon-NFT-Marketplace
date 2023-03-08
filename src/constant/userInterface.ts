export interface User {
    _id: string,
    name: string,
    email: string,
    pokemons: Array<string>,
    coins: number,
    favourites: Array<string>,
    bio: string,
}