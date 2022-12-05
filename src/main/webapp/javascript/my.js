const requestURL = "/rest/players";


const myArray = [
    {
        "id": 55,
        "name": "Ниус",
        "title": "Приходящий Без Шума",
        "race": "HOBBIT",
        "profession": "ROGUE",
        "birthday": 1244497480000,
        "banned": false,
        "level": 33
    },
    {
        "id": 66,
        "name": "Никрашш",
        "title": "НайтВульф",
        "race": "ORC",
        "profession": "WARRIOR",
        "birthday": 1152424240000,
        "banned": false,
        "level": 58
    },
    {
        "id": 77,
        "name": "Эззэссэль",
        "title": "шипящая",
        "race": "DWARF",
        "profession": "CLERIC",
        "birthday": 1243201400000,
        "banned": true,
        "level": 3
    },
];


fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        console.log("JSON.stringify = " + JSON.stringify(data));
        appendArrayToTable(data);
    });

const myArray2 = fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            console.log("JSON.stringify = " + JSON.stringify(data));
            return data;
        });

appendArrayToTable(myArray2);

function appendArrayToTable(data) {
    let table = document.getElementById("tbody");
        console.log("Вошел в метод appendArrayToTable")
    for (let i = 0; i < data.length; i++) {
        console.log("внутри цикла, итерация " + i);
        let birthdayDate = new Date(data[i].birthday);

        const row = `<tr>
                        <td>${data[i].id}</td>
						<td>${data[i].name}</td>
						<td>${data[i].title}</td>
						<td>${data[i].race}</td>
						<td>${data[i].profession}</td>
						<td>${data[i].level}</td>
						<td>${birthdayDate.toLocaleDateString()}</td>
						<td>${data[i].banned}</td>
					  </tr>`;
        console.log("собрана строка - " + row);

        table.innerHTML += row

    }
}
