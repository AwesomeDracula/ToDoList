//Initial variables
const form = document.querySelector('#mainForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

// List
let todoList = [];

// Handle each item
const handleItem = function(itemName){
	const items = itemList.querySelectorAll('.item');
	items.forEach(function(item){
		if(item.querySelector('.item-name').textContent === itemName){
			//complete-item event listener
			item.querySelector('.complete-item').addEventListener('click',function(){
				item.querySelector('.item-name').classList.toggle('completed');
				this.classList.toggle('visibility');
			});
			//edit-item event listener
			item.querySelector('.edit-item').addEventListener('click',function(){
				itemInput.value = itemName;
				itemList.removeChild(item);
				todoList = todoList.filter(function(item){
					return item !== itemName;
				});
			});
			//delete-item event listener
			item.querySelector('.delete-item').addEventListener('click',function(){
				itemList.removeChild(item);
				todoList = todoList.filter(function(item){
					return item !== itemName;
				});
			});
		}
	});
}

// const removeItem = function(item){
// 	console.log(item);
// 	const removeIndex = (todoList.indexOf(item));
// 	console.log(removeIndex);
// 	todoList.splice(removeIndex,1);
// }

const getList = function(todoList){
	itemList.innerHTML = '';
	todoList.forEach(function(item){
		itemList.insertAdjacentHTML('beforeend',`<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item mx-2 item-icon"><i class="far fa-trash-alt"></i></a></div></div>` );
		handleItem(item);
	})
}

const getLocalStorage = function(){
	const todoStorage = localStorage.getItem('todoList');
	if(todoStorage === 'undefined' || todoStorage === null){
		todoList = [];
	}
	else{
		todoList = JSON.parse(todoStorage);
		getList(todoList);
	}
}

const setLocalStorage = function(todoList){
	localStorage.setItem('todoList', JSON.stringify(todoList));
}

getLocalStorage();

form.addEventListener('submit', function(e){
	e.preventDefault();
	const itemName = itemInput.value;
	if(itemName.length === 0){
		feedback.innerHTML = 'please enter valid value';
		feedback.classList.add('show', 'alert-danger');
		setTimeout(
			function(){
				feedback.classList.remove('show');
			},3000);
	}
	else{
		todoList.push(itemName);
		setLocalStorage(todoList);
		getList(todoList);
	}
	itemInput.value = '';
});

clearButton.addEventListener('click', function(){
	todoList = [];
	localStorage.clear();
	getList(todoList);
})
