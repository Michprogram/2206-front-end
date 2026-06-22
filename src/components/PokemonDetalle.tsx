import { type Pokemon } from "../types/Pokemon";
import PokemonStats from "./PokemonStats";

type Props = {
  pokemon: Pokemon;
  agregarFavorito: ({pokemon, agregarFavorito }: Props) {
    function agregarFavorito(params:type) {
      
    }
  }
};

function PokemonDetalle({ pokemon }: Props) {
  return (
    <article className="pokemon-card">
      <div className="pokemon-img-box">
        <img
          src={pokemon.imagen}
          alt={pokemon.nombre}
          className="pokemon-img"
        />
      </div>

      <div className="pokemon-info">
        <span className="pokemon-id">#{pokemon.id}</span>

        <h2>{pokemon.nombre}</h2>

        <div className="tipos">
          {pokemon.tipos.map((tipo) => (
            <span className={`tipo tipo-${tipo}`} key={tipo}>
              {tipo}
            </span>
          ))}
        </div>

        <div className="datos">
          <p><strong>Altura:</strong> {pokemon.altura / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.peso / 10} kg</p>
        </div>
<button className="btn-favorito" onClick={()} => agregarFavorito(pokemon)
        <PokemonStats stats={pokemon.stats} />
      </div>
    </article>
  );
}

export default PokemonDetalle;
