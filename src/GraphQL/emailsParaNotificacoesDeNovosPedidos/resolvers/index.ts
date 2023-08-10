import { EmailParaNotificacao } from "../../../DataBase/models/emailsDeNotificacoesDeNovosPedidos.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const emailsParaNotificacaoResolvers = {
  Query: {
    async emailsParaNotificacao(_, { limit = 5 }) {
      try {
        const emails = await EmailParaNotificacao.find().limit(limit);
        return emails;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async emailParaNotificacao(_, { id }) {
      try {
        const email = await EmailParaNotificacao.findOne({ _id: id });
        return email;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  },

  Mutation: {
    async adicionarEmailParaNotificacao(_, { emailInput: { ...input } }) {
      try {
        const email = new EmailParaNotificacao({ ...input });
        await email.save();
        return "Criado";
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizarEmailParaNotificacao(_, { id, emailInput }) {
      try {
        const emailAtualizado = await EmailParaNotificacao.findOneAndUpdate(
          { _id: id },
          { ...emailInput },
          { new: true, runValidators: true }
        );

        if (emailAtualizado) {
          return "Email atualizado com sucesso.";
        } else {
          ErroBase.enviarResposta("Erro no sistema");
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async apagarEmailParaNotificacao(_, { id }) {
      try {
        const apagou = await EmailParaNotificacao.deleteOne({ _id: id });

        if (apagou.deletedCount) {
          return "Email deletado";
        } else {
          return "Erro";
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

  },
};