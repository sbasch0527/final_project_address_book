const getAddressBook = () => {

	const AddressBook = {
		contacts: [],
		addToBook: (contact) => {
			AddressBook.contacts.push(contact);
			console.log('adding: ',contact);
			console.log(AddressBook.displayBook());
			return AddressBook.contacts;	
		},
		removeFromBook: (idx) => {
			AddressBook.contacts.splice(parseInt(idx),1);
			console.log('removing: ',AddressBook.displayBook());
			return AddressBook.contacts;
		},
		editBook: (item,idx) => {
			//console.log('editList - before editing: ',AddressBook.displayBook());
			AddressBook.contacts[idx] = item; 
			//console.log('editList - after editing: ',AddressBook.displayBook());
			return AddressBook.contacts;
		},
		displayBook: () => {
			let str = '';
			for (let i = 0; i < AddressBook.contacts.length; i++) {
				str += (i+1) + '. ' + AddressBook.contacts[i].lname + '\n';
			}
			return str;
		},
		countItemsInList: () => {
			return AddressBook.contacts.length;
		}
	};	

	return AddressBook;

};

// create empty Address Book
const myAddressBook = getAddressBook();

// master array to indicate which letters belong in which tab
const lastNameA_D = ['A','B','C','D'];
const lastNameE_H = ['E','F','G','H'];
const lastNameI_L = ['I','J','K','L'];
const lastNameM_P = ['M','N','O','P'];
const lastNameQ_T = ['Q','R','S','T'];
const lastNameU_Z = ['U','V','W','X','Y','Z'];

const numbers = /^[0-9]+$/;


// Output Address book
// Contact will be placed in corresponding tab based on first letter of last name
const render = (addressBook,action) => {
	let strA_D = strE_H = strI_L = strM_P = strQ_T = strU_Z = last_tab = '';
	const containerA_D = document.querySelector('#a_d');
	const containerE_H = document.querySelector('#e_h');
	const containerI_L = document.querySelector('#i_l');
	const containerM_P = document.querySelector('#m_p');
	const containerQ_T = document.querySelector('#q_t');
	const containerU_Z = document.querySelector('#u_z');
	let strTemplate = containerA_D.innerHTML = containerE_H.innerHTML = containerI_L.innerHTML = containerM_P.innerHTML = containerQ_T.innerHTML = containerU_Z.innerHTML = '';
	const navLinks = document.querySelectorAll('.nav-link');
	let curLink = '';

	//Go through each contact and place in string based on book tab
	for (let i = 0; i < addressBook.countItemsInList(); i++) {

		strTemplate = `<li style="margin-bottom:20px;line-height:36px;background-color:#efefef; padding:10px 20px;"><span class="js-address-book-contact js-address-book-fname" data-idx="${i}">${addressBook.contacts[i].fname}</span> <span class="js-address-book-contact js-address-book-lname" data-idx="${i}">${addressBook.contacts[i].lname}</span>`;
		if (addressBook.contacts[i].street != '') {
			strTemplate += `<br><span class="js-address-book-contact js-address-book-street" data-idx="${i}">${addressBook.contacts[i].street}</span>`;
		} else {
			strTemplate += `<span class="js-address-book-contact js-address-book-street" data-idx="${i}"></span>`;
		}
		if (addressBook.contacts[i].street2 != '') {
			strTemplate += `, <span class="js-address-book-contact js-address-book-street2" data-idx="${i}">${addressBook.contacts[i].street2}</span>`;
		} else {
			strTemplate += `<span class="js-address-book-contact js-address-book-street2" data-idx="${i}"></span>`;
		}
		if (addressBook.contacts[i].city != '') {
			strTemplate += `<br><span class="js-address-book-contact js-address-book-city" data-idx="${i}">${addressBook.contacts[i].city}</span>`;
		} else {
			strTemplate += `<span class="js-address-book-contact js-address-book-city" data-idx="${i}"></span>`;
		}
		if (addressBook.contacts[i].state != '') {
			strTemplate += `, <span class="js-address-book-contact js-address-book-state" data-idx="${i}">${addressBook.contacts[i].state}</span>`;	
		} else {
			strTemplate += `<span class="js-address-book-contact js-address-book-state" data-idx="${i}"></span>`;
		}
		if (addressBook.contacts[i].zip != '') {
			strTemplate += ` <span class="js-address-book-contact js-address-book-zip" data-idx="${i}">${addressBook.contacts[i].zip}</span>`;
		} else {
			strTemplate += `<span class="js-address-book-contact js-address-book-zip" data-idx="${i}"></span>`;
		}
		strTemplate += `</span> <span class="js-map-btn btn btn-primary" data-toggle="modal" data-target="#mapModal" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-map-marker"></i></span><span class="js-edit-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-pencil"></i></span><span class="js-delete-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-remove"></i></span></li>`;

		if (lastNameA_D.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strA_D += strTemplate;
			container = containerA_D;
			curLink = navLinks[0];
		} else if (lastNameE_H.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strE_H += strTemplate;
			container = containerE_H;
			curLink = navLinks[1];
		} else if (lastNameI_L.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strI_L += strTemplate;
			container = containerI_L;
			curLink = navLinks[2];
		} else if (lastNameM_P.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strM_P += strTemplate;
			container = containerM_P;
			curLink = navLinks[3];
		} else if (lastNameQ_T.indexOf(addressBook.contacts[i].lname[0]) >= 0) {
			strQ_T += strTemplate;
			container = containerQ_T;
			curLink = navLinks[4];
		} else {
			strU_Z += strTemplate;
			container = containerU_Z;
			curLink = navLinks[5];
		}
		containerA_D.innerHTML = `<ol>${strA_D}</ol>`;
		containerE_H.innerHTML = `<ol>${strE_H}</ol>`;
		containerI_L.innerHTML = `<ol>${strI_L}</ol>`;
		containerM_P.innerHTML = `<ol>${strM_P}</ol>`;
		containerQ_T.innerHTML = `<ol>${strQ_T}</ol>`;
		containerU_Z.innerHTML = `<ol>${strU_Z}</ol>`;
		
		setTimeout(function() { if (action != 'edit') { curLink.click(); } }, 1000);
		
	}
}

const onAddToBookClicked = (evt) => {
	let contactObj = {fname: '',lname: '',street: '',street2: '',city: '',state: '',zip: ''};

	contactObj.fname = document.querySelector('.fname').value;
	contactObj.lname = document.querySelector('.lname').value;
	contactObj.street = document.querySelector('.street').value;
	contactObj.street2 = document.querySelector('.street2').value;
	contactObj.city = document.querySelector('.city').value;
	contactObj.state = document.querySelector('.state').value;
	contactObj.zip = document.querySelector('.zip').value;

	if (contactObj.fname == '') {
		document.querySelector('.fname').value = "Please enter a first name..."
		return false;
	}
	if (contactObj.lname == '') {
		document.querySelector('.lname').value = "Please enter a last name..."
		return false;
	}
	if ((!document.querySelector('.zip').value.match(numbers) || document.querySelector('.zip').value.length < 5) && document.querySelector('.zip').value != '') {
		document.querySelector('.zip').value = "Please enter a valid zip code..."
		return false;
	}
	myAddressBook.addToBook(contactObj);
	render(myAddressBook,'add');	

	document.querySelectorAll('.js-address-book-field').forEach(function(element) {
		element.value='';
	});
	document.querySelector('.fname').focus();

	return true;

}


const editItem = (evt,idx) => {
	console.log("editItem: ", evt.target.parentNode.parentNode.children[0]);
	const idxValue = parseInt(idx);

	const fNameContainer = evt.target.parentNode.parentNode.children[0];
	const lNameContainer = evt.target.parentNode.parentNode.children[1];
	const streetContainer = evt.target.parentNode.parentNode.children[3];
	const street2Container = evt.target.parentNode.parentNode.children[4];
	const cityContainer = evt.target.parentNode.parentNode.children[5];
	const stateContainer = evt.target.parentNode.parentNode.children[6];
	const zipContainer = evt.target.parentNode.parentNode.children[7];
	//console.log(evt.target.parentNode.parentNode.children[0]);

	let fNameValue = lNameValue = streetValue = street2Value = cityValue = stateValue = zipValue = '';
	fNameValue = fNameContainer.innerHTML;
	lNameValue = lNameContainer.innerHTML;
	console.log('editItem, lNameValue: ',lNameValue);

	fNameContainer.innerHTML = lNameContainer.innerHTML = '';

	fNameContainer.innerHTML = `<i style="color:red;">Press ENTER when edits are completed.</i><br><input type="text" class="js-edit-text edit-fname" value="${fNameValue}" data-idx="${idx}" /> `;
	lNameContainer.innerHTML = `<input type="text" class="js-edit-text edit-lname" value="${lNameValue}" data-idx="${idx}" /> `;
	if (streetContainer != null) {
		streetValue = streetContainer.innerHTML;
		streetContainer.innerHTML = '';
		streetContainer.innerHTML = `<br><input type="text" class="js-edit-text edit-street" value="${streetValue}" data-idx="${idx}" /> `;
	}
	if (street2Container != null) {
		street2Value = street2Container.innerHTML;
		street2Container.innerHTML = '';
		street2Container.innerHTML = ` <input type="text" class="js-edit-text edit-street2" value="${street2Value}" data-idx="${idx}" /> `;
	}
	if (cityContainer != null) {
		cityValue = cityContainer.innerHTML;
		cityContainer.innerHTML = '';
		cityContainer.innerHTML = `<br><input type="text" class="js-edit-text edit-city" value="${cityValue}" data-idx="${idx}" /> `;
	}
	if (stateContainer != null) {
		stateValue = stateContainer.innerHTML;
		stateContainer.innerHTML = '';
		stateContainer.innerHTML = ` <select class="js-form-control js-edit-text edit-state" data-idx="${idx}" >
            <option value="">State...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
        </select> `;
    	document.querySelector('.edit-state').value = stateValue;	
	}
	if (zipContainer != null) {
		zipValue = zipContainer.innerHTML;
		zipContainer.innerHTML = ` <input type="text" class="js-edit-text edit-zip" value="${zipValue}" data-idx="${idx}" /> `;
	}
}

const onEnterKeyPressed = (evt) => {

	if (evt.keyCode === 13) {
		if (evt.target.matches('.js-edit-text')) {
			//Edited text
			const editedFname = document.querySelector('.edit-fname');
			const editedLname = document.querySelector('.edit-lname');
			const editedStreet = document.querySelector('.edit-street');
			const editedStreet2 = document.querySelector('.edit-street2');
			const editedCity = document.querySelector('.edit-city');
			const editedState = document.querySelector('.edit-state');
			const editedZip = document.querySelector('.edit-zip');
			let contactObj = {fname: '',lname: '',street: '',street2: '',city: '',state: '',zip: ''};

			if (editedFname.value == '') {
				editedFName.value = "Please enter a first name"
				return false;
			}
			if (editedLname.value == '') {
				editedLname.value = "Please enter a last name"
				return false;
			}
			const idxEdited = evt.target.getAttribute('data-idx');
			contactObj.fname = editedFname.value;
			contactObj.lname = editedLname.value;
			if (editedStreet != null) {
				contactObj.street = editedStreet.value;
			}
			if (editedStreet2 != null) {
				contactObj.street2 = editedStreet2.value;
			}
			if (editedCity != null) {
				contactObj.city = editedCity.value;
			}
			if (editedState != null) {
				contactObj.state = editedState.value;
			}
			if (editedZip != null) {
				if ((!editedZip.value.match(numbers) || editedZip.value.length < 5) && editedZip.value != '') {
					editedZip.value = "Please enter a valid zip code";
					return false;
				}
				contactObj.zip = editedZip.value;
			}

			myAddressBook.editBook(contactObj,idxEdited);
			render(myAddressBook,'edit');					
			
		} else {
			//Else ADDING new contact
			let contactObj = {fname: '',lname: '',street: '',street2: '',city: '',state: '',zip: ''};

			contactObj.fname = document.querySelector('.fname').value;
			contactObj.lname = document.querySelector('.lname').value;
			contactObj.street = document.querySelector('.street').value;
			contactObj.street2 = document.querySelector('.street2').value;
			contactObj.city = document.querySelector('.city').value;
			contactObj.state = document.querySelector('.state').value;
			contactObj.zip = document.querySelector('.zip').value;

			if (contactObj.fname == '') {
				document.querySelector('.fname').value = "Please enter a first name..."
				return false;
			}
			if (contactObj.lname == '') {
				document.querySelector('.lname').value = "Please enter a last name..."
				return false;
			}
			if ((!document.querySelector('.zip').value.match(numbers) || document.querySelector('.zip').value.length < 5) && document.querySelector('.zip').value != '') {
				document.querySelector('.zip').value = "Please enter a valid zip code..."
				return false;
			}
			myAddressBook.addToBook(contactObj);
			render(myAddressBook,'add');	

			document.querySelectorAll('.js-address-book-field').forEach(function(element) {
				element.value='';
			});
			document.querySelector('.fname').focus();

			return true;
		}
	}
} // keypress handler

const onContainerClicked = (evt) => {
	//console.log(evt);
	//console.log('container clicked: ', evt.target.parentNode.firstChild);
	if (evt.target.matches('.js-delete-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		myAddressBook.removeFromBook(idx);
		render(myAddressBook,'delete');
	} else if (evt.target.matches('.glyphicon-remove')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-address-book-contact[data-idx="'+idx+'"]');
		myAddressBook.removeFromBook(idx);
		render(myAddressBook,'delete');
	} else if (evt.target.matches('.js-edit-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		console.log('editing: idx:',idx);
		editItem(evt,idx);
		evt.target.style.display = "none";
	} else if (evt.target.matches('.glyphicon-pencil')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		console.log('editing: idx:',idx);
		editItem(evt,idx);
		evt.target.parentNode.style.display = "none";
	} else if (evt.target.matches('.js-map-btn')) {
    	const address = evt.target.parentNode.children[3].innerHTML + "," + evt.target.parentNode.children[5].innerHTML + " " + evt.target.parentNode.children[6].innerHTML + " " + evt.target.parentNode.children[7].innerHTML;
		initMap(address);
		console.log('map clicked',address);
	} else if (evt.target.matches('.glyphicon-map-marker')) {
     	const address = evt.target.parentNode.parentNode.children[3].innerHTML + "," + evt.target.parentNode.parentNode.children[5].innerHTML + " " + evt.target.parentNode.parentNode.children[6].innerHTML + " " + evt.target.parentNode.parentNode.children[7].innerHTML;
		initMap(address);
		console.log('map clicked when over glyph',address);
	}

}

let geocoder = map = '';

const codeAddress = (address) => {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
      	map = new google.maps.Map(document.getElementById('map'), {
      		zoom: 15,
      		center: results[0].geometry.location
    	});
        const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        return 
      } else {
      	map = '';
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

const initMap = (address) => {
    geocoder = new google.maps.Geocoder();
    codeAddress(address);
}


// INIT VARIABLES
const addToBook = document.querySelector('.js-add-to-book');
const tabbedContent = document.querySelector('.tab-content');
	
// EVENT HANDLERS
addToBook.addEventListener('click', onAddToBookClicked);
document.addEventListener('keypress',onEnterKeyPressed);
tabbedContent.addEventListener('click',onContainerClicked);

render(myAddressBook,'init');