const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

router.get('/competencias', async (req, res) => {
  const sql = "SELECT * FROM competencias_descricao;";
  try {
    connection.query(sql, function (err, result, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        res.status(500).send('Erro ao buscar competências',);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro ao buscar competências');
  }
});

router.post("/competencias", async (req, res) => {
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

router.delete("/competencias/:id", (req, res) => {
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

router.put("/competencias", (req, res) => {
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

module.exports = router;