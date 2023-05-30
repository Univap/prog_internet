const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const mysql = require('mysql2');

require('dotenv').config(); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados!');
  }
});

const app = express();

app.use(express.json())
app.use(cors());
app.use(morgan('tiny'));

// Importar as rotas
const competenciaRotas = require('./competenciaRotas');
const competenciasPerfilRotas = require('./competenciasPerfilRotas');

// Configurar as rotas
app.use('/competencias', competenciaRotas);
app.use('/self-competencias', competenciasPerfilRotas);

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
