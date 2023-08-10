import nodemailer from "nodemailer";
import { templateNovoPedido } from "../templates/notificacaoNovoPedido.js";

const smtp = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const configEmailNovoPedido = (to: string[], nomeRepresentante: string) => {
  return {
    from: process.env.EMAIL,
    to: `${to}`,
    subject: "KMB Controle de serviço",
    html: templateNovoPedido(nomeRepresentante)
  };
};

export const enviarEmailNovoPedido = (email: string[], nomeRepresentante: string) => {
  if (email.length > 0) {
    new Promise((resolver, reject) => {
      smtp.sendMail(configEmailNovoPedido(email, nomeRepresentante))
        .then(res => {
          smtp.close();
          return resolver(res);
        }).catch(err => {
          smtp.close();
          return reject(err);
        });
    });
  }
};