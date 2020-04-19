const { Usuario } = require('../db/models');
// const EmailController = require('./EmailController');
var jwt = require('jsonwebtoken');

const { Encriptar } = require('../util/Criptografia');
const EnumCookies = require('../util/EnumCookies');
const EnumPermissao = require('../util/EnumPermissao');
const UsuarioService = require('../services/UsuarioService');
// const DatabaseService = require('../services/DatabaseService');

const ParametrosDoSistema = require('../util/ParametrosDoSistema');

const usuarioService = new UsuarioService(Usuario);

module.exports = {
  async cadastroUsuario(req, res) {
    const {
      nome,
      email,
      senha
      // cpf, dataNascimento
    } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome não informado!' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email não informado!' });
    }
    if (!senha) {
      return res.status(400).json({ error: 'Senha não informada!' });
    }
    // if (!cpf) {
    //   return res.status(400).json({ error: 'CPF não informado!' });
    // }
    // var nascimento = new Date(dataNascimento);
    // if (nascimento == 'Invalid Date') {
    //   return res.status(400).json({ error: 'Data de nascimento inválida!' });
    // }
    const usuario = await usuarioService.ObterCompletoPorEmail(email);
    if (usuario) {
      return res
        .status(400)
        .json({ error: 'Email já cadastrado para um usuário!' });
    }

    var hash = await Encriptar(senha);

    await usuarioService
      .Inserir({
        nome,
        email,
        senha: hash,
        // cpf,
        // dataNascimento,
        permissao: EnumPermissao.Basic
      })
      .then(Usuario =>
        res.json({
          nome,
          email
          // cpf,
          // dataNascimento
        })
      )
      .catch(err =>
        res.status(400).json({ error: 'Erro ao salvar Usuario! - ' + err })
      );
  },

  // async cadastroUsuarioAdmin(req, res) {
  //   const {
  //     nome,
  //     email,
  //     senha
  //     // cpf,  dataNascimento
  //   } = req.body;
  //   if (!nome) {
  //     return res.status(400).json({ error: 'Nome não informado!' });
  //   }
  //   if (!email) {
  //     return res.status(400).json({ error: 'Email não informado!' });
  //   }
  //   if (!senha) {
  //     return res.status(400).json({ error: 'Senha não informada!' });
  //   }
  //   // if (!cpf) {
  //   //   return res.status(400).json({ error: 'CPF não informado!' });
  //   // }
  //   // var nascimento = new Date(dataNascimento);
  //   // if (nascimento == 'Invalid Date') {
  //   //   return res.status(400).json({ error: 'Data de nascimento inválida!' });
  //   // }
  //   const usuario = await usuarioService.ObterCompletoPorEmail(email);
  //   if (usuario) {
  //     return res
  //       .status(400)
  //       .json({ error: 'Email já cadastrado para um usuário!' });
  //   }

  //   var hash = await Encriptar(senha);

  //   await usuarioService
  //     .Inserir({
  //       nome,
  //       email,
  //       senha: hash,
  //       // cpf,
  //       // dataNascimento,
  //       permissao: EnumPermissao.Admin
  //     })
  //     .then(Usuario =>
  //       res.json({
  //         nome,
  //         email
  //         // cpf,
  //         // dataNascimento
  //       })
  //     )
  //     .catch(err =>
  //       res.status(400).json({ error: 'Erro ao salvar Usuario! - ' + err })
  //     );
  // },

  async getUsuarios(req, res) {
    const usuarios = await usuarioService.ObterTodos({
      exclude: ['senha']
    });
    return res.json(usuarios);
  },

  async getUsuario(req, res) {
    const { id } = req.params;

    const usuario = await usuarioService.ObterPorId(id, {
      exclude: ['senha']
    });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }
    return res.json({
      nome: usuario.nome,
      email: usuario.email
      // cpf: usuario.cpf,
      // dataNascimento: usuario.dataNascimento
    });
  },

  async updateUsuario(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Id não informado!' });
    }
    const usuario = await usuarioService.ObterPorId(id);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    const {
      nome,
      email,
      senha
      // cpf, dataNascimento
    } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome não informado!' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email não informado!' });
    }
    if (!senha) {
      return res.status(400).json({ error: 'Senha não informada!' });
    }
    // if (!cpf) {
    //   return res.status(400).json({ error: 'CPF não informado!' });
    // }
    // var nascimento = new Date(dataNascimento);
    // if (nascimento == 'Invalid Date') {
    //   return res.status(400).json({ error: 'Data de nascimento inválida!' });
    // }

    usuarioService
      .Editar({
        id,
        nome,
        email
        // cpf,
        // dataNascimento: nascimento
      })
      .then(usuario =>
        res.json({
          nome: usuario.nome,
          email: usuario.email
          // cpf: usuario.cpf,
          // dataNascimento: usuario.dataNascimento
        })
      )
      .catch(err =>
        res.status(400).json({ error: 'Erro ao atualizar Usuario! - ' + err })
      );
  },

  async deleteUsuario(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Id não informado!' });
    }
    const usuario = await usuarioService.ObterPorId(id);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    try {
      await usuarioService.Deletar(id);

      return res.json({
        nome: usuario.nome,
        email: usuario.email
        // cpf: usuario.cpf,
        // dataNascimento: usuario.dataNascimento
      });
    } catch (err) {
      res.status(400).json({ error: 'Erro ao excluir Usuario! - ' + err });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email não informado!' });
    }
    if (!senha) {
      return res.status(400).json({ error: 'Senha não informada!' });
    }

    const usuario = await usuarioService.ObterCompletoPorEmail(email);

    if (!usuario) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    var verify = await Encriptar(senha);

    if (usuario.senha !== verify) {
      return res.status(400).json({ error: 'Senha inválida!' });
    }

    const { params } = await ParametrosDoSistema();

    const user = jwt.sign(
      { email: usuario.email, senha: usuario.senha },
      params.jwt,
      {
        expiresIn: 60 * 60 * 24 * 120 // ultimo digito é numéro de dias
      }
    );
    res.cookie(EnumCookies.User, user, {
      maxAge: 1000 * 60 * 60 * 24 * 120, // ultimo digito é numéro de dias
      httpOnly: true
    });

    const userResult = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permissao: usuario.permissao,
      // cpf: usuario.cpf,
      // dataNascimento: usuario.dataNascimento,
      [EnumCookies.User]: user
    };
    // if (usuario.UsuarioLojista && usuario.UsuarioLojista.length > 0) {
    //   userResult['Loja'] = usuario.UsuarioLojista[0].Loja;
    // }
    return res.json(userResult);
  },

  async loginValidate(req, res) {
    const { currentUser } = req;

    if (!currentUser) {
      return res.status(400).json({ error: 'Usuário não autenticado!' });
    }

    const user = {
      id: currentUser.id,
      nome: currentUser.nome,
      email: currentUser.email,
      permissao: currentUser.permissao
    };
    // if (currentUser.UsuarioLojista && currentUser.UsuarioLojista.length > 0) {
    //   user['Loja'] = currentUser.UsuarioLojista[0].Loja;
    // }

    return res.json(user);
  },

  // async forgotPassword(req, res) {
  //   const { email } = req.body;

  //   if (!email) {
  //     return res.status(400).json({ error: 'Email não informado!' });
  //   }
  //   const usuario = await usuarioService.ObterCompletoPorEmail(email);
  //   if (!usuario) {
  //     return res.status(400).json({ error: 'Usuario não encontrado!' });
  //   }

  //   const enviado = await EmailController.sendEmail_ForgotPassword(email);

  //   return res.json({ enviado });
  // }
};
