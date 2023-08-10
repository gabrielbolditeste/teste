import { IUsuarioModel, Usuario } from "../../../DataBase/models/usuario.js";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { enviarEmailEsqueciMinhaSenha } from "../../../Email/EsqueciMinhaSenha/index.js";
import { criaSenha } from "../../../utils/criaSenha.js";
import { enviarEmailNovoUsuario } from "../../../Email/NovoUsuario/index.js";
import ErroBase from "../../../Errors/ErroBase.js";

export const usuarioResolvers = {
  Query: {
    async usuarios(_, { page = 0, limit = 10, ativo = undefined, filtro = "" }) {
      if (limit > 50) limit = 50;

      const quantidadeUsuarios = await Usuario.count();
      let listaUsuarios: IUsuarioModel[];

      switch (ativo) {
      case undefined:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ permissao: "USER" });
        break;
      case true:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ ativo: ativo, permissao: "USER" });
        break;
      case false:
        listaUsuarios = await Usuario.find({
          $or: [
            { nome: { $regex: `${filtro}`, $options: "i" } },
            { email: { $regex: `${filtro}`, $options: "i" } },
            { documento: { $regex: `${filtro}`, $options: "i" } }
          ]
        }).skip(limit * page).limit(limit).where({ ativo: ativo, permissao: "USER" });
        break;
      }
      return { listaUsuarios, quantidadeUsuarios };
    },

    async usuario(_, { id }) {
      const usuario = await Usuario.findById(id);
      return usuario;
    },

    async usuariosComoResponsavel(_, { page = 0, limit = 10 }) {
      if (limit > 50) limit = 50;

      let listaUsuarios: IUsuarioModel[];

      try {
        listaUsuarios = await Usuario.find()
          .skip(limit * page)
          .limit(limit)
          .where({ 
            $or: [
              { permissao: "USER" }, 
              { permissao: "ADM" }
            ] 
          })
          .sort({ nome: "asc"});

        return listaUsuarios;

      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    }
  },

  Mutation: {
    async adicionarUsuario(_, { usuarioInput: { ...usuario } }) {
      try {
        const oldUserEmail = await Usuario.findOne({ email: usuario.email });
        const oldUserCpf = await Usuario.findOne({ documento: usuario.documento });

        if (oldUserEmail || oldUserCpf) {
          ErroBase.enviarResposta("Documento ou E-mail já cadastrado.");
        }

        const senha = criaSenha();
        const senhaCryptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = new Usuario({
          ...usuario,
          email: usuario.email.toLowerCase(),
          senha: senhaCryptografada,
          jwt: jwt.sign({
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao,
          }, process.env.KEY_JWT)
        });

        const resp = await novoUsuario.save();
        
        if (resp) {  
          await enviarEmailNovoUsuario(usuario.email, senha);
        }

        return resp;
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async loginUsuario(_, { loginInput: { email, senha } }) {
      try {
        const usuario = await Usuario.findOne({ email: email.toLowerCase() });
        if (usuario.ativo === false) throw new GraphQLError("Seu perfil está bloqueado, entre em contato com o administrador.");

        if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
          usuario.jwt = jwt.sign({
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao,
          },
          process.env.KEY_JWT
          );
          return usuario;
        } else {
          ErroBase.enviarResposta("Erro ao efetuar login");
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizaSenha(_, { novaSenhaInput: { email, senha, novaSenha } }) {
      try {
        const usuario = await Usuario.findOne({ email });

        if (usuario === null) {
          throw new GraphQLError("Email não encontrado");
        } else if (usuario && (await bcrypt.compare(senha, usuario.senha.toString()))) {
          usuario.jwt = jwt.sign({
            nome: usuario.nome,
            email: usuario.email,
            permissao: usuario.permissao,
          }, process.env.KEY_JWT);
          usuario.senha = await bcrypt.hash(novaSenha, 10);
          await usuario.save();
          return "Nova senha Salva";
        } else {
          ErroBase.enviarResposta("Senha Atual incorreta");
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    },

    async atualizaUsuario(_, { id, usuarioInput }) {
      try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate({ _id: id }, { ...usuarioInput }, { new: true });
        return usuarioAtualizado;
      } catch (error) {
        if (error.code === 11000) {
          ErroBase.enviarResposta("Email já cadastrado no sistema");
        } else {
          ErroBase.enviarResposta("Erro interno do sistema.");
        }
      }
    },

    async esqueciMinhaSenha(_, { email }) {
      try {
        const usuario = await Usuario.findOne({ email: email.toLowerCase() });
        if (!usuario) {
          ErroBase.enviarResposta("Email não encontrado");
        } else {
          const senha = criaSenha();
          console.log("[Email e NovaSenha] - ", email, senha);
          enviarEmailEsqueciMinhaSenha(email, senha);
          usuario.senha = await bcrypt.hash(senha, 10);
          await usuario.save();
          return "Nova senha enviada por E-mail";
        }
      } catch (error) {
        ErroBase.enviarResposta(error.message);
      }
    } 
  }
};
