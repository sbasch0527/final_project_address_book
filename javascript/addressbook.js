const getAddressBook = () => {

	const AddressBook = {
		contacts: [],
		addToBook: (contact) => {
			AddressBook.contacts.push(contact);
			console.log('adding: ',contact);
			return AddressBook.contacts;	
		},
		removeFromBook: (idx) => {
			//console.log('contacts filter: ',AddressBook.contacts.filter(contact));
			//AddressBook.contacts = AddressBook.contacts.filter((currentItem) => {
				//return currentItem !== contact;
			//});
			AddressBook.contacts.splice(parseInt(idx),1);
			console.log('removing: ',AddressBook.displayBook());
			return AddressBook.contacts;
		},
		editBook: (item,price,idx) => {
			console.log('editList - before editing: ',AddressBook.displayBook());
			AddressBook.contacts[idx] = item; 
			console.log('editList - after editing: ',AddressBook.displayBook());
			return AddressBook.contacts;
		},
		displayBook: () => {
			let str = '';
			for (let i = 0; i < AddressBook.contacts.length; i++) {
				str += (i+1) + '. ' + AddressBook.contacts[i] + '\n';
			}
			return str;
		},
		countItemsInList: () => {
			return AddressBook.contacts.length;
		}
	};	

	return AddressBook;

};

// create empty shopping list
const myAddressBook = getAddressBook();

/*const addressInputs = [
	{fname: "Shari",
	 lname: "Basch",
	 street: "2717 Susquehanna Road",
	 street2: "",
	 city: "Abington",
	 state: "PA",
	 zip: "19001"},
	{fname: "Bruce",
	 lname: "Basch",
	 street: "605 Sioux Ave",
	 street2: "",
	 city: "Huntingdon Valley",
	 state: "PA",
	 zip: "19006"},
	{fname: "Heather",
	 lname: "Smith",
	 street: "123 Louise Lane",
	 street2: "",
	 city: "Wyndmoor",
	 state: "PA",
	 zip: "19038"}
];

onsole.log('myAddressBook: ',myAddressBook);

myAddressBook.addToList(addressInputs[0]);
myAddressBook.addToList(addressInputs[1]);
myAddressBook.addToList(addressInputs[2]);*/

const lastNameA_D = ['A','B','C','D'];
const lastNameE_H = ['E','F','G','H'];
const lastNameI_L = ['I','J','K','L'];
const lastNameM_P = ['M','N','O','P'];
const lastNameQ_T = ['Q','R','S','T'];
const lastNameU_Z = ['U','V','W','X','Y','Z'];

// we use the render function to ALWAYS draw an
// accurate depiction of the AddressBook for the user
const render = (addressBook) => {
	let strA_D = strE_H = strI_L = strM_P = strQ_T = strU_Z = last_tab = '';
	const containerA_D = document.querySelector('#a_d');
	const containerE_H = document.querySelector('#e_h');
	const containerI_L = document.querySelector('#i_l');
	const containerM_P = document.querySelector('#m_p');
	const containerQ_T = document.querySelector('#q_t');
	const containerU_Z = document.querySelector('#u_z');
	let strTemplate = containerA_D.innerHTML = containerE_H.innerHTML = containerI_L.innerHTML = containerM_P.innerHTML = containerQ_T.innerHTML = containerU_Z.innerHTML = '';

	for (let i = 0; i < addressBook.countItemsInList(); i++) {
		strTemplate = `<li style="margin-bottom:20px;line-height:36px;background-color:#efefef; padding:10px 20px;"><span class="js-address-book-contact" data-idx="${i}">${addressBook.contacts[i].fname} ${addressBook.contacts[i].lname}<br>${addressBook.contacts[i].street}, ${addressBook.contacts[i].street2}<br>${addressBook.contacts[i].city}, ${addressBook.contacts[i].state} ${addressBook.contacts[i].zip}</span> <span class="js-map-btn btn btn-primary" data-toggle="modal" data-target="#mapModal" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-map-marker"></i></span><span class="js-edit-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-pencil"></i></span><span class="js-delete-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-remove"></i></span></li>`;
		if (lastNameA_D.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strA_D += strTemplate;
			container = containerA_D;
		} else if (lastNameE_H.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strE_H += strTemplate;
			container = containerE_H;
		} else if (lastNameI_L.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strI_L += strTemplate;
			container = containerI_L;
		} else if (lastNameM_P.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strM_P += strTemplate;
			container = containerM_P;
		} else if (lastNameQ_T.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strQ_T += strTemplate;
			container = containerQ_T;
		} else {
			strU_Z += strTemplate;
			container = containerU_Z;
		}
		containerA_D.innerHTML = `<ol>${strA_D}</ol>`;
		containerE_H.innerHTML = `<ol>${strE_H}</ol>`;
		containerI_L.innerHTML = `<ol>${strI_L}</ol>`;
		containerM_P.innerHTML = `<ol>${strM_P}</ol>`;
		containerQ_T.innerHTML = `<ol>${strQ_T}</ol>`;
		containerU_Z.innerHTML = `<ol>${strU_Z}</ol>`;

		//container.addClass('active');
		//container.addClass('show');
	}
}

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}

const onAddToBookClicked = (evt) => {
	// BUTTON equivalent to ENTER when adding items
	let contactObj = {fname: '',lname: '',street: '',street2: '',city: '',state: '',zip: ''};

	contactObj.fname = document.querySelector('.fname').value;
	contactObj.lname = document.querySelector('.lname').value;
	contactObj.street = document.querySelector('.street').value;
	contactObj.street2 = document.querySelector('.street2').value;
	contactObj.city = document.querySelector('.city').value;
	contactObj.state = document.querySelector('.state').value;
	contactObj.zip = document.querySelector('.zip').value;

	myAddressBook.addToBook(contactObj);
	render(myAddressBook);	

	document.querySelectorAll('.js-address-book-field').forEach(function(element) {
		element.value='';
	});
	document.querySelector('.fname').focus();

	return true;

}

const editItem = (itemContainer,priceContainer,idx) => {
	itemContainer.innerHTML = `<input type="text" class="js-edit-text" value="${itemContainer.innerHTML}" data-idx="${idx}" /> `;
	priceContainer.innerHTML = `<input type="text" class="js-edit-price" value="${priceContainer.innerHTML.substr(1,priceContainer.innerHTML.length)}" data-idx="${idx}" /><br /><i>Hit ENTER when done updating both fields</i>`	
}

const onEnterKeyPressed = (evt) => {

	if (evt.keyCode === 13) {
		if (evt.target.matches('.js-edit-text') || evt.target.matches('.js-edit-price')) {
			//EDIT PRICE
			const editedItem = document.querySelector('.js-edit-text');
			const editedPrice = document.querySelector('.js-edit-price');

			if (editedItem.value != '' && editedItem.value.length >= 3 && editedPrice.value != '' && isNaN(editedPrice.value) === false) {
				//make sure both fields are not empty before saving edits
				const idxEdited = evt.target.getAttribute('data-idx');
				//pass in editedPrice without initial dollar sign
				console.log('passing in: ',editedPrice.value);
				myShoppingList.editList(editedItem.value,editedPrice.value,idxEdited);
				render(shoppingListCont,myShoppingList);					
			} else {
				evt.target.value = "Please enter a valid item.";
				return false;
			}
		} else if (evt.target.matches('.js-shopping-list-item-price')) {
			//ADDING
			if (evt.target.value === '') {
				evt.target.value = "Please enter a price";
				return false;
			}
			//read the "Price" input field to add to list
			priceValue = parseFloat(evt.target.value);
			itemValue = shoppingListInput.value;

			if (priceValue >= 0.00) {
				//make sure price is valid
				if (itemValue != '' && itemValue.length >= 3) {
					//make sure item  has already been entered before adding to list
					myShoppingList.addToList(itemValue,priceValue);
					render(shoppingListCont, myShoppingList);
					//clear out input & place focus back on item text field
					shoppingListInput.value = '';
					shoppingListPrice.value = '';
					shoppingListInput.focus();
				} else {
					//need user to enter item
					shoppingListInput.value = 'Please enter a valid item';
					shoppingListInput.focus();
				}
			} else {
				//invalid price format
				shoppingListPrice.value = "Enter a valid price";
				shoppingListPrice.focus();
				return;
			}

		} else {
			//Else text field is item, ADDING
			if (evt.target.value === '' || evt.target.value.length < 3) {
				evt.target.value = "Please enter a valid item";
				return false;
			}
			// read the "Item to add" and "Price" input fields to add to list
			itemValue = evt.target.value;
			priceValue = shoppingListPrice.value;

			// make sure price is entered and a number
			if (priceValue != '' && parseFloat(priceValue) != 'NaN') {
				myShoppingList.addToList(itemValue,priceValue);
				render(shoppingListCont, myShoppingList);
				//clear out input & place focus back on item text field
				shoppingListInput.value = '';
				shoppingListPrice.value = '';
				shoppingListInput.focus();
			} else {
				//need user to enter price
				shoppingListPrice.value = "Please enter a price";
				shoppingListPrice.focus();
			}
		}
	}
} // keypress handler

const onContainerClicked = (evt) => {
	console.log(evt);
	console.log('container clicked: ', evt.target.parentNode.firstChild);
	if (evt.target.matches('.js-delete-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		myAddressBook.removeFromBook(idx);
		render(myAddressBook);
	} else if (evt.target.matches('.glyphicon-remove')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		myAddressBook.removeFromBook(idx);
		render(myAddressBook);
	} else if (evt.target.matches('.js-edit-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		editItem(itemContainer,idx);
		evt.target.style.display = "none";
	} else if (evt.target.matches('.glyphicon-pencil')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		editItem(itemContainer,idx);
		evt.target.parentNode.style.display = "none";
	}

}


// INIT VARIABLES
const addToBook = document.querySelector('.js-add-to-book');
const tabbedContent = document.querySelector('.tab-content');
	
// EVENT HANDLERS
addToBook.addEventListener('click', onAddToBookClicked);
document.addEventListener('keypress',onEnterKeyPressed);
tabbedContent.addEventListener('click',onContainerClicked);

//render(document.querySelector('.js-address-book-container'),myAddressBook);
render(myAddressBook);