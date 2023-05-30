const express = require('express');
const cors = require("cors");
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('Perfil/HTML'));

app.get("/", (req, res) => {
  res.redirect("Perfil/HTML/index.html");
});

const competenciaRotas = require('./Competencias/competenciasRotas');
const competenciaPerfilRotas = require('./Competencias/competenciasPerfilRotas');

app.use('/competencias', competenciaRotas);
app.use('/competencias-perfil', competenciaPerfilRotas);

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
