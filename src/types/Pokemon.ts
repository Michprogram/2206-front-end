
export type Pokemon = {
  id: number;
  nombre: string;
  imagen: string;
  tipos: string[];
  altura: number;
  peso: number;
  stats: {
    nombre: string;
    valor: number;
  }[];
};
