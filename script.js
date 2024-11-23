let tasks = [];
const STORAGE_KEY = 'todoTasks';

// Carrega as tarefas do localStorage ao iniciar
function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Salva as tarefas no localStorage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            date: new Date().toISOString()
        };
        
        tasks.push(task);
        saveTasks();
        renderTasks();
        input.value = '';
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function moveUp(index) {
    if (index > 0) {
        [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
        saveTasks();
        renderTasks();
    }
}

function moveDown(index) {
    if (index < tasks.length - 1) {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const isFirstIncomplete = !task.completed && index === tasks.findIndex(t => !t.completed);

        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''} ${isFirstIncomplete ? 'highlight' : ''}`;
        
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? '↩️' : '✓'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
                <div class="moveActions">
                    <button class="moveTask" onclick="moveUp(${index})" ${index === 0 ? 'disabled' : ''}>⬆️</button>
                    <button class="moveTask" onclick="moveDown(${index})" ${index === tasks.length - 1 ? 'disabled' : ''}>⬇️</button>
                </div>
            </div>
        `;
        
        taskList.appendChild(taskElement);
    });
}


// Adiciona evento de tecla Enter no input
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carrega as tarefas ao iniciar a página
loadTasks();
