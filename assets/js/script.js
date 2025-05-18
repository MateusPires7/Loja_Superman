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

/* ADICIONADO FUNÇÃO DE REDIRECIONAR NOS BOTÕES DOS PRODUTOS */
const carrinho_adicionar = document.querySelectorAll(".verificador");
carrinho_adicionar.forEach((carrinho_adicionar) => {
  carrinho_adicionar.addEventListener("click", redirecionar);
});

/* ADICIONADO FUNÇÃO DE REDIRECIONAR NO ICONE DO CARRINHO */
const carrinho = document.querySelector("#item-menu-carrinho");
carrinho.addEventListener("click", redirecionar);

/* REDIRECIONAR PARA PAGINA DE LOGIN CASO NÃO ESTIVER LOGADO */
function redirecionar(event) {
  if (!verificar_se_logado()) {
    alert("Você precisa estar logado para acessar essa função!");
    window.location.href = "login.html";
  } else {
    if (event.currentTarget.closest("#item-menu-carrinho")) {
      event.preventDefault();
      window.location.href = "cart.html"; // REDIRECIONA PARA PAGINA DO CARRINHO
    } else if (event.currentTarget.classList.contains("verificador")) {
      alert("Produto foi adicionado ao carrinho!");
      adicionar_produto();
      window.location.href = "cart.html";
    }
  }
}

/* REDIRECIONAR PARA PAGINA INICIAL CASO QUEIRA CONTINUAR COMPRANDO */
const continuar = document.querySelector("#continuar_compras");
continuar.addEventListener("click", continuar_comprando);

/* FUNÇAO PARA DIRECIONAR PARA PAGINA INICIAL */
function continuar_comprando() {
  window.location.href = "index.html";
}

/* ADICIONAR OS PRODUTOS NO CARRINHO */
function adicionar_produto() {
  const produtos = JSON.parse(localStorage.getItem("bancodados_produtos")); // PEGAR PRODUTOS DO LOCAL STORAGE
  const botao = event.currentTarget; // IDENTIFICAR O BOTÃO ADICIONAR QUE FOI CLICADO
  const card = botao.closest(".produtos__card"); // IDENTIFICAR QUAL PRODUTO QUE FOI ADICIONADO
  const nomeProduto = card.querySelector(".produtos__card-titulo"); //IDENTIFICAR O NOME DO PRODUTO QUE FOI ADICIONADO

  /* PROCURAR OS PRODUTOS NO LOCAL STORAGE */
  let produtoSelecionado;
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].nome === nomeProduto) {
      produtoSelecionado = produtos[i];
      break;
    }
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || []; // VERIFICAR SE JÁ EXISTE UM CARRINHO SALVO, SE NÃO TIVER, CRIAR

  /* VERIFICA SE O PRODUTO JÁ ESTÁ NO CARRINHO */
  let produtoNoCarrinho;
  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === produtoSelecionado.id) {
      produtoNoCarrinho = carrinho[i];
      break;
    }
  }

  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade++;
  } else {
    const novoProduto = {
      id: produtoSelecionado.id,
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      quantidade: 1,
    };

    carrinho.push(novoProduto);
  }

  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho)); // SALVA O CARRINHO NO LOCAL STORAGE
}

if (window.location.pathname.includes("cart.html")) {
  // SE ESTIVER NA PAGINA DO CARRINHO, ATUALIZA O CARRINHO
  atualizar_carrinho();

  document
    .querySelector(".carrinho__produtos")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-aumentar")) {
        mudar_quantidade(event.target.dataset.id, 1); // AUMENTA UM
      }
      if (event.target.classList.contains("btn-diminuir")) {
        mudar_quantidade(event.target.dataset.id, -1); // DIMINUI UM
      }
      if (event.target.classList.contains("btn-remover")) {
        tirar_produto(event.target.dataset.id); // EXCLUI O PRODUTO
      }
    });
}

/* ESCREVE O CODIGO HTML PARA ADICIONAR O PRODUTO AO CARRINHO */
function atualizar_carrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || [];
  const listaDeProdutos = document.querySelector(".carrinho__produtos");
  const valorTotalNaTela = document.querySelector(".carrinho__valor");

  // SE NÃO TIVER ONDE MOSTRAR O PRODUTO, NÃO MOSTRAR
  if (!listaDeProdutos) {
    return;
  } else if (!valorTotalNaTela) {
    return;
  }

  /* MENSAGEM DE CARRINHO VAZIO */
  if (carrinho.length === 0) {
    listaDeProdutos.innerHTML = `<p class="carrinho__mensagem-vazio">Ih, carrinho vazio! Bora comprar!</p>`;
    valorTotalNaTela.textContent = "R$ 0,00";
    return;
  }

  let htmlDoCarrinho = "";
  let totalDaCompra = 0;

  carrinho.forEach((produto) => {
    const precoTotalProduto = produto.preco * produto.quantidade;
    totalDaCompra += precoTotalProduto;
    htmlDoCarrinho += `
      <div class="row align-items-center mb-4" style="border-bottom:1px solid #eee;padding-bottom:1rem;">
        <div class="col-3 col-md-2">
          <img src="${produto.imagem}" alt="${
      produto.alt
    }" style="width:100%;max-width:80px;">
        </div>
        <div class="col-5 col-md-4">
          <span style="font-size:2rem;">${produto.nome}</span>
        </div>
        <div class="col-4 col-md-2">
          <span style="font-size:1.8rem;">R$ ${produto.preco
            .toFixed(2)
            .replace(".", ",")}</span>
        </div>
        <div class="col-12 col-md-3 mt-2 mt-md-0 d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-secondary btn-diminuir" data-id="${
            produto.id
          }">-</button>
          <span style="font-size:1.6rem;">${produto.quantidade}</span>
          <button class="btn btn-sm btn-secondary btn-aumentar" data-id="${
            produto.id
          }">+</button>
          <button class="btn btn-sm btn-danger btn-remover ms-2" data-id="${
            produto.id
          }"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `;
  });

  /* ENVIA O HTML PARA O CARRINHO E ATUALIZA O VALOR TOTAL */
  listaDeProdutos.innerHTML = htmlDoCarrinho;
  valorTotalNaTela.textContent =
    "R$ " + totalDaCompra.toFixed(2).replace(".", ",");
}

/* MUDA A QUANTIDADE DE PRODUTOS NO CARRINHO */
function mudar_quantidade(idDoProduto, variacao) {
  let carrinhoTexto = localStorage.getItem("carrinho_superman");
  let carrinho;
  if (carrinhoTexto === null) {
    carrinho = [];
  } else {
    carrinho = JSON.parse(carrinhoTexto);
  }

  /* ENCONTRAR O PRODUTO NO CARRINHO */
  let produtoAchado;
  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === idDoProduto) {
      produtoAchado = carrinho[i];
      break;
    }
  }

  /* SE NÃO TIVER O PRODUTO, NÃO FAZ NADA */
  if (!produtoAchado) {
    return;
  }

  /* ALTERA A QUANTIDADE DE PRODUTO */
  produtoAchado.quantidade = produtoAchado.quantidade + variacao;

  /* SE A QUANTIDADE FOR ZERO, REMOVER O PRODUTO DO CARRINHO */
  if (produtoAchado.quantidade < 1) {
    let novoCarrinho = [];
    for (let i = 0; i < carrinho.length; i++) {
      if (carrinho[i].id !== idDoProduto) {
        novoCarrinho.push(carrinho[i]);
      }
    }
    carrinho = novoCarrinho;
  }

  /* ATUALIZA SALVAMENTO DO CARRINHO */
  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho));

  /* ATUALIZA A TELA DO CARRINHO */
  atualizar_carrinho();
}

/* REMOVE O PRODUTO DO CARRINHO */
function tirar_produto(idDoProduto) {
  let carrinhoTexto = localStorage.getItem("carrinho_superman");
  let carrinho;
  if (carrinhoTexto === null) {
    carrinho = [];
  } else {
    carrinho = JSON.parse(carrinhoTexto);
  }

  /* CRIA UM NOVO CARRINHO */
  let novoCarrinho = [];

  /* PASSA PELOS PRODUTOS DO CARRINHO ANTIGO */
  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id !== idDoProduto) {
      novoCarrinho.push(carrinho[i]);
    }
  }

  /* ATUALIZA O CARRINHO */
  carrinho = novoCarrinho;

  /* SALVA O NOVO CARRINHO */
  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho));

  /* ATUALIZA A TELA DO CARRINHO */
  atualizar_carrinho();
}
