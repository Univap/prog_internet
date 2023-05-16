// Função para executar quando o arquivo de imagem for selecionado
function exibirImagemSelecionada1() {
  var input = document.getElementById('input-imagem-1');

  if (input.files && input.files[0]) {
    var arquivo = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var imagemURL = e.target.result;

      // Cria um elemento de imagem e define a URL da imagem selecionada como seu atributo "src"
      var imagem = document.createElement('img');
      imagem.src = imagemURL;

      // Limpa o conteúdo anterior
      var visualizacao = document.getElementById('visualizacao-imagem-1');
      visualizacao.innerHTML = '';

      // Adiciona a imagem à visualização
      visualizacao.appendChild(imagem);
    }

    reader.readAsDataURL(arquivo);
  }
}

// Associa a função ao evento "change" do input de imagem
var inputImagem1 = document.getElementById('input-imagem-1');
inputImagem1.addEventListener('change', exibirImagemSelecionada1);

// Função para executar quando o arquivo de imagem for selecionado
function exibirImagemSelecionada2() {
  var input = document.getElementById('input-imagem-2');

  if (input.files && input.files[0]) {
    var arquivo = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var imagemURL = e.target.result;

      // Cria um elemento de imagem e define a URL da imagem selecionada como seu atributo "src"
      var imagem = document.createElement('img');
      imagem.src = imagemURL;

      // Limpa o conteúdo anterior
      var visualizacao = document.getElementById('visualizacao-imagem-2');
      visualizacao.innerHTML = '';

      // Adiciona a imagem à visualização
      visualizacao.appendChild(imagem);
    }

    reader.readAsDataURL(arquivo);
  }
}

// Associa a função ao evento "change" do input de imagem
var inputImagem2 = document.getElementById('input-imagem-2');
inputImagem2.addEventListener('change', exibirImagemSelecionada2);

// Função para dropdown_menu
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')
    
    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
};

// Senha Visivel


function myFunction2() {
  var x = document.getElementById("myInput2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

// Abrir e Fechar Sobre 

//Abrir Sobre
var botao = document.getElementById("sobre");
var div = document.getElementById("areasobre");

botao.addEventListener("click", function() {
    if (div.style.display === "none") {
        div.style.display = "flex";
    } else {
        div.style.display = "none";
    }
});

//Abrir Editar
const botao1 = document.getElementById("editar");
const botao2 = document.getElementById("salvarsobre");
const div1 = document.getElementById("areasobre1");


botao1.addEventListener("click", () => {
  div1.style.display = "flex";
  div.style.display = "none";
});

botao2.addEventListener("click", () => {
  div1.style.display = "none";
  div.style.display = "flex";
});
