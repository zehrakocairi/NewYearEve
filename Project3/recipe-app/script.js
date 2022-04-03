let favMealList = document.getElementById("fav-meal-list");
let recipes = document.getElementById("recipes");
let searchTerm = document.getElementById("search-term");
let searchBtn = document.getElementById("search");
let mealPopup = document.getElementById("meal-popup");
let popupCloseBtn = document.getElementById("close-popup");
let mealInfoEl = document.getElementById("meal-info");

getMeals();
fetchFavMeals();

async function getMeals() {
  let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  let respData = await resp.json();
  let meals = respData.meals;
  let meal = meals[0];
  addMeals(meal);
}

async function getMealById(id) {
  let resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  let respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealBySearch(name) {
  let resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name
  );
  let respData = await resp.json();
  let meal = respData.meals;
  return meal;
}

async function addMeals(mealData) {
  let meal = document.createElement("div");
  meal.innerHTML = `<p id="up-text">Recipe of the day</p>
      <img
        src="${mealData.strMealThumb}"
        alt=""
      />
      <div id="meal-desc">
        <h5>${mealData.strMeal}</h5>
        <i id="heart-button" class="fa fa-heart"></i>
      </div>
      `;

  recipes.appendChild(meal);

  let heartButton = document.getElementById("heart-button");

  heartButton.addEventListener("click", () => {
    if (heartButton.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      heartButton.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      heartButton.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

let addMealLS = (mealId) => {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

let removeMealLS = (mealId) => {
  const mealIds = getMealLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(
      mealIds.filter((id) => {
        id !== mealId;
      })
    )
  );
  fetchFavMeals();
};

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favMealList.innerHTML = "";
  const mealIds = getMealLS();

  for (let i = 0; i < mealIds.length; i++) {
    let meal = await getMealById(mealIds[i]);
    addMealFavorite(meal);
  }
}

function addMealFavorite(mealData) {
  let favMeal = document.createElement("li");
  favMeal.innerHTML = `
      <img
        src="${mealData.strMealThumb}"
        
        alt="${mealData.strMeal}"
      />
      <p>${mealData.strMeal}</p>
      <button class="clear"><i  class="fa fa-times"></i></button>
       `;
  favMealList.appendChild(favMeal);

  let clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(`
      ${mealData["strIngredient" + i]} / ${mealData["strMeasure" + i]}`);
    } else break;
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
      src=${mealData.strMealThumb}
      alt=""
    />
    <p>
    ${mealData.strInstructions}
    </p>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>`;

  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");

  popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
  });
}

searchBtn.addEventListener("click", async () => {
  recipes.innerHTML = "";
  const searchValue = searchTerm.value;
  const meals = await getMealBySearch(searchValue);
  meals.forEach((meal) => {
    addMeals(meal);
  });
});
