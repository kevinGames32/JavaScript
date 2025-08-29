

const todoArray= JSON.parse(localStorage.getItem("events")) || [{
    name:"Event",
    dueDate:'2025-08-21'
}];


RenderList();

function addTodo(){

    //selects the value of the input and pushes it to the array
    try {
        
        //get inputs from html
        const inputElement = document.querySelector(".js-textInput")
        const inputElementDate = document.querySelector(".js-DateInput")
        
        //set inputs to variables
        let todoEvent = inputElement.value;
        let todoDate = inputElementDate.value;
        if(inputElement.value === '') {
            throw "Not A valid event type";
        }

        //push variable to correct order inside of the array
        todoArray.push({name: todoEvent, dueDate:todoDate});
        RenderList();

        //reset the values inside the date and input boxes
        inputElement.value='';
        inputElementDate.value='';
        
    } catch(err){
        alert(err);
    }
    finally{
        RenderList();
    }
}

//add a new way to listen for the click event on the add button to have less js on the html page
document.querySelector('.js-addTodo')
    .addEventListener('click', ()=>{
        addTodo();
    });



function RenderList(){
    //for every value that is in the todo list, add a new parragraph element to the list
    //containing the new information added
    let todoHtml = ''

    todoArray.forEach((value, index)=> {
        const {name, dueDate} = value;
        todoHtml+=`
        <div>${name}</div>
        <div> ${dueDate}</div>
        <div> <button class="delete-button js-deleteButton">Delete</button></div>`
    });
    //for(let i=0; i< todoArray.length; i++){
//
    //    todoHtml+=`
    //    <div>${todoArray[i].name}</div>
    //    <div> ${todoArray[i].dueDate}</div>
    //    <div> <button onclick="todoArray.splice(${i}, 1);
    //    RenderList();
    //    " class="delete-button">Delete</button></div>`
    //}
    document.querySelector('.js-placeHolder').innerHTML = todoHtml;
    storeEvents();

    document.querySelectorAll('.js-deleteButton').forEach((deleteButton, index)=>{
        deleteButton.addEventListener('click', ()=>{
            todoArray.splice(index, 1);
            RenderList();
        })
    })

}

function storeEvents(){
    localStorage.setItem("events",JSON.stringify(todoArray));   
}



