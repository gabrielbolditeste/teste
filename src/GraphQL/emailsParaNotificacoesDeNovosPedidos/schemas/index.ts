
export const emailParaNotificacoesTypeDefs = `#graphql

  type EmailParaNotificacao {
    _id: String
    nome: String
    email: String
  }

  input EmailParaNotificacaoInput {
    nome: String!
    email: String!
  }

  type Query {
    emailsParaNotificacao(limit: Int): [EmailParaNotificacao]
    emailParaNotificacao(id: ID!): EmailParaNotificacao
  }

  type Mutation {
    adicionarEmailParaNotificacao(emailInput: EmailParaNotificacaoInput): String
    atualizarEmailParaNotificacao(id: ID!, emailInput: EmailParaNotificacaoInput): String
    apagarEmailParaNotificacao(id: ID!): String
  }
`;