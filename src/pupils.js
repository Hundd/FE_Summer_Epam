var pupils = [{
        name: "Домбровский А. Г.",
        math: 12,
        physics: 10,
        biology: 9
    },
    {
        name: "Порошенко А. П.",
        math: 8,
        physics: 7,
        biology: 6
    },
    {
        name: "Юрчишин П. В.",
        math: 11,
        physics: 9,
        biology: 8
    },
    {
        name: "Мельничук И. И.",
        math: 10,
        physics: 9,
        biology: 6
    },
    {
        name: "Спорыш И. Д.",
        math: 12,
        physics: 10,
        biology: 12
    }
];

function pupilToRow(pupil) {
    return (
        `<tr>
    <td>${pupil.name}</td>
    <td>${pupil.math}</td>
    <td>${pupil.physics}</td>
    <td>${pupil.biology}</td>
</tr>`
    );
}

function formTable(pupils) {
    var rows = pupils.reduce((accum, pupil) => accum += pupilToRow(pupil) + "\n", "");
    return (
        `<table>
    <tr>
        <th>ФИО</th>
        <th>Математика</th>
        <th>Физика</th>
        <th>Биология</th>
    </tr>
    ${rows}
</table>`
    );
}

document.getElementById("table-container").innerHTML = formTable(pupils);
//console.log(formTable(pupils));