import { EmailParaNotificacao } from "../../../DataBase/models/emailsDeNotificacoesDeNovosPedidos.js";
import { Pedido } from "../../../DataBase/models/pedido.js";
import { enviarEmailNovoPedido } from "../../../Email/NovoPedido/index.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const pedidoResolvers = {
  Query: {
    async pedidos(_, { page = 0, limit = 10 }) {
      if (limit > 100) limit = 100;
      const quantidadePedidos = await Pedido.count();

      const listaPedidos = await Pedido.find()
        .skip(limit * page)
        .limit(limit)
        .sort({ data: -1 })
        .populate([
          { path: "usuario" },
          { path: "cliente" },
          {
            path: "produtos",
            populate: {
              path: "produtoID",
            }
          }]).where({ rascunho: false });
      return { listaPedidos, quantidadePedidos };
    },

    async pedidosDoUsuario(_, { page = 0, limit = 10, id, rascunho = false }) {
      if (limit > 100) limit = 100;

      const quantidadePedidos = await Pedido.count();

      const listaPedidos = await Pedido.find()
        .skip(limit * page)
        .limit(limit)
        .sort({ data: -1 })
        .populate([
          { path: "usuario" },
          { path: "cliente" },
          {
            path: "produtos",
            populate: {
              path: "produto",
            }
          }])
        .where({ usuario: id, rascunho: rascunho });

      return { listaPedidos, quantidadePedidos };
    },

    async pedido(_, { id }) {
      const pedido = await Pedido.findById(id)
        .populate([
          { path: "usuario" },
          { path: "cliente" },
          {
            path: "produtos",
            populate: {
              path: "produto",
            }
          }]);
      return pedido;
    }
  },
  Mutation: {
    async adicionarPedido(_, { pedidoInput: { ...pedido } }) {
      try {

        const novoPedido = new Pedido({ ...pedido });
        const pedidoFeito = await novoPedido.save();

        if (!novoPedido.rascunho) {
          const emailsParaNotificacao = await EmailParaNotificacao.find().limit(5);
          const emails = emailsParaNotificacao.map(item => `${item.email}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pedido: any = await Pedido.findById(novoPedido._id)
            .populate([
              { path: "usuario" }
            ]);

          enviarEmailNovoPedido(emails, pedido.usuario.nome);
        }

        if (pedidoFeito) {
          return "Pedido cadastrado";
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizaPedido(_, { id, pedidoInput: { ...pedido } }) {
      try {
        const pedidoAtualizado = await Pedido.findOneAndUpdate(
          { _id: id },
          { ...pedido },
          { new: true, runValidators: true }
        );

        if (pedidoAtualizado) {
          return "Pedido atualizado com sucesso.";
        } else {
          ErroBase.enviarResposta("Erro no sistema");
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async converteRascunhoParaPedido(_, { id, ehRascunho }) {
      try {
        const rascunhoParaPedido = await Pedido.findOneAndUpdate(
          { _id: id },
          { rascunho: ehRascunho },
          { new: true, runValidators: true }
        );

        if (rascunhoParaPedido) {
          const emailsParaNotificacao = await EmailParaNotificacao.find().limit(5);
          const emails = emailsParaNotificacao.map(item => `${item.email}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pedido: any = await Pedido.findById(id)
            .populate([
              { path: "usuario" }
            ]);

          enviarEmailNovoPedido(emails, pedido.usuario.nome);

          return "Rascunho covertido para pedido.";
        } else {
          ErroBase.enviarResposta("Erro no sistema");
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async apagarRascunho(_, { id }) {
      try {
        const apagou = await Pedido.deleteOne({ _id: id }).where({ rascunho: true });

        if (apagou.deletedCount) {
          return "Rascunho deletado";
        } else {
          return "Apenas Rascunhos podem ser deletados.";
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  }
};