function formatarData(date) {
    var dateTime = new Date(date);

    // Format the date and time
    var formattedDate = ('0' + dateTime.getDate()).slice(-2);
    var formattedMonth = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    var formattedYear = dateTime.getFullYear();
    var formattedTime = ('0' + dateTime.getHours()).slice(-2) + ':' + ('0' + dateTime.getMinutes()).slice(-2);

    // Create the formatted date and time string
    var dateAndTime = formattedDate + '/' + formattedMonth + '/' + formattedYear + ' ' + formattedTime;

    return dateAndTime;
}

function fetchComments(id) {
    var data = {
        id: id
    };

    fetch('/comments', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        populateComments(data);
        // console.log(data);
    })
    .catch(error => console.error(error));
}

function removeComments() {
    var commentRows = document.querySelectorAll("tr.comentario");

    commentRows.forEach(function(row) {
        row.remove();
    });
}

function populateComments(data) {
    removeComments();

    var tableBody = document.querySelector('#post tbody');

    // Comentários
    data.forEach(comment => {
        var commentRow = document.createElement('tr');
        commentRow.classList.add('comentario');

        var commentImg = document.createElement('td');
        commentImg.classList.add('fotoperfil');

        // Imagem de perfil com link
        var commentImgLink = document.createElement('a');
        commentImgLink.setAttribute('href', './perfil?id=' + comment.Perfil_matricula);
        var commentImgImg = document.createElement('img');
        commentImgImg.setAttribute('src', '../img/Perfil.jpg');
        commentImgLink.appendChild(commentImgImg);
        commentImg.appendChild(commentImgLink);
        
        var commentCell = document.createElement('td');
        commentCell.classList.add('conteudo_comentario')

        // Nome do autor com link pro perfil
        var commentLink = document.createElement('a');
        commentLink.setAttribute('href', './perfil?id=' + comment.Perfil_matricula);
        var commentNome = document.createTextNode(comment.nome);
        commentLink.appendChild(commentNome);
        commentCell.appendChild(commentLink);

        var commentContent = document.createElement('p'); 
        var commentText = document.createTextNode(comment.mensagem);
        commentContent.appendChild(commentText);
        commentCell.appendChild(commentContent);

        // Data e hora da publicação
        var commentData = document.createElement('p');
        commentData.classList.add('datahora');
        var dataHora = document.createTextNode(formatarData(comment.momento));
        commentData.appendChild(dataHora);
        commentCell.appendChild(commentData);
        
        var commentRet = document.createElement('td');
        commentRet.classList.add('trespontos');
        commentRet.innerHTML = '<p>...</p>';
        
        commentRow.appendChild(commentImg);
        commentRow.appendChild(commentCell);
        commentRow.appendChild(commentRet);
        tableBody.appendChild(commentRow);
    });
}

function fetchPost(id) {
    var data = {
        id: id
    };

    // Send request to the Node.js server to fetch post and comments data
    fetch('/post_data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        populatePost(data);
        // console.log(data);
    })
    .catch(error => console.error(error));
}

function populatePost(data) {
    // Autor
    var autorRow = document.querySelector('#post .autor');
    var autorImg = document.createElement('td');
    var autorData = document.createElement('td');
    var autorRet = document.createElement('td');
    autorRet.innerHTML = '<p>...</p>';
    
    // Criando classes
    autorImg.classList.add('fotoperfil');
    autorData.classList.add('nomedata');
    
    // Imagem de perfil com link
    var autorImgLink = document.createElement('a');
    autorImgLink.setAttribute('href', './perfil?id=' + data.perfil_id);
    var autorImgImg = document.createElement('img');
    autorImgImg.setAttribute('src', '../img/Perfil.jpg');
    autorImgLink.appendChild(autorImgImg);
    autorImg.appendChild(autorImgLink);

    // Nome do autor com link pro perfil
    var autorNomeLink = document.createElement('a');
    autorNomeLink.setAttribute('href', './perfil?id=' + data.perfil_id);
    autorNomeLink.classList.add('nome');
    var autorNome = document.createTextNode(data.nome);
    autorNomeLink.appendChild(autorNome);
    autorData.appendChild(autorNomeLink);

    // Data e hora da publicação
    var postData = document.createElement('a');
    postData.setAttribute('href', './post?id=' + data.id);
    postData.classList.add('datahora');
    var dataHora = document.createTextNode(formatarData(data.momento));
    postData.appendChild(dataHora);
    autorData.appendChild(postData);

    // Adicionar conteúdo do autor
    autorRow.appendChild(autorImg);
    autorRow.appendChild(autorData);
    autorRow.appendChild(autorRet);

    // Publicação
    var postRow = document.querySelector('#post .post');
    var postContent = document.createElement('td');
    postContent.setAttribute('colspan', '3');
    postContent.innerHTML = data.cont;
    postRow.appendChild(postContent);

    document.title = "Publicação de " + data.nome + " - Linkivap";
}

function addComment() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    var id_post = urlParams.get("id");
    var text = document.getElementById('caixa-comentario').value;
    var id_autor = 3;

    var data = {
        id: id_post,
        cont: text,
        user: id_autor
    };
    
    fetch('/comment', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao publicar comentário: ${response.status} ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        fetchComments(id_post);
        console.log('Comentário publicado com sucesso!');
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', function(){
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    fetchPost(id);
    fetchComments(id);
});