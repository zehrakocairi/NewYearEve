let favMealList = document.getElementById("fav-meal-list");
let recipes = document.getElementById("recipes");
let searchTerm = document.getElementById("search-term");
let searchBtn = document.getElementById("search");
let mealPopup = document.getElementById("meal-popup");
let popupCloseBtn = document.querySelector(".close-popup");
let mealInfoEl = document.getElementById("meal-info");

getMealsAsync();
fetchFavMealsAsync();

async function getMealsAsync() {
  let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  let respData = await resp.json();
  let meals = respData.meals;
  let meal = meals[0];
  addMeal(meal);
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
  let meals = respData.meals;
  return meals;
}

async function addMeal(mealData) {
  let meal = document.createElement("div");
  meal.innerHTML = `<p data-recipe-id="${mealData.idMeal}" class="up-text">Recipe of the day</p>
      <img
        src="${mealData.strMealThumb}"
        alt=""
      />
      <div class="meal-desc">
        <h5>${mealData.strMeal}</h5>
        <div class="wish-icon">
          <i class="fa fa-heart"></i>
        </div>
      </div>
      `;

  recipes.appendChild(meal);

  let heartButton = meal.getElementsByClassName("wish-icon")[0];
  heartButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (heartButton.classList.contains("active")) {
      await removeLocalMealAsync(mealData.idMeal);
      heartButton.classList.remove("active");
    } else {
      addMealToLocal(mealData.idMeal);
      heartButton.classList.add("active");
    }

    await fetchFavMealsAsync();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

let addMealToLocal = (mealId) => {
  const mealIds = getLocalMeals();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

let removeLocalMealAsync = async (mealId) => {
  const mealIds = getLocalMeals();

  let mealsToKeep = mealIds.filter((id) => {
    return id !== mealId;
  });

  localStorage.setItem("mealIds", JSON.stringify(mealsToKeep));

  await fetchFavMealsAsync();

  refreshFavIcons(mealId);
};

function refreshFavIcons(mealId) {
  let removedItem = document.querySelector(
    `.up-text[data-recipe-id='${mealId}']`
  );

  if (removedItem == null) {
    return;
  }

  removedItem.parentNode
    .querySelector(".wish-icon.active")
    .classList.remove("active");
}

function getLocalMeals() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMealsAsync() {
  favMealList.innerHTML = "";
  const mealIds = getLocalMeals();

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

  let clearButton = favMeal.querySelector(".clear");
  clearButton.addEventListener("click", async (e) => {
    e.stopPropagation();

    await removeLocalMealAsync(mealData.idMeal);

    await fetchFavMealsAsync();
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
    addMeal(meal);
  });
});
