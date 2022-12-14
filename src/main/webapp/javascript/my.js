const RACES = ["HUMAN", "DWARF", "ELF", "GIANT", "ORC", "TROLL", "HOBBIT"];
const PROFESSIONS = ["WARRIOR", "ROGUE", "SORCERER", "CLERIC", "PALADIN", "NAZGUL", "WARLOCK", "DRUID"];
const BANNED = ["false", "true"];

getRequestForTable();

let createAccountButton = document.getElementById("createAccountButton");
createAccountButton.onclick = function () {
    createAccount();
    const formForPopup = document.querySelector('#div_for_popup');
    const popup = document.querySelector('.popup');
    formForPopup.classList.add('open');
    popup.classList.add('popup_open');
}

function createAccount() {
    let div_form = document.getElementById("div_form");

    div_form.innerHTML = `<div class="popup">
        <div class="popup__container">
            <div class="popup__wrapper">
                <div id="div_for_popup">
                    <form id="createAccountForm" onSubmit="createCharacter();return false"></form>
                </div>
            </div>
        </div>
    </div>`;

    let form = document.getElementById("createAccountForm");

    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        label.setAttribute("for", "new_name_create");
        label.innerText = "Name:";
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "new_name_create");
        input.setAttribute("class", "createForm");
        input.setAttribute("required", "");
        input.setAttribute("minLength", "1");
        input.setAttribute("maxLength", "12");
        input.setAttribute("placeholder", "From 1 to 12 symbol")
        input.oninput = () => {
            if(input.value.charAt(0) === ' ') {
                input.value = '';
            }
        }

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
        let br = document.createElement("br");
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let input = document.createElement("input");
        let br = document.createElement("br");
        label.setAttribute("for", "new_title_create");
        label.innerText = "Title:";
        input.setAttribute("type", "text");
        input.setAttribute("id", "new_title_create");
        input.setAttribute("class", "createForm");
        input.setAttribute("required", "");
        input.setAttribute("minLength", "1");
        input.setAttribute("maxLength", "30");
        input.setAttribute("placeholder", "From 1 to 30 symbol")
        input.oninput = () => {
            if(input.value.charAt(0) === ' ') {
                input.value = '';
            }
        }
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let select = document.createElement("select");
        let br = document.createElement("br");
        label.setAttribute("for", "new_race_create");
        label.innerText = "Race:";
        select.setAttribute("class", "createForm");
        select.setAttribute("id", "new_race_create");

        for (let i = 0; i < RACES.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", RACES[i])
            option.innerText = RACES[i];
            select.appendChild(option);
        }

        div.appendChild(label);
        div.appendChild(select);
        form.appendChild(div);
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let select = document.createElement("select");
        let br = document.createElement("br");
        label.setAttribute("for", "new_profession_create");
        label.innerText = "Profession:";
        select.setAttribute("class", "createForm");
        select.setAttribute("id", "new_profession_create");

        for (let i = 0; i < PROFESSIONS.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", PROFESSIONS[i])
            option.innerText = PROFESSIONS[i];
            select.appendChild(option);
        }

        div.appendChild(label);
        div.appendChild(select);
        form.appendChild(div);
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let input = document.createElement("input");
        let br = document.createElement("br");
        label.setAttribute("for", "new_level_create");
        label.innerText = "Level:";
        input.setAttribute("type", "number");
        input.setAttribute("id", "new_level_create");
        input.setAttribute("class", "createForm");
        input.setAttribute("required", "");
        input.setAttribute("step", "1");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("placeholder", "Number from 1 to 100")
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let input = document.createElement("input");
        let br = document.createElement("br");
        label.setAttribute("for", "new_birthday_create");
        label.innerText = "Date:";
        label.setAttribute("class", "label_form");
        input.setAttribute("type", "date");
        input.setAttribute("id", "new_birthday_create");
        input.setAttribute("class", "createForm");
        input.setAttribute("required", "");
        input.setAttribute("min", "2000-01-01");
        input.setAttribute("max", "3000-12-31");
        input.setAttribute("title", "From 1900 to 2100 year")
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
        form.appendChild(br);
    }
    {
        let div = document.createElement("div");
        div.setAttribute("class", "create_form_div");
        let label = document.createElement("label");
        let select = document.createElement("select");
        let br = document.createElement("br");
        label.setAttribute("for", "new_banned_create");
        label.innerText = "Banned:";
        select.setAttribute("class", "createForm");
        select.setAttribute("id", "new_banned_create");

        for (let i = 0; i < BANNED.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", BANNED[i])
            option.innerText = BANNED[i];
            select.appendChild(option);
        }

        div.appendChild(label);
        div.appendChild(select);
        form.appendChild(div);
        form.appendChild(br);
    }

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("class", "button_form_create");
    submit.value = "Check and Create";
    form.appendChild(submit);

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("class", "button_form_cancel");
    cancelButton.onclick = function () {
        div_form.innerHTML = "";
    }
    form.appendChild(cancelButton);


}

/** ?????????????? ???????????????? **/
async function createCharacter() {
    let name = document.getElementById("new_name_create");
    let title = document.getElementById("new_title_create");
    let race = document.getElementById("new_race_create");
    let profession = document.getElementById("new_profession_create");
    let level = document.getElementById("new_level_create");
    let birthday = document.getElementById("new_birthday_create");
    let banned = document.getElementById("new_banned_create");

    await fetch("/rest/players/", {
        method: "POST",
        body: JSON.stringify({
            "name": name.value,
            "title": title.value,
            "race": race.value,
            "profession": profession.value,
            "level": level.value,
            "birthday": birthday.valueAsNumber,
            "banned": banned.value,
        }),
        headers: {
            'content-type': 'application/json'
        }
    });

    await updatePageData();

    let form = document.getElementById("createAccountForm");
    await form.reset();

}

async function getUrlWithPagesCount() {
    let countOnPage = getValueFromSelect();
    return "/rest/players?pageSize=" + countOnPage;
}

async function getPageCount() {
    let playerCount = await getPlayersCount();
    let countOnPage = getValueFromSelect();
    return Math.ceil(playerCount / countOnPage);
}

async function editCharacter(id) {
    let deleteBtn = document.getElementById("td_delete_" + id);
    deleteBtn.hidden = true;

    let name = document.getElementById("td_name_" + id);
    let input_name = document.createElement("input");
    input_name.setAttribute("value", name.innerHTML.toString());
    let form_name = document.createElement("form");
    name.innerHTML = "";
    name.appendChild(form_name.appendChild(input_name));

    let title = document.getElementById("td_title_" + id);
    let input_title = document.createElement("input");
    input_title.setAttribute("value", title.innerHTML.toString());
    let form_title = document.createElement("form");
    title.innerHTML = "";
    title.appendChild(form_title.appendChild(input_title));

    let race = document.getElementById("td_race_" + id);
    getSelectedMenu(id, race, RACES);

    let profession = document.getElementById("td_profession_" + id);
    getSelectedMenu(id, profession, PROFESSIONS);

    let banned = document.getElementById("td_banned_" + id);
    getSelectedMenu(id, banned, BANNED);

    let edit_td = document.getElementById("td_edit_" + id);
    let save_img = document.createElement("img");
    save_img.src = "../img/save.png";
    save_img.alt = "Button for save!!";
    let save_button = document.createElement("button");
    save_button.setAttribute("id", "save_button_" + id);
    save_button.setAttribute("class", "button");
    save_button.onclick = await function () {
        return saveCharacter(id,
            input_name.value,
            input_title.value,
            document.getElementById("race_select_" + id).value,
            document.getElementById("profession_select_" + id).value,
            document.getElementById("banned_select_" + id).value)
    }

    edit_td.innerHTML = "";
    save_button.appendChild(save_img);
    edit_td.appendChild(save_button);

    function getSelectedMenu(id, elementId, array) {
        let value = elementId.innerHTML;
        let select = document.createElement("select")
        let nameForSelectId = elementId.getAttribute("id");
        nameForSelectId = nameForSelectId.split("_");
        nameForSelectId = nameForSelectId[1] + "_select_" + id;
        select.setAttribute("id", nameForSelectId);
        elementId.innerHTML = "";
        elementId.appendChild(select);

        for (let i = 0; i < array.length; i++) {
            let option = document.createElement("option");
            if (value.toLowerCase().toString() === array[i].valueOf().toString().toLowerCase()) {
                option.setAttribute("selected", "");
            }
            option.setAttribute("value", array[i]);
            option.innerHTML = array[i];
            select.appendChild(option);
        }
    }

}

async function updatePageData() {
    let page = await getCurrentPage();
    let url = await getUrlWithPagesCount();
    url = url.concat("&pageNumber=" + page);
    await getRequestForTable(url, page);
}

/** edit function **/
async function saveCharacter(id, name, title, race, profession, banned) {
    await fetch("/rest/players/" + id, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "title": title,
            "race": race,
            "profession": profession,
            "banned": banned,
        }),
        headers: {
            'content-type': 'application/json'
        }
    });

    await updatePageData();
}

/** delete function **/
async function deleteCharacter(id) {
    await fetch("/rest/players/" + id, {
        method: "DELETE",
    });

    let page = await getCurrentPage();
    let pageCount = await getPageCount();
    let playerCount = await getPlayersCount();

    if ((page > 0) && (page === pageCount) && ((playerCount % page) === 0)) {
        page = page - 1;
    }

    let url = await getUrlWithPagesCount()
    url = url.concat("&pageNumber=" + page);

    await getRequestForTable(url, page);
}

/** get the current page **/
function getCurrentPage() {
    let currentPage = 0;
    let buttonRow = document.getElementById("paging_button").children;
    for (let i = 0; i < buttonRow.length; i++) {
        if (buttonRow[i].style.color === "blue") {
            currentPage = buttonRow[i].innerHTML.valueOf() - 1;
            return currentPage;
        }
    }
    return currentPage;
}

/** get the total number of players **/
async function getPlayersCount() {
    const playersCountURL = "/rest/players/count";
    let playersCountResponse = await fetch(playersCountURL);
    return await playersCountResponse.json();
}

/** get the value of the current select **/
function getValueFromSelect() {
    let select = document.getElementById("select_count");
    return select.value;
}

/** delete old buttons and create new ones **/
async function getButtons(url, pageCount) {
    let buttonRow = document.getElementById("paging_button");
    buttonRow.innerHTML = "Pages:";
    for (let i = 0; i < pageCount; i++) {
        let urlForButton = url + "&pageNumber=" + i;
        let button = document.createElement("button")
        button.innerHTML = (i + 1).toString();
        button.setAttribute("id", "button_" + i);
        button.setAttribute("class", "page_button");
        button.onclick = function () {
            return getRequestForTable(urlForButton, i)
        };
        buttonRow.appendChild(button);
    }
}

/** fill the table with data **/
async function getRequestForTable(urlForButton = null, pageNumber = 0) {
    let playersURL = await getUrlWithPagesCount();

    if (urlForButton == null) {
        urlForButton = playersURL;
    }
    await fetch(urlForButton)
        .then(response => response.json())
        .then(data => fillTableFromResponse(data));
    let pageCount = await getPageCount();

    await getButtons(playersURL, pageCount)
    if (pageCount <= 0) {
        alert("No characters or missing database");
    }
    if (pageCount > 0) {
        let btn = document.getElementById("button_" + pageNumber);
        btn.style.color = "blue";
    }
}

async function fillTableFromResponse(data) {
    let table = document.getElementById("tbody");
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let birthdayDate = new Date(data[i].birthday);
        const row = `<tr id="table_tr_id_${data[i].id}">
                        <td id="td_id_${data[i].id}" class="table_Id">${data[i].id}</td>
						<td id="td_name_${data[i].id}" 
						    class="table_Name"
						    >${data[i].name}</td>
						<td id="td_title_${data[i].id}" 
						     class="table_Title"
						    >${data[i].title}</td>
						<td id="td_race_${data[i].id}" 
						     class="table_Race"
						    >${data[i].race}</td>
						<td id="td_profession_${data[i].id}" 
						    class="table_Profession"
						    >${data[i].profession}</td>
						<td id="td_level_${data[i].id}"
						class="table_Level"
						    >${data[i].level}</td>
						<td id="td_birthdayDate_${data[i].id}"
						class="table_Birthday"
						    >${birthdayDate.toLocaleDateString()}</td>
						<td id="td_banned_${data[i].id}" 
						    class="table_Banned"
						    >${data[i].banned}</td>
						<td id="td_edit_${data[i].id}" class="table_Edit"><button class="button" id="edit_button_${data[i].id}" onclick="editCharacter(${data[i].id})">
						    <img src="../img/edit.png" alt="Button for edit">
						    </button>
						    </td>
					    <td id="td_delete_${data[i].id}" class="table_Delete"><button class="button" id="delete_button_${data[i].id}" onclick="deleteCharacter(${data[i].id})">
						    <img src="../img/delete.png" alt="Button for delete">
						    </button>
						    </td>
					  </tr>`;
        table.innerHTML += row;
        let pageCount = await getPageCount();
        if (pageCount <= 0) {
            alert("No characters or missing database");
        }
    }
}

