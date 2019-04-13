//data object
let data = (localStorage.getItem('toDoList'))?JSON.parse(localStorage.getItem('toDoList')):{
	todo: [],
	completed: []
};

renderTodoList();

// when user clicks on add button and there is some text in the Item,
// then add the text into the todo list
document.getElementById('add').addEventListener('click', function() {
	//
	let value = document.getElementById('item').value;
	if (value) {
		data.todo.push(value); // adding data to object
		addItemTodo(value,false); // false for 'completed' arguement in the function.
		document.getElementById('item').value = '';
	}
});

document.getElementById('item').addEventListener('keydown', function(e) {
	let value = this.value;
	if(e.code==='Enter' && value){
		data.todo.push(value); // adding data to object
		addItemTodo(value,false); // false for 'completed' arguement in the function.
		document.getElementById('item').value = '';
	}
});

//function to render data from local storage.
function renderTodoList(){
	if(!data.todo.length && !data.completed.length) return;

	for (var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemTodo(value,false);
	}
	for (var j = 0; j < data.completed.length; j++) {
		var value = data.completed[j];
		addItemTodo(value,true);
	}
}

function dataObjectUpdated(){
	localStorage.setItem('toDoList',JSON.stringify(data));
}

function addItemTodo(text,completed){
	let list = (completed)?document.getElementById('completed'):document.getElementById('todo');

	let item = document.createElement('li');
	item.innerText=text;
	let buttons = document.createElement('div');
	buttons.classList.add('buttons');

	let remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = 'Delete';
	// Add click functionality to Delete button
	remove.addEventListener('click',removeItem);

	let complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = 'Done';
	// Add click functionality to done button
	complete.addEventListener('click',completeItem);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item,list.childNodes[0]);

	dataObjectUpdated();
}

function removeItem(){
	let item = this.parentNode.parentNode;
	let parent = item.parentNode;

	parent.removeChild(item);
	// Registering changes to Data Object
	let id = parent.id;
	
	// remove item from data 
	let text= item.firstChild.data;
	if(id==='todo'){
		data.todo.splice(data.todo.indexOf(text),1);
		
	}else{
		data.completed.splice(data.completed.indexOf(text),1);
		
	}
	dataObjectUpdated();
}

function completeItem(){
	let item = this.parentNode.parentNode;
	let parent = item.parentNode;
	let parentId= parent.id;
	//check if the item is to be added to completed list or to the re-todo list
	let target = (parentId === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	item.childNodes[1].childNodes[1].innerHTML= (parentId==='todo')? 'Re-Do':'Done';

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

	// Registering entry in data object
	let text= item.firstChild.data;
	if(parentId==='todo'){
		data.todo.splice(data.todo.indexOf(text),1);
		data.completed.push(text);
	}else{
		data.completed.splice(data.completed.indexOf(text),1);
		data.todo.push(text);
	}
	dataObjectUpdated();
}