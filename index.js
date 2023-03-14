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
const searchQuery = "";
// comment
let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
async function fetchCharacters(pageParameter) {
  const cardContainer = document.querySelector('[data-js="card-container"]');
  url = `https://rickandmortyapi.com/api/character/?page=${pageParameter}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  maxPage = data.info.pages;
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
  fetchCharacters(page);
  pagination.textContent = page + "/" + maxPage;
});

prevButton.addEventListener("click", () => {
  if (page != 1) {
    --page;
  }
  fetchCharacters(page);
  pagination.textContent = page + "/" + maxPage;
});

fetchCharacters(page);
