/* CRIAR DICIONARIO CADASTROS */
function dicionario_cadastros() {
  const cadastros = [
    { id: 1, usuario: "Clarice", senha: "1111" },
    { id: 2, usuario: "Daniel", senha: "2222" },
    { id: 3, usuario: "Guilherme", senha: "3333" },
    { id: 4, usuario: "Mateus", senha: "4444" },
  ];
  /* PASSAR PARA O FORMATO JSON */
  const meujson = JSON.stringify(cadastros);
  /* ARMAZENAR DADOS NO NAVEGADOR */
  localStorage.setItem("bancodados", meujson);
}

/* VERIFICAR CADASTROS E LOGAR */
function logar() {
  const login = document.querySelector("#login").value;
  const senha = document.querySelector("#senha").value;
  const dados = JSON.parse(localStorage.getItem("bancodados"));
  for (let i = 0; i < dados.length; i++) {
    if (login == dados[i].usuario && senha == dados[i].senha) {
      alert(`Bem vindo: ${dados[i].usuario}`);
      sessionStorage.setItem("usuarioLogado", dados[i].usuario);
      window.location.href = "index.html";
    }
  }
}

/* VERIFICA SE ESTÁ LOGADO E MUDA O NOME NO HEADER */
const linkLoginElement = document.getElementById("link_login");
const usuario = sessionStorage.getItem("usuarioLogado");
if (usuario) {
  linkLoginElement.textContent = "Deslogar";
  linkLoginElement.href = "#";
  linkLoginElement.onclick = () => {
    deslogar();
  };
}

/* FUNÇAO PARA DESLOGAR */
function deslogar() {
  sessionStorage.removeItem("usuarioLogado");
  alert("Você foi desconectado.");
  window.location.reload();
}

