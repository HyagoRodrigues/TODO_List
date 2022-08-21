const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    //clearFields()
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

const clearFields = () => {
    const fields = document.querySelectorAll('input');
    fields.forEach(field => field.value = '');
    document.getElementById('task-name').dataset.index = 'new';
}


const saveTask = () => {
    debugger
    if (validateFields()) {
        const task ={
            name: document.getElementById('task-name').value,
            description: document.getElementById('task-description').value,
            date : document.getElementById('task-date').value,
            category: document.getElementById('task-category').value,
            priority: document.getElementById('task-priority').value,
            status: document.getElementById('task-status').value,

        }
        const index = document.getElementById('task-name').dataset.index;
        if (index === 'new') {
            createTask(task);
            updateTable();
            closeModal();
        }else{
            updateTask(index, task);
            updateTable();
            closeModal();
        }
    }
}


const createRow = (task, index) => {
    const nRow = document.createElement('tr');
    nRow.innerHTML = `
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

const fillFilds = (task) =>{
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
    if(event.target.type == 'button'){

        const [action, index] = event.target.id.split('-');

        if(action == 'edit'){
            editTask(index);
        } else {
            const tasks = readTasks()[index];
            const response = confirm(`Deseja deletar a tarefa ${tasks.name}`);
            if(response){
                deleteTask(index);
                updateTable();
            }
        }
    }
}

updateTable()

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