// C R U D
// Create Read Update Delete Search

let addNoteContainer = document.getElementById("addNoteContainer");

let i = 0;

function color() {
  let randomColors = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];
  if (i > randomColors.length - 1) {
    i = 0;
  }
  return randomColors[i++];
}

function showAllNotes() {
  addNoteContainer.style.display = "none";
  let allNotes;
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    allNotes = [];
  } else {
    allNotes = JSON.parse(notes);
  }

  let notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = "";
  allNotes.forEach((note, index) => {
    // Generar un número aleatorio para seleccionar un color
    const randomColor = color();

    // Crear la tarjeta de nota con el color de fondo aleatorio
    const notesToBeShown = `
      <div class="card" style="width: 18rem; background-color: ${randomColor};">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.descp}</p>
          <div class="button-container">
          <button class="btn card_btns" onclick="deleteNote(${index})" style="background-color: #ff1212;"><img src="./delete.svg" alt="" class="delete_btn"></button>
          <button class="btn btn-light card_btns" onclick="editNote(${index})" ><img src="./edit.svg" alt="" class="edit_btn"></button>
          </div>
        </div>
      </div>`;

    notesContainer.innerHTML += notesToBeShown;
  });
}

showAllNotes();

let addNoteBtn = document.getElementById("addNote");
let cancelNoteBtn = document.getElementById("cancelNote");
addNoteBtn.addEventListener("click", () => {
  let allNotes;
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    allNotes = [];
  } else {
    allNotes = JSON.parse(notes);
  }
  let title = document.getElementById("title");
  let descp = document.getElementById("descp");
  let newNoteObj = {
    title: title.value,
    descp: descp.value,
  };

  if (addNoteBtn.innerText === "Update Note") {
    let editCard = document.querySelector(".card");
    let editIndex = editCard.getAttribute("editIndex");
    allNotes[editIndex] = newNoteObj;
  } else {
    allNotes.push(newNoteObj);
  }
  localStorage.setItem("notes", JSON.stringify(allNotes));
  title.value = "";
  descp.value = "";
  showAllNotes();
});

let navAddNoteBtn = document.getElementById("navAddNote");
navAddNoteBtn.addEventListener("click", function () {
  addNoteContainer.style.display = "block";
  addNoteBtn.innerText = "Guardar";
});

function deleteNote(noteIndex) {
  let allNotes = JSON.parse(localStorage.getItem("notes"));
  allNotes.splice(noteIndex, 1);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  showAllNotes();
}

function editNote(noteIndex) {
  let allNotes = JSON.parse(localStorage.getItem("notes"));
  addNoteContainer.style.display = "block";
  addNoteBtn.innerText = "Actualizar Nota";

  let title = document.getElementById("title");
  let descp = document.getElementById("descp");

  title.value = allNotes[noteIndex].title;
  descp.value = allNotes[noteIndex].descp;

  let editCard = document.querySelector(".card");
  editCard.setAttribute("editIndex", `${noteIndex}`);
  console.log(editCard);
}

let search = document.getElementById("search");
search.addEventListener("input", () => {
  let inputValue = search.value.toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios en blanco

  let allCards = document.getElementsByClassName("card");

  Array.from(allCards).forEach((ele) => {
    let cardTitle = ele.querySelector(".card-title").innerText.toLowerCase(); // Obtener el título y convertir a minúsculas
    let cardText = ele.querySelector(".card-text").innerText.toLowerCase(); // Obtener el texto y convertir a minúsculas

    // Dividir el texto y el título en palabras
    let titleWords = cardTitle.split(' ');
    let textWords = cardText.split(' ');

    // Concatenar las palabras del título y el texto
    let allWords = titleWords.concat(textWords);

    // Verificar si alguna de las palabras coincide con la búsqueda
    let match = allWords.some(word => word.includes(inputValue));

    if (match) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
});


cancelNoteBtn.addEventListener("click", function () {
  let title = document.getElementById("title");
  let descp = document.getElementById("descp");
  title.value = "";
  descp.value = "";
  addNoteContainer.style.display = "none";
  addNoteBtn.innerText = "Guardar";
});
