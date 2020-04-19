const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const server = express();
const port = process.env.PORT || 5000;
console.log(`Server running in PORT: ${port}`);

server.use(cors()); // permite recebimento de requisições
server.use(express.json()); // altera padrão de dados
server.use(cookieParser()); // ativa utilização de cookies
server.use(routes); // adiciona modulo de rotas

server.listen(port); // adiciona porta de acesso http://localhost:3333