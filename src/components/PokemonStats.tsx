
import { type Pokemon } from "../types/Pokemon";

type Props = {
  stats: Pokemon["stats"];
};

function PokemonStats({ stats }: Props) {
  return (
    <div className="stats">
      <h4>Estadísticas</h4>

      {stats.map((stat) => (
        <div className="stat" key={stat.nombre}>
          <span>{stat.nombre}</span>

          <div className="barra">
            <div className="barra-relleno"
              style={{ width: `${Math.min(stat.valor, 100)}%` }}
            ></div>
          </div>

          <strong>{stat.valor}</strong>
        </div>
      ))}
    </div>
  );
}

export default PokemonStats;
