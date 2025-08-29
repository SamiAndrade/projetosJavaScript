const API_KEY = '1043f260';
const URL_BASE = 'https://www.omdbapi.com/';

const form = document.getElementById('form-busca');
const input = document.getElementById('input-busca');
const divFilmes = document.getElementById('filmes');
const botaoContainer = document.getElementById('botao-carregar-container');

let currentPage = 1;
let currentQuery = '';
let btnCarregarMais = null;

form.addEventListener('submit', e => {
  e.preventDefault();

  const termo = input.value.trim();
  if (!termo) return;

  currentQuery = termo;
  currentPage = 1;
  divFilmes.innerHTML = '';
  removerBotaoCarregarMais();

  buscarFilmes(currentQuery, currentPage, true);
});

async function buscarFilmes(query, page = 1, limpar = false) {
  const url = `${URL_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      mostrarFilmes(data.Search, limpar);
      mostrarBotaoCarregarMais();
    } else {
      divFilmes.innerHTML = `<p>Nenhum filme encontrado.</p>`;
      removerBotaoCarregarMais();
    }
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
  }
}

function mostrarFilmes(filmes, limpar = false) {
  if (limpar) divFilmes.innerHTML = '';

  filmes.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'filme-card';

    card.innerHTML = `
      <img src="${filme.Poster !== "N/A" ? filme.Poster : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}" alt="${filme.Title}">
      <h3>${filme.Title}</h3>
      <p>Ano: ${filme.Year}</p>
    `;

    divFilmes.appendChild(card);
  });
}

function mostrarBotaoCarregarMais() {
  if (!btnCarregarMais) {
    btnCarregarMais = document.createElement('button');
    btnCarregarMais.textContent = 'Carregar mais';
    btnCarregarMais.className = 'addMore';

    btnCarregarMais.addEventListener('click', () => {
      currentPage++;
      buscarFilmes(currentQuery, currentPage);
    });

    botaoContainer.appendChild(btnCarregarMais);
  }
}

function removerBotaoCarregarMais() {
  if (btnCarregarMais) {
    btnCarregarMais.remove();
    btnCarregarMais = null;
  }
}
