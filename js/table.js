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
      let row = event.target.parentNode.parentNode;
      const id = row.querySelector('.table__id').getAttribute('id');
      const contactId = id.split('_')[1];

      try {
        console.log({ row });
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
