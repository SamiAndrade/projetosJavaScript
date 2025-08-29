const API_KEY = '1043f260';
const URL_BASE = 'https://www.omdbapi.com/';

const form = document.getElementById('form-busca');
const input = document.getElementById('input-busca');
const divFilmes = document.getElementById('filmes');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const termo = input.value.trim();
  if (!termo) return;

  const url = `${URL_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(termo)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      mostrarFilmes(data.Search);
    } else {
      divFilmes.innerHTML = `<p>Nenhum filme encontrado com esse nome.</p>`;
    }
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
  }
});

function mostrarFilmes(filmes) {
  divFilmes.innerHTML = '';

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

function teclaEnter() {
   this.display.addEventListener('keyup', e => {
                if(e.keyCode === 13) {
                    this.mostrarFilmes(data.Search);
                }
              })

}
