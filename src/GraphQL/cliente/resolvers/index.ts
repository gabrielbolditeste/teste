import { Cliente } from "../../../DataBase/models/cliente.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const clienteResolvers = {
  Query: {
    async clientes(_, { page = 0, limit = 10, filtro = "" }) {
      if (limit > 50) limit = 50;
      const clientes = await Cliente.find({
        $or: [
          { nome: { $regex: `${filtro}`, $options: "i" } },
          { email: { $regex: `${filtro}`, $options: "i" } },
          { documento: { $regex: `${filtro}`, $options: "i" } },
          { razaoSocial: { $regex: `${filtro}`, $options: "i" } },
          { inscricaoEstadual: { $regex: `${filtro}`, $options: "i" } }
        ]
      })
        .skip(limit * page)
        .limit(limit)
        .populate("usuario");

      const quantidadeClientes = await Cliente.count();

      return { listaDeClientes: clientes, quantidadeClientes };
    },

    async cliente(_, { id }) {
      const cliente = await Cliente.findById(id).populate("usuario");
      return cliente;
    },

    async clientesPorUsuario(_, { id, page = 0, limit = 10, filtro = "" }) {
      if (limit > 50) limit = 50;

      const clientes = await Cliente.find({
        $or: [
          { nome: { $regex: `${filtro}`, $options: "i" } },
          { email: { $regex: `${filtro}`, $options: "i" } },
          { documento: { $regex: `${filtro}`, $options: "i" } },
          { razaoSocial: { $regex: `${filtro}`, $options: "i" } },
          { inscricaoEstadual: { $regex: `${filtro}`, $options: "i" } }
        ]
      })
        .skip(limit * page)
        .limit(limit)
        .where({ usuario: id });

      return clientes;
    }
  },

  Mutation: {
    async adicionarCliente(_, { clienteInput: { ...cliente } }) {
      const novoCliente = new Cliente({ ...cliente });
      const resposta = (await novoCliente.save()).populate("usuario");
      return resposta;
    },

    async atualizaCliente(_, { id, clienteInput }) {
      try {
        const clienteAtualizado = await Cliente.findOneAndUpdate(
          { _id: id },
          { ...clienteInput },
          { new: true, runValidators: true }
        ).populate("usuario");

        return clienteAtualizado;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  }
};