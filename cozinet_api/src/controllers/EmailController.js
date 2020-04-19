const nodemailer = require('nodemailer');
const ParametrosDoSistema = require('../util/ParametrosDoSistema');

async function sendEmailMethod(title, to, html = '') {
  if ((!title, !to)) {
    // sem assunto e remetente email da falha
    return false;
  }

  const { params } = await ParametrosDoSistema();
  const { nameProject, emailAddress, emailPassword } = params;
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: emailAddress, // email Gmail
      pass:  emailPassword// senha Gmail
    }
  });

  let mailOptions = {
    from: `"${nameProject} - ${title}" <${emailAddress}>`,
    to, // destino. Multiple emails can send separated by commas
    subject: title, // titulo
    html // conteudo
  };
  return transporter
    .sendMail(mailOptions)
    .then(info => {
      let result = true;
      if (info.rejected.length > 0) {
        info.rejected.forEach(rej => {
          console.log(`Email rejeitado por ${rej}!`);
        });
        result = false;
      }
      return result;
    })
    .catch(error => {
      console.log(`Falha ao enviar email para ${to}! Erro: ${error}`);
      return false;
    });
}

module.exports = {
  sendEmailMethod,
  // sendEmail_ForgotPassword(email) {
  //   return sendEmailMethod(
  //     'Recuperação de conta',
  //     email,
  //     `<a href="https://www.google.com" >Clique aqui para trocar sua senha</a>`
  //   );
  // }
};
