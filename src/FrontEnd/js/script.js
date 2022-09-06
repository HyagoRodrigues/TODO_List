const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {

    document.getElementById('modal').classList.remove('active');
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) ?? [];
const setLocalStorage = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));


//Criar task

const createTask = (task) => {
    const tasks = getLocalStorage();
    tasks.push(task);
    setLocalStorage(tasks);
}

//Ler Task
const readTasks = () => getLocalStorage();

//Atualizar Task
const updateTask = (index, task) => {
    const tasks = getLocalStorage();
    tasks[index] = task;
    setLocalStorage(tasks);
}

//Deletar Task
const deleteTask = (index) => {
    const tasks = readTasks();
    tasks.splice(index, 1);
    setLocalStorage(tasks);
}


//validando campos
const validateFields = () => {
    return document.getElementById('form').reportValidity();
}


const saveTask = () => {

    if (validateFields()) {
        const task = {
            id: Math.floor(Math.random() * 65272),
            name: document.getElementById('task-name').value,
            description: document.getElementById('task-description').value,
            date: document.getElementById('task-date').value,
            category: document.getElementById('task-category').value,
            priority: document.getElementById('task-priority').value,
            status: document.getElementById('task-status').value,
            checkbox: document.getElementById('checkbox') ? document.getElementById('checkbox').value : false

        }
        const index = document.getElementById('task-name').dataset.index;
        if (index === 'new') {
            createTask(task);
            updateTable();
            closeModal();
        } else {
            updateTask(index, task);
            updateTable();
            closeModal();
        }
    }
}


const createRow = (task, index) => {
    const nRow = document.createElement('tr');
    nRow.innerHTML = `
        <td><input type="checkbox" class="table-checkbox" id="checkbox-${task.id}" ></td>      
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.date}</td>
        <td>${task.category}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td>
        <button type="button"  class="button btn-modal-green " id="edit-${index}">Editar</button>
        <button type="button"  class=" button btn-modal-red" id="delete-${index}">Deletar</button>        
        </td>
    `;
    document.querySelector('#tableTask>tbody').appendChild(nRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableTask>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));

}

const updateTable = () => {
    const tasks = readTasks();
    clearTable();
    tasks.forEach(createRow);
}

const fillFilds = (task) => {
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-category').value = task.category;
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-status').value = task.status;
    document.getElementById('task-name').dataset.index = task.index;
}


const editTask = (index) => {
    const tasks = readTasks()[index];
    tasks.index = index;
    fillFilds(tasks);
    openModal();
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');

        if (action == 'edit') {
            editTask(index);
        } else {
            const tasks = readTasks()[index];
            const response = confirm(`Deseja deletar a tarefa ${tasks.name}`);
            if (response) {
                deleteTask(index);
                updateTable();
            }
        }
    }
}

//Filtrar por DO
function filter_by_do() {
    clearTable()
    const tasks = readTasks()
    const clone = [...tasks]
    const filter = clone.filter(e => e.status == "DO")
    localStorage.setItem('do', JSON.stringify(filter));
    filter.forEach(createRow);
}

//Filtrar por DOING
function filter_by_doing() {
    clearTable()
    const tasks = readTasks()
    const clone = [...tasks]
    const filter = clone.filter(e => e.status == "DOING")
    localStorage.setItem('doing', JSON.stringify(filter));
    filter.forEach(createRow);
}

//Filtrar por DONE
function filter_by_done() {
    clearTable()
    const tasks = readTasks()
    const clone = [...tasks]
    const filter = clone.filter(e => e.status == "DONE")
    localStorage.setItem('done', JSON.stringify(filter));
    filter.forEach(createRow);
}

//TODAS AS TAREFAS
function all_tasks() {
    const tasks = readTasks()
    console.log(tasks)
    clearTable()
    updateTable()
}


//Checkboxes

function select_all() {
    let superCheck = document.getElementById('checkbox-super')
    let checkboxes = document.querySelectorAll('.table-checkbox')
    for (let checkbox of checkboxes) {
        checkbox.checked = superCheck.checked
    }
}

function verify_checked() {
    let checkboxes = document.querySelectorAll('.table-checkbox')
    let idsTasks = [];
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            idsTasks.push(checkbox.id.split('-')[1])
        }
    }
    change_status(idsTasks)

}

function change_status(idsTasks) {
    const values = document.getElementById('change-status').value
    const tasks = readTasks()

    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < idsTasks.length; j++) {
            if (tasks[i].id == idsTasks[j]) {
                tasks[i].status = values
                tasks[i].checked = false
            }
        }
    }
    setLocalStorage(tasks);
    clearTable();
    document.getElementById('checkbox-super').checked = false
    tasks.forEach(createRow);
}

updateTable()


//EVENTOS
document.getElementById('change')
    .addEventListener('click', verify_checked)

document.getElementById('new-task')
    .addEventListener('click', openModal)

document.getElementById('close')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveTask)

document.querySelector('#tableTask>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)


//FILTROS


document.getElementById('all-tasks')
    .addEventListener('click', all_tasks)

document.getElementById('do-task')
    .addEventListener('click', filter_by_do)

document.getElementById('doing-task')
    .addEventListener('click', filter_by_doing)

document.getElementById('done-task')
    .addEventListener('click', filter_by_done)