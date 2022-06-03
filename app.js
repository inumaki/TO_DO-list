let button = document.querySelector(".btn"); 
let taskcontainer = document.querySelector(".tasklist"); 
let bottom_button_b2 = document.querySelector(".b2"); 
 
let inputlist = document.querySelector(".list"); 
console.dir(inputlist); 
button.addEventListener("click", additems); 
bottom_button_b2.addEventListener("click", deleteselectedlist); 
 
function deleteselectedlist(e) { 
  const ul = document.querySelector(".tasklist"); 
  console.log(ul); 
  let list_element = document.getElementById(selectedListId); 
  console.log(list_element); 
  ul.removeChild(list_element); 
  console.log(ul); 
} 
 
const LOCAL_STORAGE_LIST_KEY = "task.lists"; 
const LOCAL_STORAGE_LIST_ID_KEY = "task.selectedListId"; 
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; 
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY); 
render(); 
 
taskcontainer.addEventListener("click", (e) => { 
  if (e.target.tagName.toLowerCase() === "li") { 
    selectedListId = e.target.dataset.listID; 
    render()
    save()
  } 
}); 
 
function render() { 
  clearPrevious(); 
  for (let list of lists) { 
    let li = document.createElement("li"); 
 
    li.dataset.listID = list.id; 
    li.id = list.id; 
    if (list.id == selectedListId) li.classList.add("selected"); 
    li.classList.add("preactive"); 
 
    li.innerText = list.name; 
    taskcontainer.append(li); 
  } 
} 
function clearPrevious() { 
  while (taskcontainer.firstChild) { 
    taskcontainer.removeChild(taskcontainer.firstChild); 
  } 
} 
function save() { 
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); 
  localStorage.setItem( 
    LOCAL_STORAGE_LIST_ID_KEY, 
    JSON.stringify(selectedListId) 
  ); 
} 
 
function additems(e) { 
  e.preventDefault(); 
  if (inputlist.value == null || inputlist.value == "") return; 
  if (e.target.id == "addlist") { 
    let li = document.createElement("li"); 
    li.classList.add("preactive"); 
    li.innerText = inputlist.value; 
    let cl = createList(inputlist.value); 
    inputlist.value = ""; 
    lists.push(cl); 
    render(); 
    save(); 
  } 
} 
function createList(lname) { 
  return { id: Date.now().toString(), name: lname, tasks: [] }; 
}
