let getMealData = async function () {
  let resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let meals = await resp.json();

  return meals;
};
let meals;
getMealData().then((data) => {
  meals = data;
  localStorage.setItem("meals", JSON.stringify(meals));
});

let getRandomMeal = async function () {
  let resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  return await resp.json();
};

let randomMeal;
let addRandomMeals = function () {
  getRandomMeal().then((data) => {
    randomMeal = data.meals[0];
  });
  let randomRecipes = document.getElementById("random-recipe");
  randomRecipes.innerHTML = `<div id="random-recipe">
        <p id="up-text">Recipe of the day</p>
        <img src="${randomMeal.strMealThumb}" alt="" />
        <div id="meal-desc">
          <h5>${randomMeal.strMeal}</h5>
        </div>
      </div>`;
};
