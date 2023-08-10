export const templateNovoPedido = (nomeRepresentante: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">KMB Rodizios<div></div>
</div>

<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif">
  <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
    <tr style="width:100%">
      <td>
      <img alt="Linear" src="https://i.ibb.co/KLvf9xD/logo.jpg" width="220" height="220" style="display:block;outline:none;     border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />

        <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Um novo pedido foi feito por ${nomeRepresentante}</h1>
        
        <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">Faça login com seu E-mail em: <br>
        ${process.env.LINK_LOGIN} <br>
        e visualize o pedido.
        </p>

        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="${process.env.LINK_LOGIN}">KMB Rodizios</a>
      </td>
    </tr>
  </table>
</body>
</html>`;
};