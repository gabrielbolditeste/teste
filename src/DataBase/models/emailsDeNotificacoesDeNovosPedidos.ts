import isEmail from "validator/lib/isEmail.js";
import { Schema, model } from "mongoose";

interface IEmailParaNotificacao {
  id: string;
  nome: string;
  email: string;
}

const EmailParaNotificacaoModel = new Schema<IEmailParaNotificacao>(
  {
    id: {
      type: String
    },
    nome: {
      type: String,
      required: [true, "Insira um Nome."],
    },
    email: {
      type: String,
      required: [true, "O Email é obrigatório"],
      unique: true,
      validate: [isEmail, "{VALUE} não é um Email valido"]
    },

  },
  {
    versionKey: false
  }
);

export const EmailParaNotificacao = model<IEmailParaNotificacao>("emails_para_notificacoes", EmailParaNotificacaoModel);