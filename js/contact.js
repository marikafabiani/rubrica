async function InitContact() {
    let url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const data = await contactApiService.getById(id);
    setInformation(data) 
}

function setInformation (data) {
    const contact = data;
    const contact_name_surname = document.querySelector("body > div > main > div.contact__info > h1");
    const name = contact.name;
    const surname = contact.surname;
    contact_name_surname.innerText = name + " " + surname;

    const contact_job = document.querySelector("body > div > main > div.contact__info > h3");
    const job = contact.job;
    contact_job.innerText = job;

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

    const contact_hobbies = document.querySelector("body > div > section > ul");
    const hobbies = contact.hobbies;
    for (const hobby of hobbies) {
        const item = document.createElement("li");
        const icon = document.createElement("i");
        icon.setAttribute("class", hobby["icon"]);
        const text = document.createTextNode(hobby["hobby"]);
        item.appendChild(icon);
        item.appendChild(text);
        contact_hobbies.appendChild(item);
    }

    const contact_color = document.querySelector ("body > div > section > svg > rect");
    const color = contact.color;
    console.log(color)
    contact_color.setAttribute("style", `fill: ${color}`);
}


