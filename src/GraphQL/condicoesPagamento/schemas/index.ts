
export const condicaoPagamentoTypeDefs = `#graphql
  type CondicaoPagamento {
    _id: String
    descricao: String
    tipo: String
  }

  input CondicaoInput {
    descricao: String!
    tipo: String!
  }

  type Query {
    condicoesPagamento(filtro: String): [CondicaoPagamento]
    condicaoPagamento(id: ID!): CondicaoPagamento
  }

  type Mutation {
    adicionaCondicaoDePagamento(condicaoInput: CondicaoInput): CondicaoPagamento
    atualizaCondicaoDePagamento(id: ID!, condicaoInput: CondicaoInput): CondicaoPagamento
    apagarCondicaoDePagamento(id: ID!): String
  }
`;