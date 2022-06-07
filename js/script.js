async function createTable(url, table) {
    const response = await fetch(url);
    const data = await response.json();
    let tbody = document.querySelector("tbody");

    for (const element of data) {
        tbody.innerHTML += `
            <tr class="table__stripes"> 
                <td class="table__id" id="${element.id}"}><a class="table__a" href="/contacts/${element.page}"> ${element.id} </a></td>
                <td> ${element.name} </td>
                <td> ${element.surname} </td>
                <td><i class="fa fa-trash"></i></td>
            </tr>
        `;
    }
}
createTable("http://localhost:3000/contacts", document.getElementsByClassName("table"))

let deleteItem = async id => {
    try {
      let res = await fetch(`http://localhost:3000/contacts/${id}`, {
        header: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href("http://localhost:8081/");
      } else {
        throw new Error("Sorry. Couldn't delete.");
      }
    } catch (err) {
      console.error(err);
    }
};

function deletePerson() {
  document.addEventListener('click',function(event){
    if (event.target.classList.contains('fa-trash')){
      let row = event.target.parentNode.parentNode;
      console.log(row);
      row.parentNode.removeChild(row);
      let id = row.getElementsByClassName("table__id")[0].id;
      deleteItem(id)
    }
   })
}

deletePerson()


