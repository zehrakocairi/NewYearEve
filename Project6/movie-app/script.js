const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let main = document.getElementById("main");
let imdb = document.getElementsByClassName("imdb");
let form = document.getElementById("form");
let search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    let newDiv = document.createElement("div");
    newDiv.classList.add("movies");
    newDiv.innerHTML = `
    <div  class="movie">
        <img
        src="${IMGPATH + poster_path}"
        alt=""
    />
        <div class="description">
        <p>${title}</p>
        <p class="imdb ${colorImdb(vote_average)}">${vote_average}</p>
        </div>
        <div class="overview">
        <h4>Overview</h4>
        <p>${overview}</p>
        </div>
    </div>
    
   `;
    main.appendChild(newDiv);
  });
}

function colorImdb(value) {
  return value >= 8 ? "green" : value >= 5 ? "orange" : "red";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value;
  if (searchValue) {
    getMovies(SEARCHAPI + searchValue);
    search.value = "";
  }
});
