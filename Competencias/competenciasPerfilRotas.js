const express = require('express');
const router = express.Router();
const connection = require('../database.js');

router.get('/self-competencias/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM competencias where Perfil_matricula = ?;";
  try {
    connection.query(sql, [id], function (err, result, fields) {
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

router.post("/self-competencias", (req, res) => {
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

router.delete("/self-competencias/:perfil/:id", (req, res) => {
  const perfil = parseInt(req.params.perfil);
  const id = parseInt(req.params.id);

  const sql = 'DELETE FROM competencias WHERE Perfil_matricula = ? AND idCompetencias = ?';

  connection.query(sql, [perfil, id], (err, result) => {
    if (err) {
      return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ "mensagem": "Não encontrado" });
    }

    return res.status(200).json({ "mensagem": "Excluído com sucesso" });
  });
});

module.exports = router;