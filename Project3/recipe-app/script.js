let getCategories = async function () {
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    var categories = await response.json();

    return categories;
}

// async function test(){

//     await getCategories();
// }
var categories;
getCategories().then((data) => {
    categories = data;
    localStorage.setItem("car", "araba");
    localStorage.setItem("categories", JSON.stringify(categories) );
});

let getRandom = async function () {
    var meaning = localStorage.getItem("car");
    var categoriler = JSON.parse(localStorage.getItem("categories"));
    debugger;
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    return await response.json();
}
// getRandom().then(({meals})=>{
//     debugger;
// });
function fetchRandomReceipt() {
    getRandom().then((data) => {
        let { strMealThumb, strMeal } = data.meals[0];
        let reciptDom = document.getElementById("rondom-recipe");
        let zehralll = `<p id="up-text">Recipe of the day</p>
                        <img
                        src="${strMealThumb}"
                        alt="${strMeal}"
                        />
                        <div id="meal-desc">
                        <h5>${strMeal}</h5>
                        </div>`
            ;
        reciptDom.innerHTML = zehralll;
    });
}

