/*1.
Реализовать приложение,  для рисования графика произвольной функции используя canvas.
Для задания параметров функции использовать  элементы формы:
- текстовое поле для ввода формулы функции вида y=f(x)
- 2 текстовых поля для нижнего и верхнего пределов изменения x1 и x2 
(c ограничением ввода только для числовых значений и проверкой x1<x2)
- поля для задания цвета и толщины графика функции (вид по желанию)
кнопка + для добавления нового графика функции 
*/
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.scale(1, 1)
var xMin = -3.14159 * 2;
var xMax = 3.14159 * 2;
var yMin, yMax, scale, offset;
var f1 = Math.sin;
var f2 = function(x) { return Math.sin(2 * x); };
var f3 = function(x) { return -Math.cos(4 * x) / 4; };
var startExpression = "cos(x) - cos(3*x)/3 + cos(5*x)/5 - cos(7*x)/7 + cos(9*x)/9 - cos(11*x)/11";
// var startExpression = "sqrt(x)";
var totalPoints = 1000;
var yLimit = 1; //
var numberOfFunction = 0;
var funcIDs = [];
var funcs = [
    /*{
        function: f1,
        color: "red",
        width: 4
    },*/
    {
        function: parseFunction(startExpression),
        color: "black",
        width: 1
    },
    /* {
        function: f3,
        color: "green",
        width: 2
    }*/
];
var points;

function calcPoints(funcs, xMin, xMax) {
    var dx = (xMax - xMin) / totalPoints;

    var realPoints = funcs.map(function(f) {
        var dotsReal = [];
        for (var px = xMin; px <= xMax; px += dx) {
            dotsReal.push(-f.function(px));
        }
        return dotsReal;
    });
    console.log(realPoints);

    //yMax = Math.max(...realPoints.map(p => Math.max(...p)));
    //yMin = Math.min(...realPoints.map(p => Math.min(...p)));

    yMax = Number.NEGATIVE_INFINITY;
    yMin = Number.POSITIVE_INFINITY;
    realPoints.forEach(function(row) {
        row.forEach(function(val) {
            if (val > yMax) {
                yMax = val;
            }
            if (val < yMin) {
                yMin = val;
            }
        });
    });

    scale = canvas.height * yLimit / (yMax - yMin);
    offset = canvas.height / 2 + canvas.height / 2 * (yMin + yMax) / (yMin - yMax); //768
    return realPoints
        .map(function(points) {
            return points.map((y, i) => {
                return y * scale + offset;
            });
        });

}

function drawPoints(points) {
    var dxCanvas = canvas.width / totalPoints;
    c.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(function(row, i) {
        c.beginPath();
        c.strokeStyle = funcs[i].color;
        c.lineWidth = funcs[i].width;
        row.forEach(function(dot, i) {
            if (i === 0 || !isFinite(dot)) {
                c.moveTo(i * dxCanvas, dot);
            } else {
                c.lineTo(i * dxCanvas, dot);
            }
        });
        c.stroke();
    });
}
drawPoints(calcPoints(funcs, xMin, xMax));

function drawGrid() {
    var NUMBER_OF_LINES = 10;
    c.strokeStyle = "rgba(0,0,255,0.3)";
    c.lineWidth = 1;
    c.fillStyle = "black";
    c.font = "20px Arial";
    var i = 0;
    var dx = (xMax - xMin) / NUMBER_OF_LINES;
    for (var x = xMin; x < xMax; x += dx) {
        var cX = i++ * canvas.width / NUMBER_OF_LINES;
        c.beginPath();
        c.moveTo(cX, 0);
        c.lineTo(cX, canvas.height);
        c.stroke();
        c.fillText(x.toFixed(2), cX + 1, canvas.height - 10);
    }
    var dy = (yMax - yMin) / NUMBER_OF_LINES;
    i = 0;
    for (var y = yMin; y < yMax; y += dy) {
        var cY = i++ * canvas.height / NUMBER_OF_LINES;
        c.beginPath();
        c.moveTo(0, cY);
        c.lineTo(canvas.width, cY);
        c.stroke();
        if (true) {
            c.fillText((y / -1).toFixed(2), 0, cY + 10, );
        }
    }
}
drawGrid();

///// HTML Block \\\\\


var formulaContainer = document.getElementById("formula-container");

function addFormulaHTML(id) {
    return `
        <label>y${id}=</label>
        <input type="text" value="sin(x)" id="function${id}">
        <select id="color${id}">
            <option value="black">Black</optiov>
            <option value="red">Red</optiov>
            <option value="blue">Blue</optiov>
            <option value="green">Green</optiov>
            <option value="gray">Gray</optiov>
        </select>
        <select id="width${id}">
            <option value="1">1px</optiov>
            <option value="2">2px</optiov>
            <option value="3">3px</optiov>
            <option value="4">4px</optiov>
            <option value="5">5px</optiov>
        </select>
        <input type="button" value="X" id="del${id}">
        <br/>`

}

var addFunction = document.getElementById("addFunction");
formulaContainer.appendChild(addNewFunction());
document.getElementById("function0").value = startExpression;
addFunction.addEventListener("click", function(e) {
    e.preventDefault();
    formulaContainer.appendChild(addNewFunction());
});

function addNewFunction() {
    var div = document.createElement("div");
    div.innerHTML = addFormulaHTML(numberOfFunction);
    div.id = "formula-row" + numberOfFunction;
    div.classList.add("formula-row");
    funcIDs.push(numberOfFunction);
    numberOfFunction += 1;
    return div;
}

var functionsForm = document.getElementById("functions");
functionsForm.addEventListener("submit", function(e) {
    // console.log(new FormData(functionsForm).getAll());
    e.preventDefault();
    funcs = [];
    funcIDs.forEach(i => {
        var funcElement = document.getElementById("function" + i);
        var func = parseFunction(funcElement.value);
        // console.log(func);
        if (func) {
            funcs.push({
                function: func,
                color: document.getElementById("color" + i).value,
                width: document.getElementById("width" + i).value
            });
            funcElement.classList.remove("error");
        } else {
            funcElement.classList.add("error");
        }
    });
    //console.log(funcs);

    drawPoints(calcPoints(funcs, xMin, xMax));
    drawGrid();

});

//Delete functions
functionsForm.addEventListener("click", function(e) {
    if (e.target.id.indexOf("del") === 0) {
        var id = e.target.id.slice(3);
        var deleted = document.getElementById("formula-row" + id);
        deleted.remove();
        numberOfFunction -= 1;
        var index = funcIDs.indexOf(+id)
        funcIDs.splice(index, 1);
    }
});


document.getElementById("limits").addEventListener("submit", function(e) {
    e.preventDefault();
    var min = document.getElementById("xMin");
    var max = document.getElementById("xMax");
    var points = document.getElementById("totalPoints");
    totalPoints = parseInt(points.value);

    var minv = parseFloat(min.value)
    var maxv = parseFloat(max.value)
    if (minv < maxv) {
        xMin = minv;
        xMax = maxv;
        min.classList.remove("error");
        max.classList.remove("error");
    } else {
        min.classList.add("error");
        max.classList.add("error");
        alert("Left value has to be less than right")
    }
    drawPoints(calcPoints(funcs, xMin, xMax));
    drawGrid();
});

function parseFunction(expr) {
    try {
        var matched = expr.match(/\w{2,4}/g);
        var uniqMatched = {};
        if (matched)
            matched.forEach(f => uniqMatched[f] = true);
        Object.keys(uniqMatched).forEach(function(f) {
            if (f in Math) {
                expr = expr.replace(RegExp(f, "g"), "Math." + f);
            }
        });
        var x = 3.14159;
        var f = new Function("x", "return " + expr);
        f(x);

    } catch (e) {
        console.log(e.message)
        f = null;
    } finally {
        return f;
    }
}