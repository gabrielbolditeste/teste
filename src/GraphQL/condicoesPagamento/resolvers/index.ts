import { CondicaoPagamento } from "../../../DataBase/models/condicaoPagamento.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const condicaoPagamentoResolvers = {
  Query: {
    async condicoesPagamento(_, { filtro = "" }) {
      try {
        const condicoesPagamento = await CondicaoPagamento.find({
          $or: [
            { tipo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).sort({ descricao: "asc" });

        return condicoesPagamento;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async condicaoPagamento(_, { id }) {
      try {
        const condicaoPagamento = await CondicaoPagamento.findOne({ _id: id });

        return condicaoPagamento;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  },

  Mutation: {
    async adicionaCondicaoDePagamento(_, { condicaoInput: { ...condicaoPagamento } }) {
      try {
        const novaCondicao = new CondicaoPagamento({ ...condicaoPagamento });
        const resposta = await novaCondicao.save();

        return resposta;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizaCondicaoDePagamento(_, { id, condicaoInput }) {
      try {
        const condicaoDePagamentoAtualizado = await CondicaoPagamento.findByIdAndUpdate({ _id: id }, { ...condicaoInput }, { new: true });

        return condicaoDePagamentoAtualizado;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async apagarCondicaoDePagamento(_, { id }) {
      try {
        const apagou = await CondicaoPagamento.deleteOne({ _id: id });

        if (apagou.deletedCount) {
          return "Condições de Pagamento Apagada.";
        } else {
          return "Algo deu errado.";
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  }
};