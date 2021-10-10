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
                <section class="add-todo-addTask">
                    <div class="add-todo-addTask-wrap">
                        <i class="fas fa-level-up-alt"></i>
                        <input class="add-todo-addTask-wrap__input" type="text" placeholder="Add Task">
                        <i class="fas fa-plus-circle plusTaskBtn"></i>
                    </div>
                </section>
                <div class="add-todo-btn">Add</div>
            </form>
        `;
        let task = [];
        const addTodoElem = document.querySelector('.add-todo');
        const timeId = setTimeout(() => {
            addTodoElem.classList.add('open');
            clearTimeout(timeId);
        },10);
        this.dataInput(task);
        this.plusTaskBtnClick(task);
        const plusTask = new PlusTask();
        plusTask.data_taskPush(task);
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

    dataInput(task) {
        const addToDoSubmitBtnElem = document.querySelector('.add-todo-btn');
        const addToDoTitleElem = document.querySelector('.add-todo-title');
        const addTodoDetailsElem = document.querySelector('.add-todo-details');
        let title;
        let detail;
        addToDoTitleElem.addEventListener('change', (e) => {
            title = e.target.value
        });
        addTodoDetailsElem.addEventListener('change', (e) => {
            detail = e.target.value
        });
        addToDoSubmitBtnElem.addEventListener('click',() => {
            data.push({
                title,
                detail,
                task
            });
            this.hide();
            const newTask = new NewTask();
            newTask.show();
            console.log(data);
        });
    }

    plusTaskBtnClick(task) {
        const addTaskSectionElem = document.querySelector('.add-todo-addTask');
        const plusTaskBtnElem = document.querySelector('.plusTaskBtn');
        plusTaskBtnElem.addEventListener('click',() => {
            const plusTask = new PlusTask();
            plusTask.show(addTaskSectionElem);
            plusTask.data_taskPush(task);
        });
    }


}


class PlusTask {
    constructor() {
        this.bodyElem = document.createElement('div');
        this.bodyElem.classList.add('add-todo-addTask-wrap');
    }
    show(parentNode) {
        this.bodyElem.innerHTML = `
            <i class="fas fa-level-up-alt"></i>
            <input class="add-todo-addTask-wrap__input" type="text" placeholder="Add Task">
        `
        parentNode.appendChild(this.bodyElem);
    }

    data_taskPush(task) {
        const addTodoAddTaskElems = document.querySelectorAll('.add-todo-addTask-wrap__input');
        for(let i = 0; i <addTodoAddTaskElems.length; i++) {
            addTodoAddTaskElems[i].addEventListener('change', () => {
                console.log(addTodoAddTaskElems[i].value);
                task.push(addTodoAddTaskElems[i].value);
                // console.log(task);
            });
        }
    }
}

// data의 detail/task부분을 보여주는 class
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
            this.addDetailkDownUP(data.length-1);
            setTimeout(() => {
                checkedBoxLineThrough(`titleInput-${data.length-1}`);
            },30);
    }
    addDetailkDownUP(dataIndex) {
        const downIconElems = document.getElementsByClassName('add-task-detail');
        let addedSectionkElem;
        downIconElems[dataIndex].addEventListener('click', () => {
            if(!downIconElems[dataIndex].classList.contains('down')){
                if(!addedSectionkElem){
                    addedSectionkElem = document.createElement('section');
                    addedSectionkElem.classList.add("added-task-section",`${dataIndex}`);
                    downIconElems[dataIndex].classList.add('down');
                    addedSectionkElem.innerHTML = `
                        <h1 class="added-task-detail">
                            <span class="detail">Detail:</span>
                            <span>${data[dataIndex].detail}</span>
                        </h1>
                    `;
                    const addTaskData = new AddTaskData(addedSectionkElem);
                    addTaskData.show(dataIndex);
                    this.bodyElem.appendChild(addedSectionkElem);
                }else {
                    addedSectionkElem.classList.remove('displayNone');
                    downIconElems[dataIndex].classList.add('down');
                }
           }else {
                // addedSectionkElem = document.getElementsByClassName(`added-task-section ${dataIndex}`);
                addedSectionkElem.classList.add('displayNone');
                downIconElems[dataIndex].classList.remove('down');
           }
        });
    }
}

// data의 task부분을 보여주는 class
class AddTaskData {
    constructor(parentNode) {
        this.bodyElem = document.createElement('ul');
        this.bodyElem.classList.add('added-task-ul');
        this.parentNode = parentNode;
        this.dataTask = [];
        this.checkInput = [];
    }
    show(dataIndex) {
        this.bodyElem.innerHTML = "";
        for(let i = 0; i < data[dataIndex].task.length; i++) {
            const liElem = makeElement('li','added-tasks');
            liElem.innerHTML = `
                <label class="add-task-title added-task-title" for="${data[dataIndex].task[i]}">
                    <input type="checkbox" id="${data[dataIndex].task[i]}">
                    <span class="checkmark"></span>
                    <p>${data[dataIndex].task[i]}</p>
                </label>
                <span class="delete-btn">
                    <i class="fas fa-backspace deletBtn-${dataIndex}-${i}"></i>
                </span>
            `
            this.dataTask.push(liElem);
            // console.log(this.dataTask);
            this.bodyElem.appendChild(this.dataTask[i]);
            // console.log(this.dataTask[i],this.bodyElem.innerHTML);
            setTimeout(() => {
                if(this.checkInput[i]){
                    console.log(this.checkInput[i]);
                    for(let j = 0; j<this.checkInput.length; j++){
                        const pElem = document.querySelector(`label[for="${data[dataIndex].task[i]}"]`).children[2];
                        if(this.checkInput[j] == pElem.innerHTML){
                            document.querySelector(`input[id="${data[dataIndex].task[i]}"]`).checked = true;
                            document.querySelector(`label[for="${data[dataIndex].task[i]}"]`).classList.add('checked');
                        }
                    }
                }
                checkedBoxLineThrough(data[dataIndex].task[i],this.checkInput);
                this.deleteTask(i,dataIndex);
            },30);
        }
        this.parentNode.appendChild(this.bodyElem);
    }

    deleteTask(deleteBtnIndex,dataIndex) {
        let deleteBtnElem = document.querySelector(`.deletBtn-${dataIndex}-${deleteBtnIndex}`);
        // console.log(deleteBtnElem);
        deleteBtnElem.addEventListener('click', () => {
            // console.log("click");
            this.dataTask = [];
            data[dataIndex].task.splice(deleteBtnIndex,1);
            // console.log(this.dataTask,data[dataIndex].task);
            this.show(dataIndex);
        });
    }
}


let data = [];

let newTaskElem;
let taskElem;
let sectionWrapElem;

function addElems() {
    newTaskElem = document.querySelector('.new-task');
    taskElem = document.querySelector('.task');
    sectionWrapElem = document.querySelector('.section-wrap');
}

function makeElement(element,className) {
    const elementElem = document.createElement(element);
    if(className){
        elementElem.classList.add(className);
    }
    return elementElem;
}

function checkedBoxLineThrough(idName,checkInput) {
    const inputElem = document.querySelector(`input[id="${idName}"]`);
    const labelElem = document.querySelector(`label[for="${idName}"]`);
    // console.log(inputElem);
    labelElem.addEventListener('click', (e) => {
        if(inputElem.checked && !labelElem.classList.contains('checked')){
            labelElem.classList.add('checked');
            if(checkInput) checkInput.push(labelElem.children[2].innerHTML);
            console.log(checkInput);
        }else {
            labelElem.classList.remove('checked');
            if(checkInput) {
                for(let i = 0; i <checkInput.length; i++){
                    if(checkInput[i] == labelElem.children[2].innerHTML){
                        checkInput.splice(i,1);
                    }
                }
            }
            console.log(checkInput);
        }
    });
}


window.addEventListener('load', () => {
    addElems();
    newTaskElem.addEventListener('click', () => {
        const newTaskView = new NewTaskView();
        newTaskView.show();
    });

});