const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let toDos = [];
const message = ["Good Job!", "Very Nice!", "Keep Going!", "Take A Little Break."];

const TODOS_KEY = "todos";

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const liToDelete = event.target.parentElement;
    const deleterMessage = document.createElement("span");
    deleterMessage.innerText = message[Math.floor(Math.random() * message.length)];
    deleterMessage.className = "main-page__message";

    liToDelete.remove();
    toDoList.appendChild(deleterMessage);
    toDos = toDos.filter((objToDelete) => objToDelete.id !== parseInt(liToDelete.id));
    saveToDos();
}

function paintToDo(newToDo) {
    const newToDoLi = document.createElement("li");
    const newToDoSpan = document.createElement("span");
    newToDoSpan.innerText = newToDo.text;
    newToDoLi.id = newToDo.id;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", deleteToDo);
    newToDoLi.appendChild(deleteButton);
    newToDoLi.appendChild(newToDoSpan);
    toDoList.appendChild(newToDoLi);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newToDoObj = {
        id:Date.now(),
        text:newToDo
    };
    toDoInput.value = "";
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}