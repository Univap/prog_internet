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

//imagem de perfil
var imagem = document.getElementById("imagem");

//tres pontos

var buttons = document.getElementsByClassName("trespontos");

// Itera sobre todos os botões com a classe "trespontos"
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    // Encontra o elemento irmão com a classe "baredit"
    var baredit = this.nextElementSibling;
    
    // Alterna a exibição do elemento "baredit"
    if (baredit.style.display === "none") {
      baredit.style.display = "flex";
    } else {
      baredit.style.display = "none";
    }
  });
}