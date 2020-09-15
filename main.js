const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array){
    addToDo(item.name, iterm.id, item.done, item.trash);
}


const options = {eekday:"long", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function addToDo(todo, id, done, trash ){

    if(trash){return;}

    const Done = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
    <i class="fa co" job="complete" id="${id}"></i>
    <p class="text">${toDo}</p>
    <i class="fa fa-trash-o do" job="delete" id="${id}"></i>
    </li>
    `;
    const postion = "beforeend";

    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.nodeValue;
        if(toDo){
            addToDo(toDo, id, false, false);
        }
        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        })

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";
});

function completeToDo (element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener('click', function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
        
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

addToDo("Coffee", 1, false, true);