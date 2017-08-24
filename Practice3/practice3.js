/*
Дана таблица элементов с произвольным числом строк и столбцов,
Для каждой строки задать hint в котором соединить текст всех ячеек
данной строки и ячеек, в которых данная строка входит на основе rowspan 
 */
var rows = document.querySelectorAll("tr");

//we need to find out how many columns are in table
var maxCol = 0;
Array.prototype.forEach.call(rows[0].children, function(td) {
    maxCol += 1;
    var spaned = td.getAttribute("colspan");
    if (spaned) {
        maxCol += spaned - 1;
    }
});

//Here we will store a cell data for spanned cells
var trails = new Array(maxCol); //Does not work in IE11 .fill(0);
trails.forEach(function(e, i, a) {
    a[i] = 0;
})
var trailValues = new Array(maxCol);


//Calculate hints
var hints = [];
Array.prototype.forEach.call(rows, function(row) {
    var hint = "";
    var cols = Array.prototype.slice.call(row.children, 0);
    for (var i = 0; i < maxCol; i += 1) {
        if (trails[i]) {
            hint += trailValues[i];
            trails[i] -= 1;
        } else if (cols.length > 0) {
            var elem = cols.shift();
            hint += elem.innerHTML;
            var spans = elem.getAttribute("rowspan");
            if (spans) {
                trails[i] = spans - 1;
                trailValues[i] = elem.innerHTML;
            }
        }
        hint += " "; //For the sake of readability
    }
    row.setAttribute("data-hint", hint.trim());
    hints.push(hint.trim());
});

///Events
var hint = document.querySelector("#hint");
var table = document.querySelector("#table");
var heightOfLine = table.offsetHeight / rows.length;
table.addEventListener("mousemove", function(e) {
    hint.style.left = (e.clientX + 10) + "px";
    hint.style.top = (e.clientY + 10) + "px";
    var rowNumber = ~~((e.clientY - table.offsetTop) / heightOfLine);
    if (rowNumber < hints.length) {
        hint.innerHTML = hints[rowNumber];
        hint.style.visibility = "visible";
    }
});
table.addEventListener("mouseleave", function(e) {
    hint.style.visibility = "hidden";
});