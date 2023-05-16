const button = document.getElementById("btn-salvar");
    button.onclick = enviarDados

    function enviarDados() {
      // Recupera os valores dos campos do formulário
      var empresa = document.getElementById("empresa").value;
      var cargo = document.getElementById("cargo").value;
      var inicio = document.getElementById("inicio").value;
      var termino = document.getElementById("termino").value;
      var atual = document.getElementById("atual").checked ? 1 : 0;
      var comentario = document.getElementById("comentario").value;

      // Cria um objeto com os dados
      var dados = {
        empresa: empresa,
        cargo: cargo,
        inicio: inicio,
        termino: termino,
        atual: atual,
        comentario: comentario
      };

      // Envia os dados para o servidor via AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "salvar-experiencia.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          alert("Experiência salva com sucesso!");
          // Limpa o formulário
          document.getElementById("formulario").reset();
        }
      };
      xhr.send(JSON.stringify(dados));

      return false;
    }