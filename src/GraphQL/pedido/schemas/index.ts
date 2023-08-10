
export const pedidoTypeDefs = `#graphql
scalar DateTime
  type ProdutoPedido {
    descontos: [Float]
    quantidade: Int
    utilizarPrecoPromocional: Boolean
    produto: Produto
  }

  input ProdutoPedidoInput {
    descontos: [Float]!
    quantidade: Int!
    utilizarPrecoPromocional: Boolean!
    produto: String!
  }

  type Pedido {
    _id: String
    produtos: [ProdutoPedido]
    total: Float
    condicaoPagamento: String
    data: DateTime
    cliente: Cliente
    usuario: Usuario
    transportadora: String
    codigoDeBarras: String
    observacoes: String
    prazoDeEntrega: String
    telefone: String
    entregaOuColeta: String
    pedidoEspecial: String
    rascunho: Boolean
  }

  input PedidoInput {
    cliente: String!
    usuario: String!
    produtos: [ProdutoPedidoInput]!
    total: Float!
    condicaoPagamento: String
    data: DateTime
    transportadora: String
    codigoDeBarras: String
    observacoes: String
    prazoDeEntrega: String
    telefone: String
    entregaOuColeta: String
    pedidoEspecial: String
    rascunho: Boolean
  }

  type Pedidos {
    listaPedidos: [Pedido]
    quantidadePedidos: Int
  }

  type Query {
    pedidos(page: Int, limit: Int): Pedidos
    pedidosDoUsuario(page: Int, limit: Int, id: ID!, rascunho: Boolean): Pedidos
    pedido(id: ID!): Pedido!
  }

  type Mutation {
    adicionarPedido(pedidoInput: PedidoInput): String
    atualizaPedido(id: ID!, pedidoInput: PedidoInput!): String
    converteRascunhoParaPedido(id: ID!, ehRascunho: Boolean): String
    apagarRascunho(id: ID!): String
  }
`;