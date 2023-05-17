const mysql = require("mysql2")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/frontend'))

const databaseParameters = {
    host: process.env.HOST , user: process.env.USER, password: process.env.PASSWORD,
    database: process.env.DATABASE 
}

//app.use(express.static('public', { index: 'myindex.html' }));

/*app.get('', function(req,res){
    res.sendFile(__dirname+'/frontend/index.html')    
})*/

app.post('/experiencias', function (req, res) {

    const idUsuario = req.body.idUsuario
    const email = req.body.email
    const senha = req.body.senha
    const nome = req.body.nome
    const connection = mysql.createConnection(databaseParameters)

    const sql = "INSERT INTO usuario VALUES (?)"
    const values = [idUsuario, email, senha, nome]

    connection.query(sql, [values], function (err, result, fields) {
        if (err) {
            res.send({ result: "Ocorreu um erro no cadastro do usuario" })
        } else {
            res.send({ result: "Usuario cadastrado com sucesso" })
        }
    })

})

app.get("/experiencias", function (req, res) {

    const connection = mysql.createConnection(databaseParameters)
    const sql = "SELECT * FROM usuario"

    connection.query(sql, function (err, result, fields) {
        res.send(result)
    })
})

app.delete("/experiencias", function (req, res) {

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

})

app.put("/experiencias", function (req, res) {

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

})

app.listen(8080)
