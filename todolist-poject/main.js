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
        this.bodyElem.classList.add('new-task');
    }
    show() {
        for(let i = 0; i < data.length; i++){
            this.bodyElem.innerHTML = `${data[i].title} detail: ${data[i].detail}`;
            taskElem.appendChild(this.bodyElem);
        }
    }
}


let data = [];


let newTaskElem;
let taskElem;

function addElems() {
    newTaskElem = document.querySelector('.new-task');
    taskElem = document.querySelector('.task');
}

window.addEventListener('load', () => {
    addElems();
    const newTaskView = new NewTaskView();
    newTaskElem.addEventListener('click', () => {
        newTaskView.show();
    });

});