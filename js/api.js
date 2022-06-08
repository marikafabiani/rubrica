const baseUrl = 'http://localhost:3000/contacts';

async function getContactList() {
  try {
    const response = await fetch(baseUrl);
    return response.json();
  } catch(ex) {
    alert('Error on retrieving contact list');
    console.error('Error on getContacts: ', ex);
    return [];
  }
}

async function getFilteredContactListBySurname(surname) {
  try {
    const response = await fetch(`${ baseUrl }?surname_like=${ surname }`);
    return response.json();
  } catch(ex) {
    alert('Error on retrieving contact list');
    console.error('Error on filterContactsBySurname: ', ex);
    return [];
  }
}


async function deleteContact(id) {
  const res = await fetch(`${ baseUrl }/${ id }`, {
    header: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  if(!res.ok) {
    alert(`Error on deleting contact ID = ${ id }`);
    console.error('Error on deleteContact', id);
    throw Error('Error on deleteContact');
  }
}

async function addContactToList(data) {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  } catch(ex) {
    alert('Error on adding contact to contact list');
    console.error('Error on addContact: ', ex);
    return [];
  }
}