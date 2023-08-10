
export const clienteTypeDefs = `#graphql
scalar DateTime

  type Cliente {
    _id: String
    nome: String
    documento: String
    inscricaoEstadual: String
    razaoSocial: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: String
    telefone: String
    email: String
    observacoes: String
    usuario: Usuario
  }

  input ClienteInput {
    nome: String!
    documento: String!
    inscricaoEstadual: String
    razaoSocial: String!
    
    cep: String
    uf: String!
    municipio: String!
    endereco: String
    bairro: String
    numero: String
    complemento: String
    
    email: String!
    telefone: String
    
    observacoes: String
    usuario: String!
  }

  type Clientes {
    listaDeClientes: [Cliente]
    quantidadeClientes: Int
  }

  type Query {
    clientes(page: Int, limit: Int, filtro: String): Clientes
    cliente(id: ID!): Cliente!
    clientesPorUsuario(id: ID!, page: Int, limit: Int, filtro: String): [Cliente]
  }

  type Mutation {
    adicionarCliente(clienteInput: ClienteInput): Cliente
    atualizaCliente(id: ID!, clienteInput: ClienteInput): Cliente
  }
`;