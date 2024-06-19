import { Produto, TurnRequired } from "./tipo-produto.interface"

// export interface Bebida {
//   id: string,
//   nome: string,
//   tipo: TipoProduto,
//   preco_unidade: number,
//   consumo_medio_adulto_ml: number,
//   consumo_medio_crianca_ml: number,
//   proibido_menores?: boolean
// }
  
export type Bebida = TurnRequired<
Omit<Produto, "consumo_medio_adulto_g" | "consumo_medio_crianca_g" | "preco_kg">, 
 "preco_unidade" | "consumo_medio_adulto_ml" | "consumo_medio_crianca_ml" 
>