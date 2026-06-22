import { useState } from "react";
import { Pokemon } from "./types/Pokemon";
import BuscadorPokemon from "./components/BuscadorPokemon";
import PokemonDetalle from "./components/PokemonDetalle";
import "./App.css";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="app">
      <header className="header">
        <h1>Pokédex React</h1>
        <p>Busca Pokémon usando React, TypeScript y PokéAPI</p>
      </header>

      <main className="contenedor">
        <section className="panel">
          <h2>Buscar Pokémon</h2>

          <BuscadorPokemon
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            buscarPokemon={buscarPokemon}
          />

          {cargando && <p className="mensaje">Buscando Pokémon...</p>}

          {error && <p className="error">{error}</p>}
        </section>

        <section className="resultado">
          {pokemon ? (
            <PokemonDetalle pokemon={pokemon} />
          ) : (
            <div className="placeholder">
              <div className="pokebola"></div>
              <p>Busca un Pokémon para ver su información.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">¡Hazte con todos!</footer>
    </div>
  );
}

export default App;
