const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');


const fecthTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
}

const addTask = async (event) => {
  event.preventDefault();
  const task = { title: inputTask.value };

  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(task)
  });

  loadTasks();
  inputTask.value = '';
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete'
  });
  loadTasks();
}

const updateTask = async ({id, title, status}) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({title, status})
  });

  loadTasks();
}

const editTask = async (id) => {
  alert('editar task: ' + id);
}

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
}

const createElement = (tag, conteudo = '') => {
  const element = document.createElement(tag);
  element.innerText = conteudo;
  return element;
}

const createSelect = (value) => {
  const select = createElement('select');
  const optionPendente = createElement('option', 'pendente');
  const optionEmAndamento = createElement('option', 'em andamento');
  const optionConcluido = createElement('option', 'concluído');

  select.appendChild(optionPendente);
  select.appendChild(optionEmAndamento);
  select.appendChild(optionConcluido);

  select.value = value;
  return select;
}

const createButtonDelete = (id) => {
  const button = createElement('button');
  const span = createElement('span', 'delete');
  button.classList.add("btn-action");
  span.classList.add("material-symbols-outlined");
  button.appendChild(span);
  button.addEventListener('click', () => { deleteTask(id) });
  return button;
}

const createButtonEdit = (id, tdTarefa, editForm) => {
  const button = createElement('button');
  const span = createElement('span', 'edit');
  button.classList.add("btn-action");
  span.classList.add("material-symbols-outlined");
  button.appendChild(span);
  button.addEventListener('click', () => {
    tdTarefa.innerText = '';
    tdTarefa.appendChild(editForm);
  });
  return button;
}

const createRow = (task) => {
  const {id, title, created_at, status} = task;

  //linha
  const tr = createElement('tr');

  //coluna Tarefa
  const tdTarefa = createElement('td', title);

  //coluna Criada em
  const tdCriadoEm = createElement('td', formatDate(created_at));

  //coluna Status
  const tdStatus = createElement('td');
  const select = createSelect(status);
  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value}, ));
  tdStatus.appendChild(select);

  //criar form de edicao do title
  const editForm = createElement('form');
  const editInput = createElement('input');
  editInput.value = title;
  editForm.appendChild(editInput);
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({ id, title: editInput.value, status });
  });

  //coluna Ações
  const tdAcoes = createElement('td');
  const buttonEdit = createButtonEdit(id, tdTarefa, editForm);
  const buttonRemover = createButtonDelete(id);
  tdAcoes.appendChild(buttonEdit);
  tdAcoes.appendChild(buttonRemover);

  //Appends
  tr.appendChild(tdTarefa);
  tr.appendChild(tdCriadoEm);
  tr.appendChild(tdStatus);
  tr.appendChild(tdAcoes);

  return tr;
}

const loadTasks = async () => {

  const tasks = await fecthTasks();
  tbody.innerHTML = '';
  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
}

addForm.addEventListener('submit', addTask);

loadTasks();
