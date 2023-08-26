const input = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const openUL = document.querySelector("#openSection-ul");
const progressUL = document.querySelector("#progressSection-ul");
const reviewUL = document.querySelector("#reviewSection-ul");
const doneUL = document.querySelector("#doneSection-ul");
const modalBox = document.querySelector("#modalBox");
const doneButton = document.querySelector(".done");
const heroProgressSection = document.querySelector(".progressSection");
const heroReviewSection = document.querySelector(".reviewSection");
const heroDoneSection = document.querySelector(".doneSection");

let openTasks = [];
let progressTasks = [];
let reviewTasks = [];
let doneTasks = [];
let draggedItemId = null;

doneButton.addEventListener("click", function () {
  doneButton.style.display = "none";
  addBtn.style.display = "none";
  input.style.display = "none";
  heroProgressSection.style.display = "block";
  heroDoneSection.style.display = "block";
  heroReviewSection.style.display = "block";
});

function drag(ev) {
  ev.stopPropagation();
  ev.dataTransfer.setData("text", ev.target.id);

  // console.log("drag start");
}

function allowDrop(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

function drop(ev) {
  ev.stopPropagation();
  ev.preventDefault();

  let data = ev.dataTransfer.getData("text");
  const droppedItem = document.getElementById(data);
  const droppedItemId = droppedItem.getAttribute("data-key");
  const sourceArray = getSourceArray(droppedItem);

  if (sourceArray === openTasks) {
    openUL.removeChild(droppedItem);
  } else if (sourceArray === progressTasks) {
    progressUL.removeChild(droppedItem);
  } else if (sourceArray === reviewTasks) {
    reviewUL.removeChild(droppedItem);
  } else if (sourceArray === doneTasks) {
    doneUL.removeChild(droppedItem);
  }

  ev.target.appendChild(droppedItem);

  const destinationArray = getDestinationArray(ev.target);
  const task = sourceArray.find((task) => task.key === parseInt(droppedItemId));

  if (destinationArray === openTasks) {
    openTasks.push(task);
  } else if (destinationArray === progressTasks) {
    progressTasks.push(task);
    console.log(task.key);
  } else if (destinationArray === reviewTasks) {
    reviewTasks.push(task);
  } else if (destinationArray === doneTasks) {
    doneTasks.push(task);
  }
}

function getSourceArray(item) {
  if (item.parentElement === openUL) {
    return openTasks;
  } else if (item.parentNode === progressUL) {
    return progressTasks;
  } else if (item.parentNode === reviewUL) {
    return reviewTasks;
  } else if (item.parentNode === doneUL) {
    return doneTasks;
  }
  // console.log(item);
}

function getDestinationArray(target) {
  if (target === openUL) {
    return openTasks;
  } else if (target === progressUL) {
    return progressTasks;
  } else if (target === reviewUL) {
    return reviewTasks;
  } else if (target === doneUL) {
    return doneTasks;
  }
  // console.log("getDestinationArray");
}

addBtn.addEventListener("click", function () {
  const inputVal = input.value;

  if (inputVal.trim() !== "") {
    let id = Math.floor(Math.random() * 100);
    const task = {
      key: id,
      task: inputVal,
      description: "",
    };
    openTasks.push(task);
    input.value = "";
    renderTasks();
  }
});

function renderTasks() {
  openUL.innerHTML = "";
  progressUL.innerHTML = "";
  reviewUL.innerHTML = "";
  doneUL.innerHTML = "";

  openTasks.forEach((task) => {
    const li = createTaskElement(task);
    openUL.appendChild(li);
  });

  progressTasks.forEach((task) => {
    const li = createTaskElement(task);
    progressUL.appendChild(li);
  });

  reviewTasks.forEach((task) => {
    const li = createTaskElement(task);
    reviewUL.appendChild(li);
  });

  doneTasks.forEach((task) => {
    const li = createTaskElement(task);
    doneUL.appendChild(li);
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  let id = "id" + Math.floor(Math.random() * 100);
  li.innerHTML = `
  <li data-key="${task.key}" id="${id}" draggable="true" class="textBox"
      onclick="openModal(${task.key})" ondragstart="drag(event)">
    ${task.task}
  </li>`;

  li.addEventListener("click", function () {
    openModal(task.key);
  });

  return li;
}

function openModal(key) {
  console.log(key, "openModal");
  const taskFound = findTaskByKey(key);
  console.log(taskFound);
  const descriptionInputValue = taskFound.description;
  modalBox.innerHTML = `
    <h2>Task Description</h2>
    <textarea class="inputBox" placeholder="Add Your Task Description">${descriptionInputValue}</textarea>
    <br/>
    <button id="save">Save</button>
    <button id="close">Close</button>
  `;

  const closeBtn = document.querySelector("#close");
  closeBtn.addEventListener("click", closeModal);

  const saveBtn = document.querySelector("#save");
  saveBtn.addEventListener("click", function () {
    saveDescription(key);
  });

  modalBox.style.display = "block";
}

function closeModal() {
  modalBox.style.display = "none";
}

function saveDescription(key) {
  const taskFound = findTaskByKey(key);
  const descriptionInput = document.querySelector(".inputBox");
  taskFound.description = descriptionInput.value;
  if (taskFound.description.trim() === "") {
    alert("Can't Save Empty Description");
    taskFound.description = "";
  }

  closeModal();
}

function findTaskByKey(key) {
  console.log(key, "findTaskByKey");
  let task = openTasks.find((e) => e.key === key);
  if (!task) {
    task = progressTasks.find((e) => e.key === key);
  }
  if (!task) {
    task = reviewTasks.find((e) => e.key === key);
  }
  if (!task) {
    task = doneTasks.find((e) => e.key === key);
  }
  return task;
}
const toggleHowButton = document.getElementById("toggleHowButton");
const howSection = document.querySelector(".how");

toggleHowButton.addEventListener("click", function () {
  howSection.classList.toggle("hidden");
});
doneButton.addEventListener("click", function () {});
