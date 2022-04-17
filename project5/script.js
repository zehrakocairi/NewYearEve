const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addList();
});

const toDos = JSON.parse(localStorage.getItem("allToDos"));

if (toDos) {
  toDos.forEach((toDo) => {
    addList(toDo);
  });
}

function lineThrough(e) {
  const li = e.target.parentNode.parentNode.querySelector(".toDos .toDo");
  li.classList.toggle("completed");

  updateLS();
}

function remove(e) {
  e.target.parentNode.parentNode.remove();

  updateLS();
}

function addList(toDo) {
  let toDoText = input.value;

  if (toDo) {
    toDoText = toDo.text;
  }

  if (toDoText) {
    let lists = document.createElement("div");

    lists.classList.add("list");
    lists.innerHTML = `
    <ul class="toDos">
     <li class="toDo">${toDoText}</li>
    </ul>
    <div class="buttonEls">
     <button class="done" onclick="lineThrough(event)">✔</button>
     <button class="remove" onclick="remove(event)">✖</button>
    </div>
   `;

    form.appendChild(lists);
  }

  input.value = "";
  updateLS();
}

function updateLS() {
  const toDosEl = document.querySelectorAll("li");

  const allToDos = [];

  toDosEl.forEach((toDo) => {
    allToDos.push({
      text: toDo.innerText,
      completed: toDo.classList.contains("completed"),
    });
  });

  localStorage.setItem("allToDos", JSON.stringify(allToDos));
}
