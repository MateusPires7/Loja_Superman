/* CARREGAR DICIONARIO DE CADASTRO NO LOCAL STORAGE */
document.addEventListener("DOMContentLoaded", function () {
  dicionario_cadastros();
  dicionario_produtos();
});

/* CRIAR DICIONARIO CADASTROS */
function dicionario_cadastros() {
  if (!localStorage.getItem("bancodados_cadastrados")) {
    const cadastros = [
      { id: 1, usuario: "Clarice", login: "Cla", senha: "1111" },
      { id: 2, usuario: "Daniel", login: "Dan", senha: "2222" },
      { id: 3, usuario: "Guilherme", login: "Gui", senha: "3333" },
      { id: 4, usuario: "Mateus", login: "Mat", senha: "4444" },
    ];
    /* PASSAR PARA O FORMATO JSON */
    const meujson = JSON.stringify(cadastros);
    /* ARMAZENAR DADOS NO NAVEGADOR */
    localStorage.setItem("bancodados_cadastrados", meujson);
  }
}

/* CRIAR DICIONARIO PRODUTOS */
function dicionario_produtos() {
  if (!localStorage.getItem("bancodados_produtos")) {
    const produtos = [
      {
        id: "prod1",
        nome: "Camiseta 1",
        imagem: "assets/img/camiseta 1.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod2",
        nome: "Camiseta 2",
        imagem: "assets/img/camiseta 2.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod3",
        nome: "Camiseta 3",
        imagem: "assets/img/camiseta 3.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod4",
        nome: "Camiseta 4",
        imagem: "assets/img/camiseta 4.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod5",
        nome: "Camiseta 5",
        imagem: "assets/img/camiseta 5.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod6",
        nome: "Camiseta 6",
        imagem: "assets/img/camiseta 6.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod7",
        nome: "Camiseta 7",
        imagem: "assets/img/camiseta 7.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod8",
        nome: "Camiseta 8",
        imagem: "assets/img/camiseta 8.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
      {
        id: "prod9",
        nome: "Camiseta 9",
        imagem: "assets/img/camiseta 9.png",
        preco: 69.9,
        alt: "Modelo com camiseta tematica do Superman",
      },
    ];
    /* PASSAR PARA O FORMATO JSON */
    const produtosJSON = JSON.stringify(produtos);
    /* ARMAZENAR DADOS NO NAVEGADOR */
    localStorage.setItem("bancodados_produtos", produtosJSON);
  }
}

let usuarioEncontrado = false; // VARIAVEL VERIFICADORA DE LOGIN E SENHA ENCONTRADOS

/* VERIFICAR CADASTROS E LOGAR */
function logar() {
  const login = document.querySelector("#login").value;
  const senha = document.querySelector("#senha").value;
  /* PEGAR DADOS DO LOCAL STORAGE */
  const dados = JSON.parse(localStorage.getItem("bancodados_cadastrados"));
  /* VERIFICAR LOGIN E SENHA */
  for (let i = 0; i < dados.length; i++) {
    if (login == dados[i].login && senha == dados[i].senha) {
      alert(`Bem vindo: ${dados[i].usuario}`); // DAR BOAS VINDAS AO CLIENTE
      sessionStorage.setItem("usuario_logado", dados[i].usuario); // GUARDAR INFORMACAO DE LOGADO
      window.location.href = "index.html"; // DIRECIONAR PARA PAGINA INICIAL DEPOIS DE LOGADO
      usuarioEncontrado = true; // VERIFICADOR DE LOGIN E SENHA ENCONTRADOS
      break; // INTERROMPE O FOR
    }
  }
  /* MOSTRAR ALERTA DE ERRO APENAS SE NENHUM USUÁRIO FOI ENCONTRADO */
  if (!usuarioEncontrado) {
    alert("Login ou senha não encontrados!");
  }

  /* LIMPAR OS CAMPOS DE INPUT APÓS A TENTATIVA DE LOGIN */
  document.querySelector("#login").value = "";
  document.querySelector("#senha").value = "";
}

/* VERIFICAR SE LOGOU */
function verificar_se_logado() {
  if (sessionStorage.getItem("usuario_logado")) {
    return true;
  } else {
    return false;
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

/* ADICIONADO FUNÇÃO DE REDIRECIONAR NOS BOTÕES DOS PRODUTOS 
const carrinho_adicionar = document.querySelectorAll(".verificador");
carrinho_adicionar.forEach((carrinho) => {
  carrinho.addEventListener("click", verificar_login);
});

/* REDIRECIONAR PARA PAGINA DE LOGIN CASO NÃO ESTIVER LOGADO 
function verificar_login() {
  const usuario_logado = sessionStorage.getItem("usuario_logado");
  if (!usuario_logado) {
    alert("Você precisa estar logado para acessar essa função!");
    window.location.href = "login.html";
  } else {
    window.location.href = "cart.html";
  }
}

/* VERIFICAR CADASTROS E LOGAR 
function logar() {
  const login = document.querySelector("#login").value;
  const senha = document.querySelector("#senha").value;
  /* PEGAR DADOS DO LOCAL STORAGE 
  const dados = JSON.parse(localStorage.getItem("bancodados"));
  /* VERIFICAR LOGIN E SENHA 
  for (let i = 0; i < dados.length; i++) {
    if (login == dados[i].login && senha == dados[i].senha) {
      alert(`Bem vindo: ${dados[i].usuario}`); // DAR BOAS VINDAS AO CLIENTE
      sessionStorage.setItem("usuario_logado", dados[i].usuario); // GUARDAR INFORMACAO DE LOGADO
      window.location.href = "index.html"; // DIRECIONAR PARA PAGINA INICIAL DEPOIS DE LOGADO
    }
  }
}

/* REDIRECIONAR PARA PAGINA INICIAL CASO QUEIRA CONTINUAR COMPRANDO
const continuar = document.querySelector("#continuar_compras");
continuar.addEventListener("click", continuar_comprando);
/* FUNÇAO PARA DIRECIONAR PARA PAGINA INICIAL 
function continuar_comprando() {
  window.location.href = "index.html";
}

/* FUNÇAO PARA DESLOGAR 
function deslogar() {
  sessionStorage.removeItem("usuario_logado");
  alert("Você foi desconectado.");
  window.location.reload();
}
 */
