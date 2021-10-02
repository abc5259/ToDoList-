class NewTaskView {
    constructor() {
        this.bodyElem = document.createElement('section');
        document.body.appendChild(this.bodyElem);
        document.body.addEventListener('click', (e) => {
            let eventArray = e.composedPath();
            if(!eventArray.some(element => element.className && 
                element.classList.contains('new-task'))){
                    if(!eventArray.some(element => element.className &&
                        element.classList.contains('open'))){
                            this.hide();
                    }
            }
        });
    }
    show() {
        newTaskElem.style.pointerEvents = 'none';
        this.bodyElem.innerHTML = `
            <form class="add-todo" action="post">
                <input class="add-todo-title" type="text" placeholder="title">
                <textarea class="add-todo-details"placeholder="Add details"></textarea>
                <div class="add-todo-type">
                    <i class="fas fa-list-ul"></i>
                    <div class="add-todo-type-list">
                        <div class="list">To Do</div>
                        <i class="fas fa-arrow-down"></i>
                    </div>
                </div>
                <div class="add-todo-addTask">
                    <i class="fas fa-level-up-alt"></i>
                    <input class="" type="text" placeholder="Add Task">
                </div>
                <div class="add-todo-submit">Add</div>
            </form>
        `;
        const addTodoElem = document.querySelector('.add-todo');
        const timeId = setTimeout(() => {
            addTodoElem.classList.add('open');
            clearTimeout(timeId);
        },10);
        this.dataInput();
    }
    hide() {
        newTaskElem.style.pointerEvents = 'auto';
        const addTodoElem = document.querySelector('.add-todo');
        const timeId = setTimeout(() => {
            if(addTodoElem){
                addTodoElem.classList.remove('open');
            }
            clearTimeout(timeId);
        },10);
        setTimeout(() => {this.bodyElem.innerHTML = "";}, 100);
    }
    dataInput() {
        const addToDoSubmitElem = document.querySelector('.add-todo-submit');
        const addToDoTitle = document.querySelector('.add-todo-title');
        const addTodoDetails = document.querySelector('.add-todo-details');
        const addTodoAddTask = document.querySelector('.add-todo-addTask input');
        let title;
        let detail;
        let task;
        addToDoTitle.addEventListener('change', (e) => {
            title = e.target.value
        });
        addTodoDetails.addEventListener('change', (e) => {
            detail = e.target.value
        });
        addTodoAddTask.addEventListener('change', (e) => {
            task = e.target.value
        });
        addToDoSubmitElem.addEventListener('click',() => {
            data.push({
                title,
                detail,
                task,
            });
            this.hide();
            const newTask = new NewTask();
            newTask.show();
            // console.log(data);
        });
    }
}

class NewTask {
    constructor() {
        this.bodyElem = document.createElement('li');
        this.bodyElem.classList.add('add-task');
    }
    show() {
            this.bodyElem.innerHTML = `
            <h1 class="add-task-header">
                <div class="add-task-detail">
                    <i class="fas fa-arrow-down"></i>
                </div>
                <label class="add-task-title" for="titleInput-${data.length-1}">
                    <input type="checkbox" id="titleInput-${data.length-1}">
                    <span class="checkmark"></span>
                    ${data[data.length-1].title}
                </label>
                <div class="add-task-finish">1/3 complete</div>
            </h1>
            `
            taskElem.appendChild(this.bodyElem);
            console.log(data);
            this.addDetailkDownUP(data.length-1);
    }
    addDetailkDownUP(dataIndex) {
        const downIconElems = document.getElementsByClassName('add-task-detail');
        downIconElems[dataIndex].addEventListener('click', () => {
            const addedSectionkElem = document.createElement('section');
            addedSectionkElem.classList.add('added-task-section');
            downIconElems[dataIndex].classList.add('down');
            if(downIconElems[dataIndex].classList.contains('down') && down){
                addedSectionkElem.innerHTML = `
                    <h1 class="added-task-detail">
                        <span class="detail">Detail:</span>
                        <span>${data[dataIndex].detail}</span>
                    </h1>
                    <ul class="added-task-ul">
                        <li class="added-tasks">
                            <label class="add-task-title added-task-title" for="added-${dataIndex}">
                                <input type="checkbox" id="added-${dataIndex}">
                                <span class="checkmark"></span>
                                ${data[dataIndex].task}
                            </label>
                            <span class="delete-btn">
                                <i class="fas fa-backspace"></i>
                            </span>
                        </li>
                    </ul>
                `;
                this.bodyElem.appendChild(addedSectionkElem);
                down = false;
           }else {
                for(let i = 0; i < this.bodyElem.childNodes.length; i++){
                    if(this.bodyElem.childNodes[i].className
                    &&this.bodyElem.childNodes[i].classList.contains('added-task-section')){
                        this.bodyElem.removeChild(this.bodyElem.childNodes[i]);
                    }
                }
                downIconElems[dataIndex].classList.remove('down');
                down = true;
           }
        });
    }
}


let data = [];
let down = true;

let newTaskElem;
let taskElem;
let sectionWrapElem;

function addElems() {
    newTaskElem = document.querySelector('.new-task');
    taskElem = document.querySelector('.task');
    sectionWrapElem = document.querySelector('.section-wrap');
}

window.addEventListener('load', () => {
    addElems();
    const newTaskView = new NewTaskView();
    newTaskElem.addEventListener('click', () => {
        newTaskView.show();
    });

});