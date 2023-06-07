const mysql = require("mysql2");
require('dotenv').config({ path: __dirname + '/../.env.local' });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../frontend', { index: "html/experiencias.html" }));


const databaseParameters = {
    host: process.env.HOST, user: process.env.USER, password: process.env.PASSWORD,
    database: process.env.DATABASE
}

app.post('/experiencias', function (req, res) {

    const empresa = req.body.empresa;
    const cargo = req.body.cargo;
    const inicio = req.body.inicio;
    const termino = req.body.termino;
    const atual = req.body.atual;
    const comentario = req.body.comentario;
    const perfilMatricula = req.body.perfilMatricula;    
    const connection = mysql.createConnection(databaseParameters);

    let sql;
    let values;

    if (atual == 1) {
        sql = "UPDATE experiencia SET atual = 0 WHERE experiencia.Perfil_matricula=?";
        values = perfilMatricula;
        connection.query(sql, values)
    }   

    sql = "INSERT INTO experiencia VALUES (null,?)"
    values = [perfilMatricula, empresa, cargo, inicio, termino, atual, comentario]

    connection.query(sql, [values], function (err, result, fields) {
        if (err) {
            res.send({ result: "Ocorreu um erro no cadastro da experiencia" })
            console.log(err)
        } else {
            res.send({ result: "Experiencia cadastrada com sucesso" })
        }
    })

});

app.get("/perfil/:matricula/experiencias", function (req, res) {
    const matricula = req.params.matricula;
    const connection = mysql.createConnection(databaseParameters)
    const sql = "SELECT * FROM experiencia WHERE experiencia.Perfil_matricula=?"
    const value = matricula

    connection.query(sql,value, function (err, result, fields) {
        res.send(result)
    })
});

app.delete("/experiencias/:idExperiencia", function (req, res) {

    const idUsuario = req.body.idUsuario

    const connection = mysql.createConnection(databaseParameters)

    const sql = "DELETE FROM usuario WHERE usuario.idUsuario = (?)"
    const values = idUsuario

    connection.query(sql, values, function (err, result, fields) {
        if (err) {
            res.send({ result: "Ocorreu um erro ao deletar o usuario" })
        } else {
            res.send({ result: "Usuario deletado com sucesso" })
        }
    })

});

app.put("/experiencias/:idExperiencia", function (req, res) {

    const idUsuario = req.body.idUsuario
    const email = req.body.email
    const senha = req.body.senha
    const nome = req.body.nome
    const connection = mysql.createConnection(databaseParameters)

    const sql = "UPDATE usuario SET email = ?, senha = ?, nome = ? WHERE usuario.idUsuario=?"
    const values = [email, senha, nome, idUsuario]

    connection.query(sql, values, function (err, result, fields) {
        if (err) {
            res.send({ result: "Ocorreu um erro ao atualizar o usuario" })
        } else {
            res.send({ result: "Usuario atualizado com sucesso" })
        }
    })

});

app.listen(8080);
