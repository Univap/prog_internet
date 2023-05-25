const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const mysql = require('mysql2');
require('dotenv').config(); // Importe e configure o dotenv

const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);
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

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

app.get('/competencias', async(req, res) => {
  const sql = "SELECT * FROM competencias_descricao;";
  try {
    connection.query(sql, function (err, result, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro ao buscar competências', );
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro ao buscar competências');
  }  
});

app.post("/competencias", async (req, res) => {
  const { nome_competencia, descricao_competencia } = req.body;

  if (!nome_competencia || !descricao_competencia) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }
  try {
    const sql = "INSERT INTO competencias_descricao (nome_competencia, descricao_competencia) VALUES (?, ?)";
    connection.query(sql, [nome_competencia, descricao_competencia], function (err, result) {
      if (err) {
        console.error("Erro ao salvar competencia no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro ao criar competencia" });
      }

      const competenciaId = result.insertId;
      return res.json({ mensagem: "Sucesso ao criar competencia", id: competenciaId });
    });
  } catch (error) {
    console.error("Erro ao salvar competencia no banco de dados:", error);
    return res.status(500).json({ mensagem: "Erro ao criar competencia" });
  }
});

app.delete("/competencias/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM competencias_descricao WHERE codigo_competencia = ?";
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.error("Erro ao deletar competência do banco de dados:", err);
      return res.status(500).json({ mensagem: "Erro ao deletar competência" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Não encontrado" });
    }

    return res.json({ mensagem: "Sucesso ao deletar competência" });
  });
});

app.put("/competencias", (req, res) => {
  const obj_to_update = req.body;
  if (!obj_to_update.nome_competencia || !obj_to_update.descricao_competencia) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  const sql = "UPDATE competencias_descricao SET nome_competencia = ?, descricao_competencia = ? WHERE codigo_competencia = ?";

  connection.query(sql, [obj_to_update.nome_competencia, obj_to_update.descricao_competencia, obj_to_update.id], function (err, result) {
    if (err) {
      console.error("Erro ao atualizar competência no banco de dados:", err);
      return res.status(500).json({ mensagem: "Erro ao atualizar competência" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Não encontrado" });
    }

    return res.json({ mensagem: "Sucesso ao atualizar competência" });
  });
});

app.get('/self-competencias/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM competencias where Perfil_matricula = ?;";
  try {
    connection.query(sql,[id], function (err, result, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro ao buscar competências', );
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro ao buscar competências');
  }  
});

app.post("/self-competencias", (req, res) => {
  const { nome_competencia, descricao_competencia, codigo_competencia, Perfil_matricula } = req.body;
  console.log(req.body);
  if (!nome_competencia || !descricao_competencia) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }
  try {
    const sql = "INSERT INTO competencias (idCompetencias, competencias, Perfil_matricula) VALUES (?,?,?)";
    connection.query(sql, [codigo_competencia, nome_competencia, Perfil_matricula], function (err, result) {
      if (err) {
        console.error("Erro ao salvar competencia no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro ao criar competencia" });
      }

      const competenciaId = result.insertId;
      return res.json({ mensagem: "Sucesso ao criar competencia", id: competenciaId });
    });
  } catch (error) {
    console.error("Erro ao salvar competencia no banco de dados:", error);
    return res.status(500).json({ mensagem: "Erro ao criar competencia" });
  }
});

app.delete("/self-competencias/:perfil/:id", (req, res) => {
  const perfil = parseInt(req.params.perfil);
  const id = parseInt(req.params.id);

  const sql = 'DELETE FROM competencias WHERE Perfil_matricula = ? AND idCompetencias = ?';

  connection.query(sql, [perfil, id], (err, result) => {
    if (err) {
      return res.status(500).json({"mensagem": "Erro interno do servidor"});
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({"mensagem": "Não encontrado"});
    }

    return res.status(200).json({"mensagem": "Excluído com sucesso"});
  });
});

app.listen(3001, () => {
  console.log('A API está rodando na porta 3001 uhul top');
});
