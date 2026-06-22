
type Props = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
  buscarPokemon: () => void;
};

function BuscadorPokemon({ busqueda, setBusqueda, buscarPokemon }: Props) {
  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    buscarPokemon();
  };

  return (
    <form className="buscador" onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Busca por nombre o ID. Ej: pikachu"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
}

export default BuscadorPokemon;
