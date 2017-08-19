var subjectsToRussian = {
    math: "Математика",
    physics: "Физика",
    chemistry: "Химия",
    biology: "Биология",
    literature: "Литература"
};

var pupils = [{
        name: "Домбровский А. Г.",
        math: 12,
        physics: 10,
        biology: 9
    },
    {
        name: "Порошенко А. П.",
        literature: 8,
        physics: 7,
        biology: 6
    },
    {
        name: "Юрчишин П. В.",
        math: 11,
        chemistry: 9,
        biology: 8
    },
    {
        name: "Мельничук И. И.",
        chemistry: 10,
        literature: 9,
        biology: 6
    },
    {
        name: "Спорыш И. Д.",
        literature: 12,
        biology: 10,
        physics: 12
    }
];
//get lis of subjects
var subjects = [];
pupils.forEach(function(pupil) {
    Object.keys(pupil).forEach(function(key) {
        if (key !== "name" && subjects.indexOf(key) === -1) {
            subjects.push(key);
        }
    });
});



function pupilToRow(pupil) {
    var row = `<tr><td>${pupil.name}</td>`;
    subjects.forEach(function(subject) {
        if (subject in pupil) {
            row += `<td>${pupil[subject]}</td>`;
        } else {
            row += `<td>&mdash;</td>`
        }
    });
    return row + "</tr>";
}

function formTable(pupils) {
    var titles = subjects.map(sub => `<th>${subjectsToRussian[sub]}</th>`);
    titles.unshift("<th>ФИО</th>");
    return (
        `<table>
    <tr>
         ${titles.join("")}
        <!-- 
        <th>ФИО</th>
        <th>Математика</th>
        <th>Физика</th>
        <th>Биология</th> 
        -->

    </tr>
    ${pupils.map(pupilToRow).join("")}
</table>`
    );
}

document.getElementById("table-container").innerHTML = formTable(pupils);
//console.log(formTable(pupils));