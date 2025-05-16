/* CARREGAR DICIONARIO DE CADASTRO NO LOCAL STORAGE */
document.addEventListener("DOMContentLoaded", function () {
  dicionario_cadastros();
});

/* CRIAR DICIONARIO CADASTROS */
function dicionario_cadastros() {
  const cadastros = [
    { id: 1, usuario: "Clarice", login: "Cla", senha: "1111" },
    { id: 2, usuario: "Daniel", login: "Dan", senha: "2222" },
    { id: 3, usuario: "Guilherme", login: "Gui", senha: "3333" },
    { id: 4, usuario: "Mateus", login: "Mat", senha: "4444" },
  ];
  /* PASSAR PARA O FORMATO JSON */
  const meujson = JSON.stringify(cadastros);
  /* ARMAZENAR DADOS NO NAVEGADOR */
  localStorage.setItem("bancodados", meujson);
}

/* ADICIONADO FUNÇÃO DE REDIRECIONAR NOS BOTÕES DOS PRODUTOS */
const carrinho_adicionar = document.querySelectorAll(".verificador");
carrinho_adicionar.forEach((carrinho) => {
  carrinho.addEventListener("click", verificar_login);
});

/* REDIRECIONAR PARA PAGINA DE LOGIN CASO NÃO ESTIVER LOGADO */
function verificar_login() {
  const usuario_logado = sessionStorage.getItem("usuario_logado");
  if (!usuario_logado) {
    alert("Você precisa estar logado para acessar essa função!");
    window.location.href = "login.html";
  }
}

/* VERIFICAR CADASTROS E LOGAR */
function logar() {
  const login = document.querySelector("#login").value;
  const senha = document.querySelector("#senha").value;
  /* PEGAR DADOS DO LOCAL STORAGE */
  const dados = JSON.parse(localStorage.getItem("bancodados"));
  /* VERIFICAR LOGIN E SENHA */
  for (let i = 0; i < dados.length; i++) {
    if (login == dados[i].login && senha == dados[i].senha) {
      alert(`Bem vindo: ${dados[i].usuario}`); // DAR BOAS VINDAS AO CLIENTE
      sessionStorage.setItem("usuario_logado", dados[i].usuario); // GUARDAR INFORMACAO DE LOGADO
      window.location.href = "index.html"; // DIRECIONAR PARA PAGINA INICIAL DEPOIS DE LOGADO
    }
  }
}

/* VERIFICA SE ESTÁ LOGADO E MUDA O NOME NO HEADER */
const link_login = document.getElementById("link_login");
const usuario = sessionStorage.getItem("usuario_logado");
if (usuario) {
  link_login.textContent = usuario;
  link_login.href = "#";
  link_login.onclick = () => {
    if (confirm(usuario + " Você está logado, deseja sair?")) {
      deslogar();
    }
  };
}

/* FUNÇAO PARA DESLOGAR */
function deslogar() {
  sessionStorage.removeItem("usuario_logado");
  alert("Você foi desconectado.");
  window.location.reload();
}
