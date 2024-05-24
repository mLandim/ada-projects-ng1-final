export interface Bebida {
  id: string,
  nome: string,
  tipo: string,
  preco_unidade: number,
  consumo_medio_adulto_ml: number,
  consumo_medio_crianca_ml: number,
  proibido_menores?: boolean
}
  