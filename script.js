const inputEl = (document.getElementsByClassName("app__controls-input"))[0];
const btnEl = (document.getElementsByClassName("app__controls-button"))[0];
const listEl = (document.getElementsByClassName("app__list"))[0];

let counter = 1;

const data = [];

//function initCounter(){

data.forEach(item => {
    if(item.id > counter){
        counter = item.id;
    }
});

if (counter > 1){
    counter++;
}

function createTask(objectData) {
    const root = document.createElement("div");
    root.classList.add("app__list-item");

    if (objectData.isDone === true) {
        root.classList.add("app__list-item_done");
    }

    const input = document.createElement("input");
    input.classList.add("app__list-checkbox");

    if (objectData.isDone === true) {
        input.checked = true;
    }

    input.type = "checkbox";
    

    // Обработчик изменения статуса задачи (чекбокс)
    input.addEventListener("change", () => {
        // Ищем задачу в массиве по ID
        const index = data.findIndex(item => item.id === objectData.id);
        if (index !== -1) {
            // Меняем статус на противоположный
            data[index].isDone = !data[index].isDone;
            render();
        }
    });

    
    const text = document.createElement("p");
    text.classList.add("app__list-item-text");
    text.innerText = objectData.text;

    const btn = document.createElement("button");
    btn.classList.add("app__list-item-btn");

    const img = document.createElement("img");
    img.src = "trash.svg";
    img.alt = "trash";

    btn.appendChild(img);
    

    // Обработчик удаления задачи
    btn.addEventListener("click", () => {
        // Ищем задачу в массиве по ID
        const index = data.findIndex(item => item.id === objectData.id);
        if (index !== -1) {
            // Удаляем задачу из массива
            data.splice(index, 1);
            render();
        }
    });


    root.appendChild(input);
    root.appendChild(text);
    root.appendChild(btn);

    return root;
}

btnEl.addEventListener("click", () => {
    const textValue = inputEl.value;
    data.push({
        id: counter++,
        text: textValue,
        isDone: false
    })
    render();
    console.log(data);
    inputEl.value = "";
});


function render(){
    listEl.innerHTML = "";
    for(let item of data){
        const tmpElement = createTask(item);
        listEl.appendChild(tmpElement);
    }
}