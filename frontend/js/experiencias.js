const perfilMatricula = 1738382;

const saveExperiencia = function () {

  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const inicio = document.getElementById("inicio").value;

  const checked = document.getElementById("atual").checked
  const atual = checked ? 1 : 0;

  const divTermino = document.getElementById("termino")
  const termino = checked ? inicio : divTermino.value;

  divTermino.classList.remove("hide");
  document.getElementById("labelTermino").classList.remove("hide");

  const comentario = document.getElementById("comentario").value;

  if (empresa != "" && cargo != "" && inicio != "" && termino != "" && comentario != "" && perfilMatricula != "") {
    const experiencia = {
      empresa: empresa,
      cargo: cargo,
      inicio: inicio,
      termino: termino,
      atual: atual,
      comentario: comentario,
      perfilMatricula: perfilMatricula
    };
    const url = "/experiencias";

    const response = fetch(url, {
      body: JSON.stringify(experiencia),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      loadExperiencia()
      alert(data.result);
    }).catch((error) => console.log(error))
  } else {
    alert(`Dados em branco!`);
  }

}

const buttonSalvar = document.getElementById("btn-salvar");
buttonSalvar.onclick = saveExperiencia;

const enableUpdateExperiencia = function (event) {

  const buttonAtualizar = document.getElementById("btn-atualizar")
  buttonAtualizar.classList.remove("hide")

  document.getElementById("container-cadastro").classList.remove("hide")
  document.getElementById("btn-salvar").classList.add("hide")

  const idExperiencia = event.target.getAttribute("data-idExperiencia")
  buttonAtualizar.setAttribute("data-idExperiencia", idExperiencia);

  const containerExperiencia = event.target.closest(".container-experiencia");
  const containerExperienciaTexts = containerExperiencia.querySelector('.container-experiencia-textos')

  const empresa = document.getElementById("empresa");
  const cargo = document.getElementById("cargo");
  const inicio = document.getElementById("inicio");
  const termino = document.getElementById("termino");
  const atual = document.getElementById("atual");
  const comentario = document.getElementById("comentario");

  empresa.value = containerExperienciaTexts.children[0].textContent;
  cargo.value = containerExperienciaTexts.children[1].textContent;
  comentario.value = containerExperienciaTexts.children[2].textContent;

  const datesForms = containerExperienciaTexts.querySelector(".dates-forms")

  const data = datesForms.children[0].textContent.split("/");
  const ano = data[2];
  const mes = data[1];
  const dia = data[0];

  const dataFormatada = `${ano}-${mes}-${dia}`;
  inicio.value = dataFormatada;

  const isAtual = datesForms.children[1].textContent == "Atual"
  if (isAtual) {
    atual.checked = true;
    termino.classList.add("hide");
    document.getElementById("labelTermino").classList.add("hide");
  } else {
    atual.checked = false
    termino.classList.remove("hide");
    document.getElementById("labelTermino").classList.remove("hide");
    const data = datesForms.children[1].textContent.split("/");
    const ano = data[2];
    const mes = data[1];
    const dia = data[0];
    const dataFormatada = `${ano}-${mes}-${dia}`;
    termino.value = dataFormatada;
  }

}

const deleteExperiencia = function (event) {
  const confirmDelete = confirm("Você tem certeza que você quer deletar essa experiência?");
  if (confirmDelete) {
    const idExperiencia = event.target.getAttribute("data-idExperiencia");
    const url = `/experiencias/${idExperiencia}`;

    const response = fetch(url, {      
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      loadExperiencia()
      alert(data.result);
    }).catch((error) => console.log(error))
  }
}

const loadExperiencia = function (event) {  

  const url = `/perfil/${perfilMatricula}/experiencias`
  const response = fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => {
    return response.json();
  }).then((experiencias) => {
    const divExperiencias = document.getElementById("container-experiencias");
    divExperiencias.innerHTML = "";

    for (let experiencia of experiencias) {

      const divExperiencia = document.createElement("div");
      divExperiencia.className = "container-experiencia";

      const divExperienciaTexts = document.createElement("div");
      divExperienciaTexts.className = "container-experiencia-textos";

      const divEmpresa = document.createElement("div");
      divEmpresa.innerHTML = experiencia.empresa;

      const divCargo = document.createElement("div");
      divCargo.innerHTML = experiencia.cargo;

      const divDescricao = document.createElement("div");
      divDescricao.innerHTML = experiencia.comentario;

      const divDates = document.createElement("div");
      divDates.className = "dates-forms"

      const divInicio = document.createElement("div");
      divInicio.innerHTML = new Date(experiencia.inicio + "T00:00:00").toLocaleDateString('pt-BR');

      const divTermino = document.createElement("div");
      divTermino.innerHTML = experiencia.termino
      divTermino.innerHTML = new Date(divTermino.innerHTML + "T00:00:00").toLocaleDateString('pt-BR');
      divTermino.innerHTML = experiencia.atual == 1 ? "Atual" : divTermino.innerHTML;

      divDates.append(divInicio)
      divDates.append(divTermino)

      divExperienciaTexts.append(divEmpresa)
      divExperienciaTexts.append(divCargo)
      divExperienciaTexts.append(divDescricao)
      divExperienciaTexts.append(divDates)

      const divExperienciaButtons = document.createElement("div");
      divExperienciaButtons.className = "container-experiencia-buttons";

      const buttonEnableUpdate = document.createElement("button");
      buttonEnableUpdate.innerHTML = "Atualizar";
      buttonEnableUpdate.className = "button-update";
      buttonEnableUpdate.setAttribute("data-idExperiencia", experiencia.idExperiencia);
      buttonEnableUpdate.addEventListener("click", enableUpdateExperiencia);

      const buttonDelete = document.createElement("button");
      buttonDelete.innerHTML = "Deletar";
      buttonDelete.className = "button-delete";
      buttonDelete.setAttribute("data-idExperiencia", experiencia.idExperiencia);
      buttonDelete.addEventListener("click", deleteExperiencia);

      divExperienciaButtons.append(buttonEnableUpdate)
      divExperienciaButtons.append(buttonDelete)

      divExperiencia.append(divExperienciaTexts)
      divExperiencia.append(divExperienciaButtons)

      divExperiencias.append(divExperiencia)


    }
  }).catch((error) => console.log(error));

}

const inicio = function () {
  loadExperiencia()
}

window.onload = inicio

const showCadastro = function () {
  document.getElementById("container-cadastro").classList.remove("hide")
  document.getElementById("btn-salvar").classList.remove("hide")
  document.getElementById("btn-atualizar").classList.add("hide")
}

const buttonNova = document.getElementById("button-nova")
buttonNova.onclick = showCadastro

const cancelarOperacao = function () {

  document.getElementById("container-cadastro").classList.add("hide")
  document.getElementById("btn-salvar").classList.add("hide")
  document.getElementById("btn-atualizar").classList.add("hide")

  document.getElementById("empresa").value = "";
  document.getElementById("cargo").value = "";
  document.getElementById("inicio").value = "";

  const buttonTermino = document.getElementById("termino")
  buttonTermino.value = "";
  buttonTermino.classList.remove("hide")
  document.getElementById("labelTermino").classList.remove("hide")


  document.getElementById("atual").checked = false;
  document.getElementById("comentario").value = "";

}

const buttonCancelar = document.getElementById("btn-cancelar")
buttonCancelar.onclick = cancelarOperacao

const experienciaAtual = function (event) {
  const buttonAtual = event.target
  if (buttonAtual.checked) {
    document.getElementById("termino").classList.add("hide")
    document.getElementById("labelTermino").classList.add("hide")
  } else {
    document.getElementById("termino").classList.remove("hide")
    document.getElementById("labelTermino").classList.remove("hide")
  }

}

const buttonAtual = document.getElementById("atual")
buttonAtual.onchange = experienciaAtual

const updateExperiencia = function (event) {
  const idExperiencia = event.target.getAttribute("data-idExperiencia")

  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const inicio = document.getElementById("inicio").value;

  const checked = document.getElementById("atual").checked
  const atual = checked ? 1 : 0;

  const divTermino = document.getElementById("termino")
  const termino = checked ? inicio : divTermino.value;  

  const comentario = document.getElementById("comentario").value;

  if (empresa != "" && cargo != "" && inicio != "" && termino != "" && comentario != "" && perfilMatricula != "") {
    const experiencia = {
      empresa: empresa,
      cargo: cargo,
      inicio: inicio,
      termino: termino,
      atual: atual,
      comentario: comentario,
      perfilMatricula: perfilMatricula
    };
    const url = `/experiencias/${idExperiencia}`;

    const response = fetch(url, {
      body: JSON.stringify(experiencia),
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      loadExperiencia()
      alert(data.result);
    }).catch((error) => console.log(error))
  } else {
    alert(`Dados em branco!`);
  }
}

const btnAtualizar = document.getElementById("btn-atualizar")
btnAtualizar.onclick = updateExperiencia