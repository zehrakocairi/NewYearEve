//let cover = document.querySelector(".cover");
//let note = document.querySelector(".note");

function editNote(event) {
  let cover = event.target.parentNode.parentNode.querySelector(".cover");
  let note = event.target.parentNode.parentNode.querySelector(".note");
  cover.classList.toggle("hidden");
  note.classList.toggle("hidden");

  let isEditMode = cover.classList.contains("hidden");
  if (!isEditMode) {
    let val = note.value;
    let html = marked.parse(val);
    cover.innerHTML = html;
  }
}
function addNewNote() {
  let newNote = document.createElement("div");
  newNote.innerHTML = `
  <div class="notes">
    <div class="tools">
     <button onclick="editNote(event)" class="edit-button">edit</button>
     <button class="delete-button">delete</button>
    </div>
    <div class="cover hidden"></div>
    <textarea class="note"></textarea>
  </div>`;
  document.body.appendChild(newNote);
}
