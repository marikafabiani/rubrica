function addTableRows(contactList) {

  const tbody = document.querySelector('#contacts-rows-container');

  for(const contact of contactList) {
    tbody.innerHTML += `
            <tr class="table__stripes"> 
                <td class="table__id row_id" id="contact_${ contact.id }"}>
                  <a class="table__a" href="/contacts/${ contact.page }"> ${ contact.id } </a>
                </td>
                <td class="row_name"> ${ contact.name } </td>
                <td class="row_surname"> ${ contact.surname } </td>
                <td class="row_delete"><i class="fa fa-trash"></i></td>
            </tr>
        `;
  }
}


function addDeleteContactListener() {
  const deleteButtons = document.querySelectorAll('.row_delete i');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      console.log(event);
      let row = event.target.parentNode.parentNode;
      const id = row.querySelector('.table__id').getAttribute('id');
      const contactId = id.split('_')[1];

      try {
        // console.log({ row });
        await deleteContact(contactId);
        row.parentNode.removeChild(row);
      } catch(ex) {
        console.error(ex);
      }
    });
  });

}

async function initTable() {
  // 1. prendere i dati json
  const contactList = await getContactList();
  // 2. aggiungere una riga per persona
  addTableRows(contactList);
  // 3. aggiungere il listener per il tasto delete
  addDeleteContactListener();
}

function addContact() {
  document.querySelector("#add_button").addEventListener("click", async function(event){
    event.preventDefault();
    const lastRow = document.querySelector('#contacts-rows-container').rows.length+1;
    // console.log(lastRow);
    let contact_id = lastRow+1;
    let contact_name = document.querySelector("#add_name").value;
    let contact_surname = document.querySelector("#add_surname").value;
    let newContact = {"id": `${contact_id}`, "name": `${contact_name}`, "surname": `${contact_surname}`};
    addContactToList(newContact);
    const tbody = document.querySelector('#contacts-rows-container');
    tbody.innerHTML += `
      <tr class="table__stripes"> 
        <td class="table__id row_id" id="contact_${ contact_id }"}>
            <a class="table__a" href="/contacts/#"> ${ contact_id } </a>
        </td>
        <td class="row_name"> ${ contact_name } </td>
        <td class="row_surname"> ${ contact_surname } </td>
        <td class="row_delete"><i class="fa fa-trash"></i></td>
      </tr>`;
    
  });
};