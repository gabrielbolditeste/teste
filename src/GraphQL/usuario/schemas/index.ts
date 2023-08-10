export const usuarioTypeDefs = `#graphql
scalar DateTime
  type Usuario {
    _id: String
    nome: String!
    documento: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: String
    telefone: String
    email: String!
    observacoes: String
    ativo: Boolean
    jwt: String!
    permissao: String!
    dataCadastro: DateTime
  }

  input UsuarioInput {
    nome: String!
    documento: String!
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: Estado!
    telefone: String
    email: String!
    observacoes: String
    ativo: Boolean
    permissao: Permissao!
    dataCadastro: DateTime
  }

  input UsuarioUpdateInput {
    nome: String
    documento: String
    cep: String
    endereco: String
    numero: String
    complemento: String
    bairro: String
    municipio: String
    uf: Estado
    telefone: String
    email: String
    observacoes: String
    ativo: Boolean
    permissao: Permissao
  }

  input LoginInput {
    email: String!
    senha: String!
  }

  input NovaSenhaInput {
    email: String!
    senha: String!
    novaSenha: String!
  }

  type Usuarios {
    listaUsuarios: [Usuario]
    quantidadeUsuarios: Int
  }

  type Query {
    usuarios(page: Int, limit: Int, ativo: Boolean, filtro: String): Usuarios
    usuariosComoResponsavel(page: Int, limit: Int): [Usuario]
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    adicionarUsuario(usuarioInput: UsuarioInput): Usuario
    atualizaUsuario(id: ID!, usuarioInput: UsuarioUpdateInput): Usuario!
    loginUsuario(loginInput: LoginInput!): Usuario
    atualizaSenha(novaSenhaInput: NovaSenhaInput!): String!
    esqueciMinhaSenha(email: String!): String!
  }
`;