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
// console.log(maxCol);

var trails = new Array(maxCol).fill(0);
var trailValues = new Array(maxCol);
rows.forEach(function(row) {
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
    }
    row.setAttribute("data-hint", hint);
    // console.log(hint);
});