const saveExperiencia = function () {

  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const inicio = document.getElementById("inicio").value;
  const termino = document.getElementById("termino").value;
  const atual = document.getElementById("atual").checked ? 1 : 0;
  const comentario = document.getElementById("comentario").value;
  const perfilMatricula = 1738382;


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
      alert(data.result);
      //loadUsersFromDatabase()
    }).catch((error) => console.log(error))
  } else {
    alert(`Dados em branco!`);
  }

}

const buttonSalvar = document.getElementById("btn-salvar");
buttonSalvar.onclick = saveExperiencia;

const enableUpdateExperiencia = function (event) {
  console.log(event.target.getAttribute("data-idExperiencia"));
  console.log(event.target.getAttribute("data-Perfil_matricula"));
  document.getElementById("btn-atualizar").classList.remove("hide")
  document.getElementById("container-cadastro").classList.remove("hide")
}

const deleteExperiencia = function (event) {
  console.log(event.target.getAttribute("data-idExperiencia"));
  console.log(event.target.getAttribute("data-Perfil_matricula"));
}

const loadExperiencia = function (event) {
  //data-idExperiencia
  const matricula = 1738382;

  const url = `/perfil/${matricula}/experiencias`
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
      divInicio.innerHTML = experiencia.inicio; 
      divInicio.innerHTML = new Date(divInicio.innerHTML).toLocaleDateString('pt-BR');
            
      const divTermino = document.createElement("div");
      divTermino.innerHTML = experiencia.termino
      divTermino.innerHTML  = new Date(divTermino.innerHTML).toLocaleDateString('pt-BR');      
      divTermino.innerHTML = experiencia.atual == 1? "Atual" : divTermino.innerHTML;

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
      buttonEnableUpdate.setAttribute("data-Perfil_matricula", experiencia.Perfil_matricula);
      buttonEnableUpdate.addEventListener("click", enableUpdateExperiencia);

      const buttonDelete = document.createElement("button");
      buttonDelete.innerHTML = "Deletar";
      buttonDelete.className = "button-delete";
      buttonDelete.setAttribute("data-idExperiencia", experiencia.idExperiencia);
      buttonDelete.setAttribute("data-Perfil_matricula", experiencia.Perfil_matricula);
      buttonDelete.addEventListener("click", deleteExperiencia);

      divExperienciaButtons.append(buttonEnableUpdate)
      divExperienciaButtons.append(buttonDelete)

      divExperiencia.append(divExperienciaTexts)
      divExperiencia.append(divExperienciaButtons)

      divExperiencias.append(divExperiencia)


    }
  }).catch((error) => console.log(error));

}

const inicio = function(){
  loadExperiencia()
}

window.onload = inicio

const showCadastro = function(){
  document.getElementById("container-cadastro").classList.remove("hide")
  document.getElementById("btn-salvar").classList.remove("hide")
}

const buttonNova = document.getElementById("button-nova")
buttonNova.onclick = showCadastro

const cancelarOperacao = function(){
  document.getElementById("container-cadastro").classList.add("hide")
  document.getElementById("btn-salvar").classList.add("hide")
  document.getElementById("btn-atualizar").classList.add("hide")
}

const buttonCancelar = document.getElementById("btn-cancelar")
buttonCancelar.onclick = cancelarOperacao