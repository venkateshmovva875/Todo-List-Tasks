// script.js

// Selectors
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Functions

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
};

const deleteTask = (taskItem) => {
    taskItem.remove();
};

const editTask = (taskItem) => {
    const taskSpan = taskItem.querySelector('span');
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText !== null) {
        taskSpan.textContent = newText.trim();
    }
};

const completeTask = (taskItem) => {
    taskItem.classList.toggle('completed');
};

const filterTasks = (filter) => {
    const tasks = taskList.querySelectorAll('.task-item');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'pending':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
};

// Event Listeners

addTaskBtn.addEventListener('click', addTask);

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.closest('.task-item'));
    } else if (e.target.classList.contains('edit-btn')) {
        editTask(e.target.closest('.task-item'));
    } else if (e.target.classList.contains('complete-btn')) {
        completeTask(e.target.closest('.task-item'));
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterTasks(btn.getAttribute('data-filter'));
    });
});