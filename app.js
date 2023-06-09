var express = require('express');
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "mydb"});

con.connect((error) => {
    if(error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } else {
        console.log('Conexão bem-sucedida com o banco de dados!');
    }
});

app.use(express.static(__dirname + '/post'));
app.use(express.json());

// app.get('/', function(req, res) {
//     // res.send("Olá, mundo!");
// });

app.get('/post', function(req, res) {
    res.sendFile(__dirname + "/post/index.html");
});

app.post('/comment', function(req, res) {
    var post = req.body;
    
    var sql = 'INSERT INTO `comentario` (`Post_idPost`, `mensagem`, `Perfil_matricula`) VALUES (?, ?, ?)';
    var values = [post.id, post.cont, post.user];

    con.query(sql, values, function(err, result) {
        if (err) throw err;
        res.send('Comentário inserido com sucesso');
    });
});

app.delete('/comment/:id', function(req, res) {
    var commentId = req.params.id;

    var sql = 'DELETE FROM `comentario` WHERE id = ?';
    var values = [commentId];

    // Execute the SQL query
    con.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log('Post deleted successfully');
        res.send('Post deleted successfully');
    });
});

app.put('/comment/:id', function(req, res) {

});

app.post('/post_data', function(req, res) {
    let id = req.body.id;

    // fetch post data
    var postSql = 'SELECT `idPost` as "id", `Postcol` as "cont", `momento`, `Perfil_matricula` as "perfil_id", p.nome FROM `post` LEFT JOIN perfil as p ON `Perfil_matricula` = p.matricula WHERE idPost = ?;';
    con.query(postSql, [id], function (err, postResult, postFields) {
        if (err) throw err;
        
        res.send(postResult[0]);
    });
});

app.post('/comments', function(req, res) {
    let id = req.body.id;

    // fetch comments data
    var commentsSql = 'SELECT c.id, p.nome, c.Perfil_matricula, c.mensagem, c.momento FROM comentario as c LEFT JOIN perfil as p ON c.Perfil_matricula = p.matricula WHERE c.Post_idPost = ? ORDER BY momento DESC;';
    con.query(commentsSql, [id], function (err, commentsResult, commentsFields) {
        if (err) throw err;

        res.send(commentsResult);
    });
});



app.listen(3000);