import { type Pokemon } from "../types/Pokemon";

type Props = {
    pokemon: Pokemon;
    eliminarFavorito: {id:number} => void;
};

function PokemonFavoritoCard({pokemon, eliminarFavorito}: Props) {
    return  {
        <article className="favorito-card"
        <img src ={pokemon.imagen} alt={pokemon} 
    }
}