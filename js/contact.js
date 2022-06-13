async function initContact() {
  let url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const data = await contactApiService.getById(id);
  insertInformationToContact(data);
  modifyInformationOfContact(id, data);
}

// * Inserimento dati all'interno di contact.html
/*function fillInfo({ obj, keysToSkip, prefix: selectorPrefix }) {
  Object.entries(obj).forEach(([key, value]) => {
    if(keysToSkip.includes(key)) {
      return;
    }
    if(typeof value === 'string' || typeof value === 'number') {
      const el = document.querySelector(`#${ selectorPrefix }_${ key }`);
      el.value = value; // "2022-06-13T00:00.000Z"
    }
    if(typeof value === 'object' && Array.isArray(value)) {
      // createMultipleInput(key, value);
    }
  });
}*/
// fillInfo({ obj: contact, keysToSkip: ['name', 'surname'], prefix: 'contact-info' });

// Object.keys(contact); // [id, name, surname,...]
// Object.values(contact); // [1, "Daniel", "Zotti",...]
// Object.entries(contact); // [ [id, 1], [name, "Daniel"], ...  ]

function insertInformationToContact(contact) {
  // NAME SURNAME
  const contactFullname = document.querySelector('#contact-info_fullname');
  contactFullname.innerText = contact.name + ' ' + contact.surname; // TODO: check empty name or surname

  const editContactName = document.querySelector('#contact-edit_name');
  editContactName.value = contact.name;
  const editContactSurname = document.querySelector('#contact-edit_surname');
  editContactSurname.value = contact.surname;

  // JOB
  const contactJob = document.querySelector('#contact-info_job');
  contactJob.innerText = contact.job;

  const editContactJob = document.querySelector('#contact-edit_job');
  editContactJob.value = contact.job;

  // IMAGE
  const contactImage = document.querySelector('#contact-info_image');
  if(contact.image) {
    contactImage.setAttribute('src', contact.image);
    contactImage.setAttribute('alt', 'foto ' + name);
  } else {
    // TODO: eliminare il tag img
  }

  const editContactImage = document.querySelector('#contact-edit_image');
  editContactImage.value = contact.image;

  // CONTACT LIST
  const contactList = document.querySelector('#contact-info_contact-list');
  const editContactList = document.querySelector('#contact-edit_contact-list');
  for(const key in contact.info) {
    // info
    const listItem = document.createElement('li');
    const listItemValue = document.createTextNode(`${ key }: ${ contact.info[key] }`);
    listItem.appendChild(listItemValue);
    contactList.appendChild(listItem);
    // edit
    let value = contact.info[key];
    let inputType = 'text';
    switch(key) {
      case 'birthday':
        inputType = 'date';
        value = value.split('/').reverse().join('-');
        break;
      case 'phone':
        inputType = 'tel';
        break;
      case 'email':
        inputType = 'email';
        break;
    }
    const contactListInputItem = document.createElement('input');
    contactListInputItem.setAttribute('type', inputType);
    contactListInputItem.value = value;
    editContactList.appendChild(contactListInputItem);
  }
  /*const input_birthday = document.querySelector('#setContact > div:nth-child(3) > div:nth-child(1) > input[type=date]');
  const date = info.birthday;
  const newdate = date.split('/').reverse().join('-');
  input_birthday.value = newdate;
  const input_address = document.querySelector('#setContact > div:nth-child(3) > div:nth-child(2) > input[type=text]');
  const address = info.address;
  input_address.value = address;
  const input_phone = document.querySelector('#setContact > div:nth-child(3) > div:nth-child(3) > input[type=tel]');
  const phone = info.phone;
  input_phone.value = phone;
  const input_email = document.querySelector('#setContact > div:nth-child(3) > div:nth-child(4) > input[type=email]');
  const email = info.email;
  input_email.value = email;*/


  const contact_hobbies = document.querySelector('body > div > section > ul');
  const input_hobbies = document.querySelector('#setContact > div:nth-child(4) > div:nth-child(2) > input[type=text]');
  const hobbies = contact.hobbies;
  for(const hobby of hobbies) {
    const item = document.createElement('li');
    const icon = document.createElement('i');
    icon.setAttribute('class', hobby['icon']);
    let text = document.createTextNode(hobby['hobby']);
    item.appendChild(icon);
    item.appendChild(text);
    contact_hobbies.appendChild(item);
    input_hobbies.value += hobby['hobby'] + ', ';
  }

  const contact_color = document.querySelector('body > div > section > svg > rect');
  const input_color = document.querySelector('#setContact > div:nth-child(4) > div:nth-child(3) > input[type=color]');
  const color = contact.color;
  contact_color.setAttribute('style', `fill: ${ color }`);
  input_color.value = color;
}

// * Modifica dei dati di contact.html

async function modifyInformationOfContact(id, data) {
  const contact = data;
  console.log(Object.keys(contact));
  const buttonEdit = document.querySelector('#contact_edit');
  buttonEdit.addEventListener('click', function() {
    const view = document.querySelector('.container-view').style.display = 'none';
    const setting = document.querySelector('#setting').style.display = 'block';
  });
  const buttonUndo = document.querySelector('#contact_undo');
  buttonUndo.addEventListener('click', function() {
    const view = document.querySelector('.container-view').style.display = 'grid';
    const setting = document.querySelector('#setting').style.display = 'none';
  });
  const buttonSave = document.querySelector('#contact_save');
  buttonSave.addEventListener('click', function(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('input');
    for(const input of inputs) {
      // console.log(input.value)
    }
  });

  // modifyInformationOfContact()

  // const modifiedData = await contactApiService.edit(id, data)
  // const contact_name_surname = document.querySelector("body > div > main > div.contact__info > h1");
  // const name = modifiedData.name;
  // contact_name_surname.innerText = name;
};
