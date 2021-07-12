import {createStore} from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
    return{
        type: ADD_TODO, 
        text
    }
};

const deleteToDo = id => {
    return{
        type: DELETE_TODO,
        id
    }
}


const reducer = (state = [], action) => {
    switch(action.type){
        case ADD_TODO:
            const newToDoObj =  {text: action.text, id:Date.now()};
            return[newToDoObj, ...state];
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id); //삭제할 ID에 해당하지 않는 ID를 가진 toDO는 유지!
            return cleaned;
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
   const id = parseInt(e.target.parentNode.id);
   store.dispatch(deleteToDo(id))
}

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = ""; //clean the whole list
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteToDo)
        li.id = toDo.id
        li.innerText = toDo.text
        li.appendChild(btn);
        ul.appendChild(li); //create the whole new list
    })
}

store.subscribe(paintToDos);



const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);