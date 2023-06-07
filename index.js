const express = require('express');
const cors = require("cors");
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.redirect("Competencias\index.html");
});

const competenciaRotas = require('./Competencias/competenciasRotas');
const competenciaPerfilRotas = require('./Competencias/competenciasPerfilRotas');

app.use('/', competenciaRotas);
app.use('/', competenciaPerfilRotas);

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
