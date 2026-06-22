import { Pokemon } from "../types/Pokemon";
import PokemonStats from "./PokemonStats";

type Props = {
  pokemon: Pokemon;
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

        <PokemonStats stats={pokemon.stats} />
      </div>
    </article>
  );
}

export default PokemonDetalle;


const buscarPokemon = async () => {
  if (!busqueda.trim()) {
    setError("Debes ingresar un nombre o ID de Pokémon.");
    setPokemon(null);
    return;
  }

  try {
    setCargando(true);
    setError("");
    setPokemon(null);

    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase().trim()}`
    );

    if (!respuesta.ok) {
      throw new Error("Pokémon no encontrado.");
    }

    const data = await respuesta.json();

    const pokemonTransformado: Pokemon = {
      id: data.id,
      nombre: data.name,
      imagen:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
      tipos: data.types.map(
        (item: { type: { name: string } }) => item.type.name
      ),
      altura: data.height,
      peso: data.weight,
      stats: data.stats.map(
        (item: { base_stat: number; stat: { name: string } }) => ({
          nombre: item.stat.name,
          valor: item.base_stat,
        })
      ),
    };

    setPokemon(pokemonTransformado);
    setBusqueda("");
  } catch (error) {
    setError("No se encontró el Pokémon solicitado.");
  } finally {
    setCargando(false);
  }
};
