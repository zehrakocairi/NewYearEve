
function toggleEdit() {
    var textarea = document.querySelector(".text-container textarea");
    var cover = document.querySelector(".text-container .cover");
    textarea.classList.toggle("hidden");
    cover.classList.toggle("hidden");

    let isEditMode = textarea.classList.contains("hidden");
    if (isEditMode) {
        let val = textarea.value ?? "";
        let html = marked.parse(val);
        cover.innerHTML = html;
    }
}

function addNewNote(){
    // var cloneNote = document.querySelector(".notes .note").cloneNode(true);
    // var notesElement = document.querySelector(".notes");

    // notesElement.appendChild(cloneNote);
     
}