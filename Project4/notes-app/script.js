let addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
  addNewNote();
});

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

function addNewNote(text = "") {
  let note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
      <button class="edit">edit</button>
      <button class="delete">delete</button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="textarea ${text ? "hidden" : ""}"></textarea>
`;

  let editBtn = note.querySelector(".edit");
  let deleteBtn = note.querySelector(".delete");
  let main = note.querySelector(".main");
  let textarea = note.querySelector(".textarea");

  textarea.value = marked.parse(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  let textNotes = document.querySelectorAll("textarea");
  let notes = [];

  textNotes.forEach((textNote) => {
    notes.push(textNote.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
