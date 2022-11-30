// ///Testar a conexão com o sequelize
// const sequelize = require('./database/db');
// async function testar() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// testar();

// ///Sincronizar o banco de dados
// const pessoa = require('./models/Pessoa');
// async function sincronizar() {
//   await pessoa.sync();
//   console.log('Sincronizado');
// }
// sincronizar();

// ///Salvar uma pessoa
// ///const pessoa = require('./models/Pessoa');
// async function salvar() {
//   const paulo = pessoa.build({
//     nome: "Paulo",
//     email: "paulo@gmail.com"
//   });
//   await paulo.save();
// }
// salvar();

const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.API_PORT;
const pessoaController = require('./controllers/PessoaController');

//Rotas para a entidade pessoa
app.get('/pessoas', pessoaController.listarPessoas);
app.get('/pessoas/:id', pessoaController.buscarPessoa);
app.post('/pessoas', pessoaController.salvarPessoa);
app.delete('/pessoas/:id', pessoaController.deletarPessoa);
app.put('/pessoas/:id', pessoaController.atualizarPessoa);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})