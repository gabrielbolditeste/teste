export const produtoTypeDefs = `#graphql
  type Produto {
    _id: String
    codigo: String
    descricao: String
    preco: Float
    urlImg: String
    favorito: Boolean
    ativo: Boolean
    precoPromocional: Float
    promocaoAtiva: Boolean
  }

  input ProdutoInput {
    codigo: String!
    descricao: String!
    preco: Float!
    urlImg: String
    favorito: Boolean
    ativo: Boolean
    precoPromocional: Float
    promocaoAtiva: Boolean
  }

  type Produtos {
    listaProdutos: [Produto]
    quantidadeProdutos: Int
  }

  type Query {
    produtos(page: Int, limit: Int, ativo: Boolean, filtro: String): Produtos
    produto(id: ID!): Produto
  }

  type Mutation {
    adicionarProduto(produtoInput: ProdutoInput): Produto
    atualizaProduto(id: ID!, produtoInput: ProdutoInput): Produto
  }
`;