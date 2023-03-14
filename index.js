import { createCharacterCard } from "./components/card/card.js";

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  const cardContainer = document.querySelector('[data-js="card-container"]');
  let url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery} `;
  const response = await fetch(url);
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = page + "/" + maxPage;
  cardContainer.innerHTML = "";
  data.results.forEach((element) => {
    let src = element.image;
    let name = element.name;
    let status = element.status;
    let type = element.type;
    let occurrences = element.episode.length;
    const card = createCharacterCard(src, name, status, type, occurrences);
    cardContainer.append(card);
  });
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    ++page;
  }
  fetchCharacters();
});

prevButton.addEventListener("click", () => {
  if (page != 1) {
    --page;
  }
  fetchCharacters();
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  fetchCharacters();
});

fetchCharacters();
