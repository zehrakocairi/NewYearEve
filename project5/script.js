let form = document.querySelector("form");
let input = document.querySelector("input");
let todos = document.querySelector(".todos");

function lineThrough(e) {
  const li = e.target.parentNode.parentNode.querySelector("ul li");
  li.classList.toggle("done");
}

function remove(e) {
  e.target.parentNode.parentNode.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = input.value;
  if (todoText) {
    let cover = document.createElement("div");
    cover.classList.add("cover");
    cover.innerHTML = `
    <ul class="todos">
      <li>${todoText}</li>
    </ul>
    <div class="buttonEls">
      <button id="done" class="" onclick="lineThrough(event)">✔</button>
      <button id="remove" class="" onclick="remove(event)">✖</button>
    </div>`;
    form.appendChild(cover);
  }
  input.value = "";
});
