import { Produto, TurnRequired } from "./tipo-produto.interface";

// export interface Carne {
//     id: string,
//     nome: string,
//     tipo: TipoProduto,
//     preco_kg: number,
//     consumo_medio_adulto_g: number,
//     consumo_medio_crianca_g: number
//   }



export type Carne = TurnRequired<
Omit<Produto, "preco_unidade" | "consumo_medio_adulto_ml" | "consumo_medio_crianca_ml" | "proibido_menores">, 
"consumo_medio_adulto_g" | "consumo_medio_crianca_g" | "preco_kg"
>
//          ^?