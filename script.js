const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
}

// Save tasks to local storage
function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector('.task-text').textContent,
    completed: task.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');

  // Task description
  const span = document.createElement('span');
  span.textContent = taskText;
  span.classList.add('task-text');
  if (completed) li.classList.add('completed');

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = completed ? 'Undo' : 'Complete';
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
    saveTasks();
  });

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText) {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Append elements to task
  li.append(span, completeBtn, editBtn, deleteBtn);
  taskList.appendChild(li);
}

// Add task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert('Task cannot be empty!');
    return;
  }
  createTaskElement(taskText);
  taskInput.value = '';
  saveTasks();
});

// Initial load
loadTasks();
