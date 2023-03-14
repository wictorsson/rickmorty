import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
// comment

const url = "https://rickandmortyapi.com/api/character/";

async function fetchCharacters() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  data.results.forEach((element) => {
    let src = element.image;
    let name = element.name;
    let status = element.status;
    let type = element.type;
    let occurrences = element.episode.length;

    console.log(element);
    const card = createCharacterCard(src, name, status, type, occurrences);

    cardContainer.append(card);
  });
}

fetchCharacters();
