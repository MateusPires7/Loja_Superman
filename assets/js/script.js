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

/* VERIFICAR CADASTROS E LOGAR */
function logar() {
  let usuarioEncontrado = false; // VARIAVEL VERIFICADORA DE LOGIN E SENHA ENCONTRADOS
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
  localStorage.removeItem("carrinho_superman");
  sessionStorage.removeItem("usuario_logado");
  alert("Você foi desconectado.");
  window.location.reload();
}

/* ADICIONADO FUNÇÃO DE REDIRECIONAR NOS BOTÕES DOS PRODUTOS */
const carrinho_adicionar = document.querySelectorAll(".verificador");
carrinho_adicionar.forEach((botao) => {
  botao.addEventListener("click", function (event) {
    if (!verificar_se_logado()) {
      alert("Você precisa estar logado para acessar essa função!");
      window.location.href = "login.html";
    } else {
      alert("Produto foi adicionado ao carrinho!");
      adicionar_produto(event);
    }
  });
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
      adicionar_produto(event);
    }
  }
}

/* FUNÇAO PARA DIRECIONAR PARA PAGINA INICIAL */
function continuar_comprando() {
  window.location.href = "index.html";
}
/* ADICIONAR PRODUTO NO CARRINHO */
function adicionar_produto(event) {
  const produtos = JSON.parse(localStorage.getItem("bancodados_produtos")); // PEGAR PRODUTOS GUARDADOS NO LOCAL STORAGE
  const botao = event.currentTarget; // IDENTIFICAR O BOTÃO ADICIONAR QUE FOI APERTADO
  const card = botao.closest(".produtos__card"); // PEGAR O CARD PAI DO BOTÃO ADICIONAR
  const nomeProduto = card
    .querySelector(".produtos__card-titulo")
    .textContent.trim(); // PEGAR TITULO DO PRODUTO
  const produtoSelecionado = produtos.find((p) => p.nome === nomeProduto); // PROCURAR O PRODUTO NO LOCAL STORAGE PELO NOME
  let carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || []; // CRIAR CARRINHO OU PEGAR CARRINHO EXISTENTE

  /* VERIFICAR SE O PRODUTO JÁ ESTÁ NO CARRINHO */
  const produtoNoCarrinho = carrinho.find(
    (item) => item.id === produtoSelecionado.id
  );

  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade += 1;
  } else {
    carrinho.push({
      ...produtoSelecionado,
      quantidade: 1,
    });
  }

  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho)); // SALVAR CARRINHO NO LOCAL STORAGE
}

/* VERIFICAR SE ESTÁ NA PAGINA DO CARRINHO */
if (window.location.pathname.includes("cart.html")) {
  atualizar_carrinho();

  /* VERIFICAR SE BOTÕES DE AUMENTAR, DIMINUIR OU EXCLUIR PRODUTOS FOI APERTADO */
  document
    .querySelector(".carrinho__produtos")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-aumentar")) {
        mudar_quantidade(event.target.dataset.id, 1); // AUMENTA UM
      }
      if (event.target.classList.contains("btn-diminuir")) {
        mudar_quantidade(event.target.dataset.id, -1); // DIMINUI UM
      }
      if (event.target.closest(".btn-remover")) {
        const botaoRemover = event.target.closest(".btn-remover");
        tirar_produto(botaoRemover.dataset.id); // REMOVE PRODUTO
      }
    });
}

/* COLOCA HTML NA TELA DO CARRINHO E ATUALIZA O PREÇO */
function atualizar_carrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || [];
  const listaDeProdutos = document.querySelector(".carrinho__produtos");
  const valorTotalNaTela = document.querySelector(".carrinho__valor");
  const botaoFinalizarCompra = document.getElementById("finalizar_compra"); // PEGAR O BOTÃO FINALIZAR COMPRA

  /* MENSAGEM DE CARRINHO VAZIO */
  if (carrinho.length === 0) {
    listaDeProdutos.innerHTML =
      "<p class='carrinho__mensagem-vazio'>Ih, carrinho vazio! Bora comprar!</p>";
    valorTotalNaTela.textContent = "R$ 0,00";
    return;
  }

  botaoFinalizarCompra.disabled = false;

  let htmlDoCarrinho = "";
  let totalDaCompra = 0;

  carrinho.forEach((produto) => {
    const precoTotalProduto = produto.preco * produto.quantidade;
    totalDaCompra += precoTotalProduto;
    htmlDoCarrinho += `
      <div class="carrinho__produto-container">
        <div>
          <img src="${produto.imagem}" alt="${
      produto.alt
    }" class="carrinho__produto-imagem">
        </div>
        <div class="carrinho__produto-caixa">
          <div>
            <span class="carrinho__produto-nome";">${produto.nome}</span>
          </div>
          <div>
            <span class="carrinho__produto-preco">R$ ${produto.preco
              .toFixed(2)
              .replace(".", ",")}</span>
          </div>
          <div>
            <button class="carrinho__produto-diminuir btn-diminuir" data-id="${
              produto.id
            }">-</button>
            <span class="carrinho__produto-quantidade";">${
              produto.quantidade
            }</span>
            <button class="carrinho__produto-aumentar btn-aumentar" data-id="${
              produto.id
            }">+</button>
            <button class="carrinho__produto-remover btn-remover" data-id="${
              produto.id
            }"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    `;
  });

  /* ATUALIZA E COLOCA HTML NO CARRINHO */
  listaDeProdutos.innerHTML = htmlDoCarrinho;
  valorTotalNaTela.textContent =
    "R$ " + totalDaCompra.toFixed(2).replace(".", ",");
}

/* ALTERA A QUANTIDADE DE PRODUTOS NO CARRINHO */
function mudar_quantidade(idDoProduto, variacao) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || [];
  const produtoAchado = carrinho.find((p) => p.id === idDoProduto);

  if (!produtoAchado) return;

  produtoAchado.quantidade += variacao;

  /* ELIMINA PRODUTO DO CARRINHO SE QUANTIDADE FOR ZERO */
  if (produtoAchado.quantidade < 1) {
    carrinho = carrinho.filter((p) => p.id !== idDoProduto);
  }

  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho)); // SALVA CARRINHO NO LOCAL STORAGE

  atualizar_carrinho(); // ATUALIZA O CARRINHO
}

/* ELIMINA PRODUTO DO CARRINHO */
function tirar_produto(idDoProduto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho_superman")) || [];
  carrinho = carrinho.filter((produto) => produto.id !== idDoProduto);
  localStorage.setItem("carrinho_superman", JSON.stringify(carrinho));
  atualizar_carrinho();
}

/* VERIFICAÇÃO DE QUANDO FINALIZAR COMPRA DO CARRINHO FOR CLICADO */
document.addEventListener("DOMContentLoaded", function () {
  const botao = document.getElementById("finalizar_compra"); // PEGA O BOTÃO

  if (botao) {
    botao.addEventListener("click", function (event) {
      event.preventDefault();
      /* VERIFICA SE O CARRINHO ESTÁ VAZIO */
      let carrinho = localStorage.getItem("carrinho_superman");
      carrinho = carrinho ? JSON.parse(carrinho) : [];
      /* SE ESTIVER VAZIO REMOVE OS ATRIBUTOS QUE CHAMA O MODAL DE PAGAMENTO */
      if (carrinho.length === 0) {
        botao.removeAttribute("data-bs-toggle");
        botao.removeAttribute("data-bs-target");
        alert(
          "Seu carrinho está vazio. Adicione produtos antes de finalizar a compra."
        );
        return; // INTERROMPE O CODIGO
      }
      /* SE TIVER PRODUTO ADICIONA OS ATRIBUTOS QUE CHAMA O MODAL */
      botao.setAttribute("data-bs-toggle", "modal");
      botao.setAttribute("data-bs-target", "#exampleModal");

      let meuModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      meuModal.show();// MOSTRA O MODAL
    });
  }
});

/* FINALIZAR COMPRA */
function finalizar_compra() {
  /* PEGA INPUTS RADIOS PARA VERFICAR */
  const metodosPagamento = document.querySelectorAll(
    '#exampleModal input[name="pagamento"]'
  );
  let pagamentoSelecionado = false; // VARIAVEL PARA CONTROLAR SE METODO DE PAGAMENTO FOI ESCOLHIDO
  /* PASSA POR TODOS OS METODOS DE PAGAMENTO E VER SE ALGUM FOI ESCOLHIDO */
  for (const metodo of metodosPagamento) {
    if (metodo.checked) {
      pagamentoSelecionado = true;
      break;
    }
  }
  /* VERIFICA SE ESCOLHEU UM METODO DE PAGAMENTO */
  if (!pagamentoSelecionado) {
    alert(
      "Por favor, selecione um método de pagamento antes de finalizar a compra."
    );
    return; // FINALIZA A FUNÇÃO ATÉ SER ESCOLHIDO UM METODO DE PAGAMENTO
  }

  alert("Compra Finalizada!");
  localStorage.removeItem("carrinho_superman"); // APAGA CARRINHO DO LOCAL STORAGE
  bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide(); // FECHA O MODAL
  /* ATUALIZA PAGINA DO CARRINHO E RECARREGA A PAGINA */
  atualizar_carrinho();
  window.location.reload();
}
