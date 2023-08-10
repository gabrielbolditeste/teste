import { Schema, model, Types } from "mongoose";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import isEmail from "validator/lib/isEmail.js";
import { Estado } from "../enums/Estados.js";

interface ICliente {
  id: string;
  nome: string;
  documento: string;
  inscricaoEstadual: string;
  razaoSocial: string;
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
  usuario: Types.ObjectId;
}

const ClienteModel = new Schema<ICliente>(
  {
    id: {
      type: String
    },
    nome: {
      type: String,
      required: [true, "O campo NOME não pode ser nulo"],
      default: ""
    },
    documento: {
      type: String,
      required: [true, "O campo DOCUMENTO não pode ser nulo"],
      unique: true
    },
    inscricaoEstadual: {
      type: String,
      default: ""
    },
    razaoSocial: {
      type: String,
      required: [true, "O campo RAZÃO SOCIAL não pode ser nulo"],
      default: ""
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
      required: [true, "O campo MUNICÍPIO não pode ser nulo"],
      min: [3, "Mínimo de 3 caracteres"],
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
      required: [true, "O campo E-MAIL não pode ser nulo"],
      validate: [isEmail, "{VALUE} não é um Email valido"],
      unique: true,
    },
    observacoes: {
      type: String,
      default: ""
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      autopopulate: true,
      required: [true, "O campo USUARIO não pode ser nulo"]
    }
  },
  {
    versionKey: false
  }
);

export const Cliente = model<ICliente>("clientes", ClienteModel);