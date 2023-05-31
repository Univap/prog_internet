function carregarPublicacoes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("publicacoes").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/Publicacoes/pages/index.html", true);
    xhttp.send();
  }
  