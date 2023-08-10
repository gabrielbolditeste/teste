
import isEmail from "validator/lib/isEmail.js";
import { Schema, model } from "mongoose";
import { Estado } from "../enums/Estados.js";
import { Permissao } from "../enums/Permissao.js";

export interface IUsuarioModel {
  id: string;
  senha: string;
  nome: string;
  documento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  telefone: string;
  email: string;
  observacoes: string;
  ativo: boolean;
  jwt: string;
  permissao: string;
  dataCadastro: Date;
}

const UsuarioModel = new Schema<IUsuarioModel>(
  {
    id: {
      type: String
    },
    nome: {
      type: String,
      required: [true, "O Nome é obrigatório"],
      min: [3, "Mínimo de 3 caracteres"]
    },
    documento: {
      type: String,
      required: [true, "O Documento é obrigatório"],
      unique: true,
    },
    cep: {
      type: String,
      max: [9, "Máximo de 9 caracteres"],
      default: ""
    },
    endereco: {
      type: String,
      default: ""
    },
    numero: {
      type: String,
      default: ""
    },
    complemento: {
      type: String,
      default: ""
    },
    bairro: {
      type: String,
      default: ""
    },
    municipio: {
      type: String,
      default: ""
    },
    uf: {
      type: String,
      required: [true, "O campo UF não pode ser nulo"],
      enum: Estado
    },
    telefone: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: [true, "O Email é obrigatório"],
      unique: true,
      validate: [isEmail, "{VALUE} não é um Email valido"]
    },
    observacoes: {
      type: String,
      default: ""
    },
    jwt: {
      type: String,
      default: ""
    },
    senha: {
      type: String,
      required: [true, "A Senha é obrigatória"],
    },
    ativo: {
      type: Boolean,
      enum: {
        values: [1, 0],
        message: "Ativo deve ser TRUE ou FALSE. Valor fornecido {VALUE}."
      },
      default: true,
    },
    permissao: {
      type: String,
      required: [true, "A Premição é obrigatória"],
      enum: Permissao
    },
    dataCadastro: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

export const Usuario = model<IUsuarioModel>("usuarios", UsuarioModel);