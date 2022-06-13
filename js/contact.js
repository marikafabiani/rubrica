async function InitContact() {
    let url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const data = await contactApiService.getById(id);
    insertInformationToContact(data)
    modifyInformationOfContact (id, data)
}

// * Inserimento dati all'interno di contact.html

function insertInformationToContact (data) {
    const contact = data;
    const contact_name_surname = document.querySelector("body > div > main > div.contact__info > h1");
    const input_name = document.querySelector("#setContact > div:nth-child(1) > div:nth-child(1) > input[type=text]");
    const input_surname = document.querySelector("#setContact > div:nth-child(1) > div:nth-child(2) > input[type=text]");
    const name = contact.name;
    const surname = contact.surname;
    contact_name_surname.innerText = name + " " + surname;
    input_name.value = name;
    input_surname.value = surname;

    const contact_job = document.querySelector("body > div > main > div.contact__info > h3");
    const input_job = document.querySelector("#setContact > div:nth-child(2) > div:nth-child(1) > input[type=text]");
    const job = contact.job;
    contact_job.innerText = job;
    input_job.value = job;

    const contact_image = document.querySelector("body > div > main > div.contact__image > img");
    const image = contact.image;
    contact_image.setAttribute("src", image);
    contact_image.setAttribute("alt", "foto " + name);

    const contact_list = document.querySelector("body > div > aside > ul");
    const info = contact.info;
    for (const key in info) {
        const item = document.createElement("li");
        const text = document.createTextNode(`${key}: ${info[key]}`);
        item.appendChild(text);
        contact_list.appendChild(item);
    }
    const input_birthday = document.querySelector("#setContact > div:nth-child(3) > div:nth-child(1) > input[type=date]");
    const date = info.birthday;
    const newdate = date.split("/").reverse().join("-");
    input_birthday.value = newdate
    const input_address = document.querySelector("#setContact > div:nth-child(3) > div:nth-child(2) > input[type=text]");
    const address = info.address;
    input_address.value = address;
    const input_phone = document.querySelector("#setContact > div:nth-child(3) > div:nth-child(3) > input[type=tel]");
    const phone = info.phone;
    input_phone.value = phone;
    const input_email = document.querySelector("#setContact > div:nth-child(3) > div:nth-child(4) > input[type=email]");
    const email = info.email;
    input_email.value = email;


    const contact_hobbies = document.querySelector("body > div > section > ul");
    const input_hobbies = document.querySelector("#setContact > div:nth-child(4) > div:nth-child(2) > input[type=text]")
    const hobbies = contact.hobbies;
    for (const hobby of hobbies) {
        const item = document.createElement("li");
        const icon = document.createElement("i");
        icon.setAttribute("class", hobby["icon"]);
        let text = document.createTextNode(hobby["hobby"]);
        item.appendChild(icon);
        item.appendChild(text);
        contact_hobbies.appendChild(item);
        input_hobbies.value += hobby["hobby"] + ", ";
    }

    const contact_color = document.querySelector ("body > div > section > svg > rect");
    const input_color = document.querySelector("#setContact > div:nth-child(4) > div:nth-child(3) > input[type=color]");
    const color = contact.color;
    contact_color.setAttribute("style", `fill: ${color}`);
    input_color.value = color;
}

// * Modifica dei dati di contact.html

async function modifyInformationOfContact (id, data) {
    const contact = data;
    console.log(Object.keys(contact))
    const buttonEdit = document.querySelector("#contact_edit");
    buttonEdit.addEventListener("click", function() {
        const view = document.querySelector(".container-view").style.display = "none";
        const setting = document.querySelector("#setting").style.display = "block";
    })
    const buttonUndo = document.querySelector("#contact_undo");
    buttonUndo.addEventListener("click", function() {
        const view = document.querySelector(".container-view").style.display = "grid";
        const setting = document.querySelector("#setting").style.display = "none";
    })
    const buttonSave = document.querySelector("#contact_save");
    buttonSave.addEventListener("click", function(event) {
        event.preventDefault();
        let inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            // console.log(input.value)
        }
    })

    // modifyInformationOfContact()
    
    // const modifiedData = await contactApiService.edit(id, data)
    // const contact_name_surname = document.querySelector("body > div > main > div.contact__info > h1");
    // const name = modifiedData.name;
    // contact_name_surname.innerText = name;
};