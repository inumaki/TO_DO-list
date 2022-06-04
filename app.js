let button = document.querySelector(".btn"); 
let taskcontainer = document.querySelector(".tasklist"); 
let bottom_button_b2 = document.querySelector(".b2"); 
let bottom_button_b1= document.querySelector(".b1");
let addtaskbutton = document.querySelector("#addtask");
let inputlist = document.querySelector(".list"); 
console.dir(inputlist); 
button.addEventListener("click", additems); 
bottom_button_b2.addEventListener("click", deleteselectedlist); 
const LOCAL_STORAGE_LIST_KEY = "task.lists"; 
const LOCAL_STORAGE_LIST_ID_KEY = "task.selectedListId"; 
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; 
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY); 
selectedListId= selectedListId.slice(1,selectedListId.length-1)

let taskcount = document.querySelector('[taskcount]')
let mainheading= document.querySelector('[mainheading]')
let taskbox= document.querySelector('[taskbox]')
let listdisplaycontainer= document.querySelector('[listdisplaycontainer]')
let listcontent = document.getElementById('task-template')




render(); 

addtaskbutton.addEventListener('click',(e)=>{

e.preventDefault();
if(selectedListId==null || selectedListId=='')
  return 
  else
  {
    let listtodisplay;
    for(let list of lists)
    {
      if(list.id==selectedListId)
        {
listtodisplay= list
break;
        }
    }
    listtodisplay.tasks.push({id:'12345',name:'determing',complete:true});
  render()
  save()
  }

})


taskcontainer.addEventListener("click", (e) => { 
  if (e.target.tagName.toLowerCase() === "li") { 
    selectedListId = e.target.dataset.listID; 
    save()
    render()
  } 
});


function deleteselectedlist(e) 
{ 
//   console.log(lists)
//   console.log(selectedListId)
//   lists= lists.filter(list =>{list.id!==selectedListId})
// console.log(lists)
let nlist= []
for(let list of lists)
{
  if(list.id!=selectedListId)
    nlist.push(list)
}
lists=nlist
  selectedListId=null;
  save()
  render()
 } 

 

function render() { 
  
  clearPrevious(taskcontainer);
 
  renderlist()

  if(selectedListId==null || selectedListId=='')
  {
    listdisplaycontainer.style.display='none';
  }
  else
  {
    let listtodisplay=[];
    for(let list of lists)
    {
      if(list.id==selectedListId)
        {
listtodisplay= list
break;

        }
    }
    listdisplaycontainer.style.display='';
    mainheading.innerText=listtodisplay.name;
  rendertaskcount(listtodisplay)
   clearPrevious(taskbox)
 //   rendertasklist(listtodisplay)
  }

}

function rendertasklist(listtodisplay)
{
listtodisplay.tasks.forEach(task_list => {
const listtaskelement= document.importNode(listcontent,true)
const checkbox= listtaskelement.querySelector('[checkboxstatus]')
checkbox.id=task_list.id;
checkbox.checked= task_list.complete;
const label= document.querySelector('label')
label.id= task_list.id;
label.append(task_list.name)
taskbox.appendChild(listtaskelement)
});
}



function rendertaskcount(listtodisplay)
{
let incompletetask= listtodisplay.tasks.filter(task=>{ !task.complete})

const taskstring = incompletetask.length===1?"task":"tasks";
taskcount.innerText= `${incompletetask.length} ${taskstring} remaining`




}


function renderlist()
{
  for (let list of lists) { 
    let li = document.createElement("li"); 
    li.dataset.listID = list.id; 
    li.id = list.id; 

    if (list.id === selectedListId)
    {
     
    li.classList.add("selected"); 
  }
     li.classList.add("preactive"); 
 
    li.innerText = list.name; 
    taskcontainer.append(li); 
  }
}






function clearPrevious(elements) { 
  while (elements.firstChild) { 
    elements.removeChild(elements.firstChild); 
  } 
}

function save() { 
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); 
  localStorage.setItem( LOCAL_STORAGE_LIST_ID_KEY, JSON.stringify(selectedListId));
   
} 
 
function additems(e) { 
  e.preventDefault(); 
  if (inputlist.value == null || inputlist.value == "") return; 
  if (e.target.id == "addlist") { 
    // let li = document.createElement("li"); 
    // li.classList.add("preactive"); 
    // li.innerText = inputlist.value; 
    let cl = createList(inputlist.value); 
    inputlist.value = ""; 
    lists.push(cl); 
    render(); 
    save(); 
  } 
}

function createList(lname) { 
  return { id: Date.now().toString(), name: lname, tasks: [
{
id:'sdfdsfds',
name:'test',
complete:false

}

  ] }; 
}


bottom_button_b1.addEventListener('click',clearselcteditems)

function clearselcteditems(e)
{

e.preventDefault();

}
