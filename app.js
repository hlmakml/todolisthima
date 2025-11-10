let tasks = [];

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    renderTasks();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const date = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    tasks.push(`${task}|${time} - ${date}`);
    saveTasks();
    renderTasks();
    input.value = "";
  }
});

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((tugas, index) => {
    const [taskText, dateText = ""] = tugas.split("|");

    const li = document.createElement("li");
    li.className = "task";

    const span = document.createElement("span");
    span.className = "task-title";
    span.textContent = taskText.trim();

    const small = document.createElement("small");
    small.className = "task-date";
    small.textContent = dateText.trim();

    const divBtn = document.createElement("div");

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.className = "btn edit-btn";
    btnEdit.onclick = () => editTask(index);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Hapus";
    btnDelete.className = "btn delete-btn";
    btnDelete.onclick = () => deleteTask(index);

    divBtn.appendChild(btnEdit);
    divBtn.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(small);
    li.appendChild(divBtn);
    list.appendChild(li);
  });
}

function editTask(index) {
  const oldData = tasks[index].split("|")[0];
  const newTask = prompt("Ubah tugas:", oldData);

  if (newTask && newTask.trim() !== "") {
    const oldDate = tasks[index].split("|")[1];
    tasks[index] = `${newTask.trim()}|${oldDate}`;
    saveTasks();
    renderTasks();
  } else {
    alert("Tugas tidak boleh kosong!");
  }
}

function deleteTask(index) {
  const confirmation = confirm("Yakin ingin menghapus tugas ini?");
  if (confirmation) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

loadTasks();
