import events from "./pubsub";
import "./items-left";

const todoModule = (() => {
    let todos = [];

    let navstate = "all";

    // cacheDOM
    let $input = document.querySelector(".todo-input input");
    let $todoList = document.querySelector(".todo-list ul");
    let $all = document.querySelector(".todo-info .navs .all");
    let $active = document.querySelector(".todo-info .navs .active");
    let $completed = document.querySelector(".todo-info .navs .completed");
    let $clearAll = document.querySelector(".todo-info .clear-all");
    let $info = document.querySelector(".todo-info");

    // check local storage


    // render
    render(todos, navstate);

    function render(whatToRender, nav) {
        if(todos.length == 0) {
            $info.setAttribute("style", "display: none");
        }else {
            $info.setAttribute("style", "display: grid");
        }

        // let completedTodo = todos.filter(todo => todo.completed == true);
        // console.log(completedTodo);
        // (completedTodo.length == 0) ? $clearAll.setAttribute("display", "none") : $clearAll.setAttribute("display", "inline");

        $todoList.innerHTML = "";
        whatToRender.forEach(todo => {
            let style = (todo.completed == true) ? 'line-through' : 'none';
            let li = document.createElement("li");
            let textSpan = document.createElement("span");
            textSpan.setAttribute("style", "text-decoration:"+style);
            let textSpanTextNode = document.createTextNode(todo.todo);
            textSpan.appendChild(textSpanTextNode);
            let timesSpan = document.createElement("span");
            timesSpan.setAttribute("class", "times");
            timesSpan.addEventListener("click", removeTodo);
            let timesSpanTextNode = document.createTextNode("x");
            timesSpan.appendChild(timesSpanTextNode);
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            (todo.completed == true) ? checkbox.setAttribute("checked", "checked") : null;
            checkbox.addEventListener("click", completeATask);
            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(timesSpan);
            $todoList.appendChild(li);
        });
        
        let active = todos.filter(todo => todo.completed == false);
        events.emit("todolistchanged", active.length);
        setCurrentNav(navstate);
    }

    $clearAll.addEventListener("click", clearAllCompleted);
    $active.addEventListener("click", showActiveTodos);
    $all.addEventListener("click", showAllTodos);
    $completed.addEventListener("click", showCompletedTodos);
    $input.addEventListener("keyup", addTodo);

    function rememberState(navstate) {
        switch(navstate) {
            case "active":
                showActiveTodos();
                break;
            case "completed":
                showCompletedTodos();
                break;
            default:
                showAllTodos();
        }
    }

    // complete a task
    function completeATask(e) {
        if(e.target.checked) {
            let completeTodo = e.target.nextSibling.innerText;
            let i = 0;
            for(i; i < todos.length; i++) {
                if(todos[i].todo === completeTodo) {
                    todos[i].completed = true;
                }
            }
        }else {
            let unCompleteTodo = e.target.nextSibling.innerText;
            let i = 0;
            for(i; i < todos.length; i++) {
                if(todos[i].todo === unCompleteTodo) {
                    todos[i].completed = false;
                }
            }
        }
        rememberState(navstate);
    }

    // remove todo
    function removeTodo(e) {
        let todoToRemove = e.target.previousSibling.innerText
        let i = 0;
        for(i; i < todos.length; i++) {
            if(todos[i].todo === todoToRemove) {
                todos.splice(i, 1);
            }
        }
        rememberState(navstate);
    }

    // show completed todos
    function showCompletedTodos() {
        let completedTodos = todos.filter(todo => todo.completed == true);
        navstate = "completed";
        render(completedTodos, navstate);
    }

    // show all todos
    function showAllTodos() {
        navstate = "all";
        render(todos, navstate);
    }

    // show active todos
    function showActiveTodos() {
        navstate = "active";
        let activeTodos = todos.filter(todo => todo.completed == false);
        render(activeTodos, navstate);
    }

    // clear completed
    function clearAllCompleted() {
        let active = todos.filter(todo => todo.completed == false);
        todos = active;
        // let i = 0;
        // for(i; i < todos.length; i++) {
        //     if(todos[i].completed == true) {
        //         todos.splice(i, 1);
        //     }
        // }
        render(todos, navstate);
    }

    // add todo
    function addTodo(e) {
        if(e.key === "Enter") {
            let value = e.target.value;
            if(value.trim() != "") {
                let todo = {
                    completed: false,
                    todo: value
                }
                todos.push(todo);
                $input.value = "";
                switch(navstate) {
                    case "active":
                        showActiveTodos();
                        break;
                    case "completed":
                        showCompletedTodos();
                        break;
                    default:
                        showAllTodos();
                }
            }
        }
    }

    // dynamic nav
    function setCurrentNav(nav) {
        switch(nav) {
            case "active":
                $completed.classList.remove("nav-active");
                $all.classList.remove("nav-active");
                $active.classList.add("nav-active");
                break;
            case "completed": 
                $completed.classList.add("nav-active");
                $all.classList.remove("nav-active");
                $active.classList.remove("nav-active");
                break;
            default:
                $completed.classList.remove("nav-active");
                $all.classList.add("nav-active");
                $active.classList.remove("nav-active");
        }
    }
})();