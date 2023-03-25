const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const taskDueDate = document.getElementById('task-due-date');
const filterPriority = document.getElementById('filter-priority');
const taskList = document.getElementById('task-list');

function createTaskElement(text, priority, dueDate) {
  const newTask = document.createElement('li');
  newTask.classList.add(`priority-${priority}`);

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', () => {
    newTask.classList.toggle('completed');
  });

  const taskLabel = document.createElement('span');
  taskLabel.textContent = text;

  const taskEditInput = document.createElement('input');
  taskEditInput.type = 'text';
  taskEditInput.value = text;
  taskEditInput.classList.add('editing');
  taskEditInput.style.display = 'none';

  taskLabel.addEventListener('dblclick', () => {
    taskLabel.style.display = 'none';
    taskEditInput.style.display = 'inline-block';
    taskEditInput.focus();
  });

  taskEditInput.addEventListener('blur', () => {
    taskLabel.style.display = 'inline-block';
    taskEditInput.style.display = 'none';
    taskLabel.textContent = taskEditInput.value;
  });

  const taskPriorityLabel = document.createElement('span');
  taskPriorityLabel.textContent = `Priority: ${priority.toUpperCase()}`;

  const taskDueDateLabel = document.createElement('span');
  taskDueDateLabel.textContent = `Due Date: ${dueDate}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(newTask);
  });

  newTask.appendChild(taskCheckbox);
  newTask.appendChild(taskLabel);
  newTask.appendChild(taskEditInput);
  newTask.appendChild(taskPriorityLabel);
  newTask.appendChild(taskDueDateLabel);
  newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === '') {
    alert('Please enter a task');
    return;
  }

  createTaskElement(taskInput.value, taskPriority.value, taskDueDate.value);
  taskInput.value = '';
  taskDueDate.value = '';
});

filterPriority.addEventListener('change', () => {
  const priorityFilter = filterPriority.value;
  const tasks = taskList.querySelectorAll('li');

  tasks.forEach(task => {
    if (priorityFilter === 'all') {
      task.style.display = 'list-item';
    } else {
      const priorityClass = `priority-${priorityFilter}`;
      if (task.classList.contains(priorityClass)) {
        task.style.display = 'list-item';
      } else {
        task.style.display = 'none';
      }
    }
  });
});
