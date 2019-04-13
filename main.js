// when user clicks on add button and there is some text in the Item,
// then add the text into the todo list
document.getElementById('add').addEventListener('click', function() {
	//console.log("Hello");
	let value = document.getElementById('item').value;
	if (value) {
		addItemTodo(value);
		document.getElementById('item').value = '';
	}
});

function addItemTodo(text){
	let list = document.getElementById('todo');

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
}

function removeItem(){
	let item = this.parentNode.parentNode;
	let parent = item.parentNode;
	//console.log(item);
	//console.log(parent);
	parent.removeChild(item);
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
}