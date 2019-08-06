// global variables
const select = document.getElementById('select');
const desc = document.getElementById('description');
const value = document.getElementById('value');
const data = [];
// this function to get date
function getDate() {
	const newDate = new Date();
	const month = newDate.getMonth();
	const year = newDate.getFullYear();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'Mai',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	document.getElementById('date').innerHTML = `Available Budget in ${months[month]} ${year}`;
}
window.addEventListener('load', getDate);
// --------------

function formStyle() {
	const labelDesc = document.querySelector('.labelDesc');
	const labelValue = document.querySelector('.labelValue');

	if (select.value === 'Income') {
		select.style.border = '1px solid #3ebb53';
		desc.style.border = '1px solid #3ebb53';
		value.style.border = '1px solid #3ebb53';
	} else {
		select.style.border = '1px solid #d24646';
		desc.style.border = '1px solid #d24646';
		value.style.border = '1px solid #d24646';
	}
	if (desc.value !== '') {
		labelDesc.style.display = 'none';
	} else {
		labelDesc.style.display = 'block';
	}
	if (value.value !== '') {
		labelValue.style.display = 'none';
	} else {
		labelValue.style.display = 'block';
	}
}
form.addEventListener('change', formStyle);

// this function is to get the value from the inputs and save it as a obj then put it in array
function addAmountToList() {
	let obj = {
		id: Date(),
		state: select.value,
		desc: desc.value,
		value: value.value
	};
	data.push(obj);

	displayItem();
	desc.value = '';
	value.value = '';
	formStyle();
}
document.getElementById('check').addEventListener('click', addAmountToList);
//----------------------

function displayItem() {
	const incomeList = document.getElementById('incomeList');
	const expensesList = document.getElementById('expensesList');
	incomeList.innerHTML = '<li>INCOME</li>';
	expensesList.innerHTML = '<li>EXPENSES</li>';

	if (data.length === 0) {
		updateAmount();
	}
	data.map((item) => {
		if (item.state === 'Income' && item.desc !== '' && isNaN(item.desc) && item.value !== '' && item.value > 0) {
			incomeList.innerHTML += `
			<li class='itemList' id='${item.id}'><p class='incomeListDesc'>${item.desc}</p><p class="incomeListValue">${item.value}</p><button class='incomeListButton' onclick="removeItem(event)">X</button></li>
			`;
		} else if (
			item.state === 'Expenses' &&
			item.desc !== '' &&
			isNaN(item.desc) &&
			item.value !== '' &&
			item.value > 0
		) {
			expensesList.innerHTML += `
			<li class='itemList' id='${item.id}'><p class="expensesListDesc">${item.desc}</p><p class="expensesListValue">${item.value *
				-1}</p><button class='expensesListButton' onclick="removeItem(event)">X</button></li>
			`;
		}
		updateAmount();
	});
}

function updateAmount() {
	const amount = document.getElementById('amount');
	const income = document.getElementById('income');
	const expenses = document.getElementById('expenses');

	const incomeListValue = document.querySelectorAll('.incomeListValue');
	const expensesListValue = document.querySelectorAll('.expensesListValue');
	let incomeAmount = 0;
	let expensesAmount = 0;

	for (i = 0; i < incomeListValue.length; i++) {
		incomeAmount += incomeListValue[i].innerHTML * 1;
	}
	for (i = 0; i < expensesListValue.length; i++) {
		expensesAmount += expensesListValue[i].innerHTML * 1;
	}
	income.innerHTML = '+ ' + incomeAmount.toFixed(2);
	expenses.innerHTML = expensesAmount.toFixed(2);
	amount.innerHTML = (incomeAmount + expensesAmount).toFixed(2) + ' €';
}
//----------------------

function removeItem(event) {
	let index = data.findIndex((item) => item.id === event.target.parentElement.id);

	data.splice(index, 1);
	displayItem();
}
