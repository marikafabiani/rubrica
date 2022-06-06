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

 // const response = await fetch("http://localhost:3000/contacts");
// const data = await response.json();
// let trash = document.q("i");
// trash.setAttribute("class","trash")
// console.log(table);
// if(trash) {
//   console.log(trash[0])
// trash[0].addEventListener("click", console.log("clicked"))

function deletePerson() {
  document.addEventListener('click',function(event){
    if (event.target.classList.contains('fa-trash')){
      let row = event.target.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
   })
}

deletePerson()


