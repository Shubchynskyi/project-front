const RACES = ["HUMAN", "DWARF", "ELF", "GIANT", "ORC", "TROLL", "HOBBIT"];
const PROFESSIONS = ["WARRIOR", "ROGUE", "SORCERER", "CLERIC", "PALADIN", "NAZGUL", "WARLOCK", "DRUID"];
const BANNED = ["false", "true"];

getRequestForTable();


/** выпадающий список для редактирования **/
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

/** получаем URI с количеством аккаунтов на странице **/
async function getUrlWithPagesCount() {
    let countOnPage = getValueFromSelect();
    return "/rest/players?pageSize=" + countOnPage;
}

/** рассчитываем количество страниц **/
async function getPageCount() {
    // общее количество игроков
    let playerCount = await getPlayersCount();
    // текущее значение из select
    let countOnPage = getValueFromSelect();
    return Math.ceil(playerCount / countOnPage);
}

/** функция редактирования **/
async function editCharacter(id) {

    let deleteBtn = document.getElementById("td_delete_" + id);
    deleteBtn.hidden = true;

        // TODO extract to function
    let name = document.getElementById("td_name_" + id);
    let input_name = document.createElement("input");
    input_name.setAttribute("value", name.innerHTML.toString());
    let form_name = document.createElement("form");
    name.innerHTML = "";
    name.appendChild(form_name.appendChild(input_name));
    // TODO extract to function
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

    // create button with func
    let edit_td = document.getElementById("td_edit_" + id);

    let save_img = document.createElement("img");
    save_img.src = "../img/save.png";
    save_img.alt = "Button for save!!";
    let save_button = document.createElement("button");
    save_button.setAttribute("id", "save_button_" + id);
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

}

/** функция редактирования **/
async function saveCharacter(id, name, title, race, profession, banned) {
    await fetch("/rest/players/" + id, {
        method: "POST",
        body: JSON.stringify({
            "name" : name,
            "title" : title,
            "race" : race,
            "profession" : profession,
            "banned" : banned,
            }),
        headers: {
            'content-type' : 'application/json'
        }
    });

    //TODO extract to function
    let page = await getCurrentPage();
    let url = await getUrlWithPagesCount()
    url = url.concat("&pageNumber=" + page);
    await getRequestForTable(url, page);

}

/** функция удаления **/  //TODO при удалении последнего элемента в таблице получаю оибку и элемент пропадает не сразу
async function deleteCharacter(id) {
    await fetch("/rest/players/" + id, {
        method: "DELETE",
    });

    let page = await getCurrentPage();
    let url = await getUrlWithPagesCount()
    url = url.concat("&pageNumber=" + page);
    await getRequestForTable(url, page);
}

/** получаем текущую кнопку **/
function getCurrentPage() {
    let currentPage = 1;
    let buttonRow = document.getElementById("paging_button").children;
    for (let i = 0; i < buttonRow.length; i++) {
        if (buttonRow[i].style.color === "red") {
            currentPage = buttonRow[i].innerHTML.valueOf() - 1;
            return currentPage;
        }
    }
    return currentPage;
}

/** получаем общее количество игроков **/
async function getPlayersCount() {
    const playersCountURL = "/rest/players/count";
    let playersCountResponse = await fetch(playersCountURL);
    return await playersCountResponse.json();
}

/** получаем значение текущего select **/
function getValueFromSelect() {
    let select = document.getElementById("select_count");
    return select.value;
}

/** удаляем старые кнопки и создаем новые **/
async function getButtons(url, pageCount) {
    let buttonRow = document.getElementById("paging_button");
    buttonRow.innerHTML = "Pages:";
    for (let i = 0; i < pageCount; i++) {
        let urlForButton = url + "&pageNumber=" + i;
        let button = document.createElement("button")
        button.innerHTML = (i + 1).toString();
        button.setAttribute("id", "button_" + i);
        button.onclick = function () {
            return getRequestForTable(urlForButton, i)
        };
        buttonRow.appendChild(button);
    }
}

/** тут заполняется таблица данными из ответа **/
async function getRequestForTable(urlForButton = null, pageNumber = 0) {
    let pageCount = await getPageCount();
    let playersURL = await getUrlWithPagesCount();
    await getButtons(playersURL, pageCount)
    let btn = document.getElementById("button_" + pageNumber);
    btn.style.color = "red";

    if (urlForButton == null) {
        urlForButton = playersURL;
    }

    await fetch(urlForButton)
        .then(response => response.json())
        .then(data => fillTableFromResponse(data));
}

/** Заполняет таблицу полученными данными **/
function fillTableFromResponse(data) {
    let table = document.getElementById("tbody");
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let birthdayDate = new Date(data[i].birthday);
        const row = `<tr id="table_tr_id_${data[i].id}">
                        <td id="td_id_${data[i].id}">${data[i].id}</td>
						<td id="td_name_${data[i].id}" 
						    class="td_${data[i].id}"
						    >${data[i].name}</td>
						<td id="td_title_${data[i].id}" 
						    class="td_${data[i].id}"
						    >${data[i].title}</td>
						<td id="td_race_${data[i].id}" 
						    class="td_${data[i].id}"
						    >${data[i].race}</td>
						<td id="td_profession_${data[i].id}" 
						    class="td_${data[i].id}"
						    >${data[i].profession}</td>
						<td id="td_level_${data[i].id}"
						    >${data[i].level}</td>
						<td id="td_birthdayDate_${data[i].id}"
						    >${birthdayDate.toLocaleDateString()}</td>
						<td id="td_banned_${data[i].id}" 
						    class="td_${data[i].id}"
						    >${data[i].banned}</td>
						<td id="td_edit_${data[i].id}"><button id="edit_button_${data[i].id}" onclick="editCharacter(${data[i].id})">
						    <img src="../img/edit.png" alt="Button for edit">
						    </button>
						    </td>
					    <td id="td_delete_${data[i].id}"><button id="delete_button_${data[i].id}" onclick="deleteCharacter(${data[i].id})">
						    <img src="../img/delete.png" alt="Button for delete">
						    </button>
						    </td>
					  </tr>`;
        table.innerHTML += row;
    }
}


function deleteRequestForTable(playersURL, pageNumber = 0) {


    // getButtons();
    let btn = document.getElementById("button_" + pageNumber);
    btn.style.color = 'red';

    fetch(playersURL)
        .then(response => response.json())
        .then(data => fillTableFromResponse(data));
}


function sendRequest(method, url, body = null) {
    const headers = { //only for post method
        "Content-Type": "application/json"
    };
    return fetch(url, {
        //this second parameter only for post method
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json.then(error => {
                const e = new Error("Что-то пошло не так");
                e.data = error;
                throw e;
            })
        }
    });
}

