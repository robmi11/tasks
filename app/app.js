const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filterInput = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const storage = "tasks";
let tasks = [];

// Load event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", handleFormSubmitk);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear all tasks event
  clearBtn.addEventListener("click", clearAllTasks);
}

// Handle form submit
function handleFormSubmitk(event) {
  // Check if task input is empty
  if (taskInput.value === "") {
    M.toast({
      html: "Brak opisu zadania.",
      displayLength: 2000,
      completeCallback: () => {
        taskInput.focus();
      },
    });
    return;
  }

  tasks.push(taskInput.value);
  localStorage.setItem(storage, JSON.stringify(tasks));
  render(tasks);
  event.preventDefault();
}

// Remove task
function removeTask(event) {
  let tmp =
    event.target.parentElement.parentElement.firstChild.textContent.trim();
  if (event.target.parentElement.classList.contains("delete-item")) {
    // Remove task from local storage
    tasks = tasks.filter((task) => task !== tmp);

    localStorage.setItem(storage, JSON.stringify(tasks));

    // Remove tasks
    render(tasks);
  }
}

// Clear all task
function clearAllTasks() {
  taskList.innerHTML = "";
  tasks = [];
  localStorage.setItem(storage, JSON.stringify(tasks));
  taskList.innerHTML = `<li class="collection-item">Brak danych</li>`;
}

function render(tasks) {
  taskList.innerHTML = "";
  if (tasks.length !== 0) {
    tasks.forEach((task) => {
      // Create list item
      const li = `
        <li class='collection-item'>${task}
          <a href="#" class="delete-item secondary-content">
            <i class="small material-icons">cancel</i>
          </a>
        </li>
      `;

      // Add list item to taskList
      taskList.innerHTML += li;

      // Clear task input
      taskInput.value = "";
    });
  } else {
    taskList.innerHTML = `<li class="collection-item">Brak danych</li>`;
  }
}

function appInit() {
  loadEventListeners();
  if (localStorage.getItem(storage)) {
    JSON.parse(localStorage.getItem(storage)).map((task) => tasks.push(task));
    render(tasks);
  } else {
    taskList.innerHTML = `<li class="collection-item">Brak danych</li>`;
  }
}

document.addEventListener("DOMContentLoaded", appInit);
