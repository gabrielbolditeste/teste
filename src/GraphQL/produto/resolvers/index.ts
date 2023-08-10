import { Produto } from "../../../DataBase/models/produto.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const produtoResolvers = {
  Query: {
    async produtos(_, { page = 0, limit = 10, ativo = undefined, filtro = "" }) {
      if (limit > 50) limit = 50;

      const quantidadeProdutos = await Produto.count();

      let listaProdutos;
      switch (ativo) {
      case undefined:
        listaProdutos = await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * page)
          .limit(limit)
          .sort({ descricao: 1 });
        break;
      case true:
        listaProdutos = await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * page)
          .limit(limit)
          .where({ ativo: ativo })
          .sort({ descricao: 1 });
        break;
      case false:
        listaProdutos = await Produto.find({
          $or: [
            { codigo: { $regex: `${filtro}`, $options: "i" } },
            { descricao: { $regex: `${filtro}`, $options: "i" } }
          ]
        })
          .skip(limit * page)
          .limit(limit)
          .where({ ativo: ativo })
          .sort({ descricao: 1 });
        break;
      }

      return { listaProdutos, quantidadeProdutos };
    },

    async produto(_, { id }) {
      const produto = await Produto.findById(id);
      return produto;
    },
  },

  Mutation: {
    async adicionarProduto(_, { produtoInput: { ...produto } }) {
      try {
        const novoProduto = new Produto({ ...produto });
        const resposta = await novoProduto.save();
        return resposta;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizaProduto(_, { id, produtoInput }) {
      const produtoAtualizado = await Produto.findByIdAndUpdate({ _id: id }, { ...produtoInput }, { new: true });
      return produtoAtualizado;
    },
  },
};