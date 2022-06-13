// Oggetto base:
// obj = {
//   contactList: [],
//   addListener: true
// }

// Modalità 1:
// const { contactList, addListener } = obj;

// Modalità 2:
// const contactList = obj.contactList;
// const addListener = obj.addListener;

function addTableRows(contactList) {
  const tbody = document.querySelector('#contacts-rows-container');

  for(const contact of contactList) {
    tbody.innerHTML += `
            <tr class="table__stripes"> 
                <td class="table__id row_id" id="contact_${ contact.id }"}>
                  <a class="table__a" href="/views/contact.html?id=${ contact.id }"> ${ contact.id } </a>
                </td>
                <td class="row_name"> ${ contact.name } </td>
                <td class="row_surname"> ${ contact.surname } </td>
                <td class="row_delete"><button class="btn-transparent"><i class="fa fa-trash"></i></button></td>
            </tr>
        `;
  }
}


function addDeleteContactListener() {
  const deleteButtons = document.querySelectorAll('.row_delete button');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      let row = event.target.parentNode.parentNode;
      const id = row.querySelector('.row_id').getAttribute('id');
      const contactId = id.split('_')[1];

      try {
        await contactApiService.delete(contactId);
        row.parentNode.removeChild(row);
      } catch(ex) {
        console.error(ex);
      }
    });
  });
}

async function initTable() {
  // 1. prendere i dati json
  const contactList = await contactApiService.getAll();
  // 2. aggiungere una riga per persona
  addTableRows(contactList);
  // 3. aggiungere il listener per il tasto delete
  addDeleteContactListener();
}

function initAddContactListener() {
  document.querySelector('#form-contact-add').addEventListener('submit', async function(event) {
    event.preventDefault(); // l'evento non si verifica
    const allFormControls = Array.from(event.target.elements);
    const formControls = allFormControls.filter(c => !!c.getAttribute('name'));

    // formControls => [
    // { name: "name", value: "Daniel" },     => ACC: {},                                       RESULT: { name: "Daniel" }
    // { name: "surname", value: "Zotti" },   => ACC: { name: "Daniel"},                        RESULT: { name: "Daniel", surname: "Zotti" }
    // { name: "age", value: "35" },          => ACC: { name: "Daniel", surname: "Zotti"},      RESULT: { name: "Daniel", surname: "Zotti", age: "35" }
    // ]
    const newContact = formControls.reduce((acc, item) => ({
      ...acc,
      [item.name]: item.type === 'number' ? +item.value : item.value
    }), {});

    const newContactSaved = await contactApiService.add(newContact);

    if(!newContactSaved) {
      return;
    }
    addTableRows([newContactSaved]);

    addDeleteContactListener();
  });
}
