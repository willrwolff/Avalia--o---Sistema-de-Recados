let botaoSalvar = document.querySelector("#btn-salvar");
let inputRegistro = document.querySelector("#input-registro");
let inputTitulo = document.querySelector("#input-titulo");
let inputDescricao = document.querySelector("#input-descricao");

let tabelaRecados = document.querySelector("#tabela-registros");

botaoSalvar.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(objetoRecado(inputTitulo.value, inputDescricao.value));

  salvarNoLocalStorage(objetoRecado(inputTitulo.value, inputDescricao.value)); 
});

function capturaRecados() {
  return JSON.parse(localStorage.getItem("meus_recados")) || [];
}

function objetoRecado(titulo, descricao) {
  let db = capturaRecados()
  return {
    id: db.length + 1,
    tituloRecado: titulo,
    descricaoRecado: descricao, 
  };
}

function salvarNoLocalStorage(listaRecados) {
  const recados = capturaRecados();
  recados.push(listaRecados);
  localStorage.setItem("meus_recados", JSON.stringify(recados));
  reLoad();
}

function salvarNaTabela(recado, indice) {
  const novoRecado = document.createElement("tr");
  novoRecado.setAttribute("class", "registros")
  novoRecado.innerHTML = `
    <td>${recado.id}</td> 
    <td>${recado.tituloRecado}</td>
    <td>${recado.descricaoRecado}</td>
    <td>
        <button class="btn-editar" id= ${indice} name = "editar">Editar</button>
        <button class="btn-apagar" id=${indice} name = "apagar">Apagar</button>
    </td>`;
  document.querySelector("#tbody").appendChild(novoRecado);
}

function limparCampos() {
  inputTitulo.value = "";
  inputDescricao.value = "";
}

let sessao = sessionStorage.getItem("logado");

document.querySelector("#botao-sair-recados").addEventListener("click", () => {
  sair();
});

function sair() {
  sessionStorage.removeItem("logado");
  window.location.href = "index.html";
}

logadoNaHome();

function logadoNaHome() {
  if (sessao) {
    sessionStorage.setItem("logado", sessao);
  }
  if (!sessao) {
    window.location.href = "index.html";
  }
}

function deletarRecado(index) {
  const recados = capturaRecados();
  recados.splice(index, 1);
  localStorage.setItem("meus_recados", JSON.stringify(recados));
}

function novaNota(index) {
  const recados = capturaRecados()[index];
  const novoArray = [];
  novoArray.push(recados);
  novoArray.forEach((elemento) => {
    const titulo = elemento.tituloRecado;
    const descricao = elemento.descricaoRecado;

    document.querySelector("#input-titulo").value = titulo;
    document.querySelector("#input-descricao").value = descricao;
  });

  deletarRecado(index);
}

function reLoad() {
  window.location.reload();
}

manterDOM();

function manterDOM() {
  const recados = capturaRecados();
  recados.forEach(salvarNaTabela);
}

const botoesAcoes = document.querySelector("#tbody");
botoesAcoes.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.type === "submit") {
    if (event.target.name === "editar") {
      console.log(event.target.name);
      const index = event.target.id;
      novaNota(index);
    }
    if (event.target.name === "apagar") {
      console.log(event.target.name);
      const index = event.target.id;
      let confirmarApagar = confirm("Deseja apagar este recado?")
      if (confirmarApagar === true) {
        deletarRecado(index);
        reLoad();
      } else {
        window.location.href = "recados.html"
      }
    }
  }
});