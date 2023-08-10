import { Schema, model } from "mongoose";

interface ICondicaoPagamento {
  id: string;
  descricao: string;
  tipo: string;
}

const CondicaoPagamentoModel = new Schema<ICondicaoPagamento>(
  {
    id: {
      type: String
    },
    descricao: {
      type: String,
      required: [true, "Insira uma descição."],
      unique: true
    },
    tipo: {
      type: String,
      required: [true, "Insira um Tipo."]
    },
  },
  {
    versionKey: false
  }
);

export const CondicaoPagamento = model<ICondicaoPagamento>("condicoes_pagamentos", CondicaoPagamentoModel);