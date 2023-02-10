import { v4 as uuid } from 'uuid';

let userInput = document.querySelector<HTMLInputElement>('#task-title');
let addBtn = document.querySelector<HTMLButtonElement>('#add-btn');
let listOfTask = document.querySelector<HTMLUListElement>('#lists');

console.log(addBtn);

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

let allTasks: Task[] = getTasks();
allTasks.forEach(addTask);

addBtn?.addEventListener('click', (e) => {
  e.preventDefault();

  if (userInput?.value == '' || userInput?.value == null) return;

  const newTask = {
    id: uuid(),
    title: userInput.value,
    completed: false,
  };

  allTasks.push(newTask);

  addTask(newTask);
  userInput.value = '';
});

function addTask(task: Task) {
  let item = document.createElement('li');
  let label = document.createElement('label');
  let input = document.createElement('input');
//   let deleteBtn = document.createElement('button');
//   deleteBtn.innerText="delete"

//   deleteBtn.addEventListener("click" ,(e)=>{
// 	e.preventDefault();
// 	deleteTask(task)
// 	console.log(allTasks);
//   })
   
  input.addEventListener('change', (e) => {
    task.completed = input.checked;
    if (task.completed) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
    saveTasks();
  });

  if (task.completed) {
    label.style.textDecoration = 'line-through';
  } else {
    label.style.textDecoration = 'none';
  }

  input.type = 'checkbox';
  input.checked = task.completed;
  label.append(input, task.title);

  item.append(label);
  listOfTask?.append(item);
  console.log('added');
}

function saveTasks() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function getTasks(): Task[] {
  let jsonTask = localStorage.getItem('allTasks');
  if (jsonTask === null) return [];
  return JSON.parse(jsonTask);
}

// function deleteTask(task:Task){
// 	return allTasks.filter(item=>item.id!==task.id);
// }