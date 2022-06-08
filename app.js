let button = document.querySelector(".btn"); 
let taskcontainer = document.querySelector(".tasklist"); 
let bottom_button_b2 = document.querySelector(".b2"); 
let bottom_button_b1= document.querySelector(".b1");
let bgslider= document.querySelector('.bgslider')
let inputlist = document.querySelector(".list"); 
console.dir(inputlist); 
button.addEventListener("click", additems); 
bottom_button_b2.addEventListener("click", deleteselectedlist); 
const LOCAL_STORAGE_LIST_KEY = "task.lists"; 
const LOCAL_STORAGE_LIST_ID_KEY = "task.selectedListId"; 
let addtaskbutton = document.querySelector("#addtask");
let tasknameform2= document.querySelector('[tasknameform2]');


let taskcount = document.querySelector('[taskcount]')
let mainheading= document.querySelector('[mainheading]')
let taskbox= document.querySelector('[taskbox]')
let listdisplaycontainer= document.querySelector('[listdisplaycontainer]')
let listcontent = document.querySelector('#tasktemplate')

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; 
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY); 
if(selectedListId)
selectedListId= selectedListId.slice(1,selectedListId.length-1)






render(); 
//-------------------------right hand side task adding ----error may be here-----
addtaskbutton.addEventListener('click',(e)=>{

e.preventDefault();
if (tasknameform2.value == null || tasknameform2.value == "") return; 

  let ctaskname = createTask(tasknameform2.value); 
  tasknameform2.value = ""; 
  const selectedListobj= lists.find(list=> list.id===selectedListId)
  selectedListobj.tasks.push(ctaskname) 
  render(); 
  save(); 

})

//--------------------------------------------------------


// checkbox event listener--------------------------------
taskbox.addEventListener('click',(e)=>{

if(e.target.tagName.toLowerCase()==='input' )
{

console.dir(e)
const selectedListobj= lists.find(list=>list.id===selectedListId)
const selectedTask= selectedListobj.tasks.find(task=>task.id===e.target.id)
selectedTask.complete=e.target.checked;
if(selectedTask.complete==true)
e.target.nextElementSibling.classList.add('overline')
else
e.target.nextElementSibling.classList.toggle('overline')
save()
rendertaskcount(selectedListobj)
}


})


//-----------create task-------------
function createTask(tasknameform2)
{

  return { id: Date.now().toString(), name:tasknameform2, complete:false}; 

}

//---------------------------------

//----------------left hand side task container-----------------working fine

taskcontainer.addEventListener("click", (e) => { 
  if (e.target.tagName.toLowerCase() === "li") { 
    selectedListId = e.target.dataset.listID; 
    save()
    render()
  } 
});

//--------------------------------------------------------

//deleted the list that is currently selected by the user--------

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

 //-------------------------------------------


 //--------function to render task and tasklist every time a change occur-----

function render() { 
  
  clearPrevious(taskcontainer);
  listdisplaycontainer.style.display='none';
  renderlist()

  if(selectedListId===null || selectedListId==='ul')
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
rendertasklist(listtodisplay)
 

}

}

//------------------rendertasklist----right hand task- checkbox----label----------------------

function rendertasklist(listtodisplay)
{

listtodisplay.tasks.forEach(task_list => {

  if(task_list.id){

const listtaskelement= document.importNode(listcontent,true)
//const checkbox= listtaskelement.querySelector('input')
//console.log('ffdghnothing',checkbox)
listtaskelement.content.childNodes[1].children[0].id=task_list.id;
listtaskelement.content.childNodes[1].children[1].id=task_list.id;
listtaskelement.content.childNodes[1].children[1].append(task_list.name);
listtaskelement.content.childNodes[1].children[0].id=task_list.id;
listtaskelement.content.childNodes[1].children[0].checked=task_list.complete;
if(task_list.complete===true)
listtaskelement.content.childNodes[1].children[1].classList.add('overline')
//checkbox.id=task_list.id;
//checkbox.checked= task_list.complete;
//const label= listtaskelement.querySelector('label')
//label.id= task_list.id;
//label.append(task_list.name)
taskbox.appendChild(listtaskelement.content)
}
});


}
//-----------------------------------------------------


// will display the task remaining ---------------error -------//

function rendertaskcount(listtodisplay)
{
let incompletetask= 0;

for( task of listtodisplay.tasks )
{
  console.log(task.complete)
  if(task.complete===false)
  incompletetask++;

}
 let complete= listtodisplay.tasks.length-incompletetask;
if(complete+incompletetask!=0){
console.log("calculation ",complete*(350/listtodisplay.tasks.length)) ;
bgslider.style.width= `${complete*(350/listtodisplay.tasks.length)}px`
}
else
bgslider.style.width="0px"; 
  
  
  
console.log(incompletetask)
const taskstring = incompletetask===1?"task":"tasks";
taskcount.innerText= `${incompletetask} ${taskstring} remaining`
}

//----------------------------------------------------------


//...........................working fine.............................
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

//-----------------------------------------------------------------------------




function clearPrevious(elements) { 
  while (elements.firstChild) { 
    elements.removeChild(elements.firstChild); 
  } 
}

//----------------------------------------------



function save() { 
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); 
  localStorage.setItem( LOCAL_STORAGE_LIST_ID_KEY, JSON.stringify(selectedListId));
   
} 

//-------------------------------------adding new items---------------

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

//------------------------------------------------creating new items specifying id----------
function createList(lname) { 
  return { id: Date.now().toString(), name: lname, tasks: [  ] }; 
}

//--------------------------------------------------------------------------

bottom_button_b1.addEventListener('click',clearselecteditems)

function clearselecteditems(e)
{

e.preventDefault();
const listobj= lists.find(list=>list.id===selectedListId)
listobj.tasks= listobj.tasks.filter(task=>task.complete===false)
save()
render()

}

//--------------------------------------------------------------------------
