export const tipoProduto = {
    Normal: "Normal",
    Vegetariano: "Vegetariano",
    Vegano: "Vegano"
}
  
export  type TipoProduto = keyof typeof tipoProduto
  //   ^?

export interface Produto {
    id: string,
    nome: string,
    tipo: TipoProduto,

    preco_kg?: number,
    consumo_medio_adulto_g?: number,
    consumo_medio_crianca_g?: number,
    
    preco_unidade?: number,
    consumo_medio_adulto_ml?: number,
    consumo_medio_crianca_ml?: number,
    proibido_menores?: boolean
}
  
export type TurnRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }