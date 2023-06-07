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
    const url = "/experiencias"

    const response = fetch(url, {
      body: JSON.stringify(experiencia),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      alert(data.result)
      //loadUsersFromDatabase()
    }).catch((error) => console.log(error))
  } else {
    alert(`Dados em branco!`)
  }

}

const buttonSalvar = document.getElementById("btn-salvar");
buttonSalvar.onclick = saveExperiencia

const loadExperiencia = function (event) {
  //data-idExperiencia
  const matricula = 1738382;

  const url = `/perfil/${matricula}/experiencias`
  const response = fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
  }).then((response) => {
      return response.json()
  }).then((dados) => {
      const tabela = document.getElementById("tabela")
      tabela.innerHTML = ""

      for (let dado of dados) {
          const buttonUpdate = document.createElement("button")
          buttonUpdate.innerHTML = "Atualizar"
          buttonUpdate.className = "button-update"
          buttonUpdate.idUsuario = dado.idUsuario
          buttonUpdate.email = dado.email
          buttonUpdate.senha = dado.senha
          buttonUpdate.nome = dado.nome
          buttonUpdate.addEventListener("click", enableUpdateUser)

          const buttonDelete = document.createElement("button")
          buttonDelete.innerHTML = "Deletar"
          buttonDelete.className = "button-delete"
          buttonDelete.idUsuario = dado.idUsuario
          buttonDelete.addEventListener("click", deleteUser)

          const newRow = tabela.insertRow()
          const cell1 = newRow.insertCell()
          const cell2 = newRow.insertCell()
          const cell3 = newRow.insertCell()
          const cell4 = newRow.insertCell()
          const cell5 = newRow.insertCell()
          cell1.innerHTML = dado.idUsuario
          cell2.innerHTML = dado.email
          cell3.innerHTML = dado.senha
          cell4.innerHTML = dado.nome
          cell5.append(buttonUpdate)
          cell5.append(buttonDelete)
      }
  }).catch((error) => console.log(error))

}