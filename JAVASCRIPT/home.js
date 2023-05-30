const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const btnPopup = document.getElementsByClassName('btnLogin-popup');
const btnCopy = document.getElementsByClassName('btnCopy-popup');
const wrapper = document.querySelector('.wrapper');
const Copy = document.querySelector('.Copy');
const CopyClose = document.querySelector('.Copy-close');
const iconClose = document.querySelector('.icon-close');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');


// Função para executar quando o arquivo de imagem for selecionado
function exibirImagemSelecionada() {
  var input = document.getElementById('input-imagem');

  if (input.files && input.files[0]) {
    var arquivo = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var imagemURL = e.target.result;

      // Cria um elemento de imagem e define a URL da imagem selecionada como seu atributo "src"
      var imagem = document.createElement('img');
      imagem.src = imagemURL;
      imagem.style.maxWidth = '300px'; // Ajuste o tamanho conforme necessário

      // Limpa o conteúdo anterior
      var visualizacao = document.getElementById('visualizacao-imagem');
      visualizacao.innerHTML = '';

      // Adiciona a imagem à visualização
      visualizacao.appendChild(imagem);
    }

    reader.readAsDataURL(arquivo);
  }
}

// Associa a função ao evento "change" do input de imagem
var inputImagem = document.getElementById('input-imagem');
inputImagem.addEventListener('change', exibirImagemSelecionada);

/* Senha-visivel */
function myFunction1() {
  var x = document.getElementById("myInput1");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};
function myFunction2() {
  var x = document.getElementById("myInput2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};
function myFunction3() {
  var x = document.getElementById("myInput3");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

/* Abrir Login */
for(let button of btnPopup){
  button.addEventListener('click', (event)=> {
    wrapper.classList.add('active-popup');
  })
}
/* Abrir Copyrigh */
for(let button of btnCopy){
  button.addEventListener('click', (event)=> {
    Copy.classList.add('active-popup');
  })
}
/* Fechar Copyrigh */
CopyClose.addEventListener('click', ()=> {
  Copy.classList.remove('active-popup');
});
/* Fechar Login */
iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});
/* Fechar Cadastro */
loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});
/* Abrir Cadastro */
registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});