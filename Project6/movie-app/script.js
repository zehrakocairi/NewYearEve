const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let mainDiv = document.getElementById("main");
let form = document.getElementById("form");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies) {
  mainDiv.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movies");
    movieDiv.innerHTML = `
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
    mainDiv.appendChild(movieDiv);
  });
}

let colorImdb = (value) => value >= 8 ? "green" : value >= 5 ? "orange" : "red";

form.addEventListener("submit", (e) => {
let searchInput = document.getElementById("search");
  e.preventDefault();
  let searchValue = searchInput.value;
  if (searchValue) {
    getMovies(SEARCHAPI + searchValue);
    searchInput.value = "";
  }
});
