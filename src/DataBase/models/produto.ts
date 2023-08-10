import { Schema, model } from "mongoose";

interface IProduto {
  id: string;
  codigo: string;
  descricao: string;
  preco: number;
  urlImg: string;
  favorito: boolean;
  ativo: boolean;
  precoPromocional: number;
  promocaoAtiva: boolean;
}

const ProdutoModel = new Schema<IProduto>(
  {
    id: {
      type: String
    },
    codigo: {
      type: String,
      unique: true,
      required: [true, "O Código é obrigatório"]
    },
    descricao: {
      type: String,
      unique: true,
      required: [true, "A Descrição é obrigatória"]
    },
    preco: {
      type: Number,
      default: 0.00
    },
    urlImg: {
      type: String,
      default: ""
    },
    favorito: {
      type: Boolean,
      default: false,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    precoPromocional: {
      type: Number,
      default: 0.00
    },
    promocaoAtiva: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false
  }
);

export const Produto = model<IProduto>("produtos", ProdutoModel);

// export default Produto;