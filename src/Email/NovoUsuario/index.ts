import nodemailer from "nodemailer";
import { templateNovoUsuario } from "../templates/novoUsuario.js";

const smtp = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  service: "gmail",
  auth: {
    // type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    // clientId: process.env.OAUTH_CLIENTID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    // accessToken: process.env.OAUTH_ACCESS_TOKEN 
  },
});

const configEmailNovoUsuario = (to, senha) => {
  return {
    from: process.env.EMAIL,
    to: `${to}`,
    subject: "KMB Controle de serviço",
    html: templateNovoUsuario(senha)
  };
};

export async function enviarEmailNovoUsuario(email: string, senha: string) {
  console.log("[enviarEmailNovoUsuario] - ", email, senha);
  new Promise((resolver, reject) => {
    smtp.sendMail(configEmailNovoUsuario(`${email}`, `${senha}`))
      .then(res => {
        console.log("[SMTP] - ", res);
        smtp.close();
        return resolver(res);
      }).catch(err => {
        console.log("[SMTP error] - ", err);
        smtp.close();
        return reject(err);
      });
  });
}