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
var xMin = -3.14159 * 2;
var xMax = 3.14159 * 2;
var yMin, yMax, scale, offset;
var startExpression = "cos(x) - cos(3*x)/3 + cos(5*x)/5 - cos(7*x)/7 + cos(9*x)/9 - cos(11*x)/11";
// var startExpression = "sqrt(x)";
var totalPoints = 1000;
var yLimit = 1; //
var numberOfFunction = 0;
var savedFunctions;
var funcIDs = [];
var funcs = [
    /*{
        function: parseFunction(startExpression),
        color: "black",
        width: 1
    }, */
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

drawPoints(calcPoints(funcs, xMin, xMax));
drawGrid();

///// HTML Block \\\\\


var formulaContainer = document.getElementById("formula-container");

function addFormulaHTML(id, f = "cos(x)", color = "black") {
    return `
    <input type="button" value="X" id="del${id}">
    <label>y${id}=</label>
    <input type="text" value="${f}" id="function${id}">
    <select id="color${id}">
        <option value="black" ${color==="black"?"selected":""}>Black</optiov>
        <option value="red" ${color==="red"?"selected":""}>Red</optiov>
        <option value="blue" ${color==="blue"?"selected":""}>Blue</optiov>
        <option value="green" ${color==="green"?"selected":""}>Green</optiov>
        <option value="gray" ${color==="gray"?"selected":""}>Gray</optiov>
    </select>
    <select id="width${id}">
        <option value="1">1px</optiov>
        <option value="2">2px</optiov>
        <option value="3" selected>3px</optiov>
        <option value="4">4px</optiov>
        <option value="5">5px</optiov>
    </select>
    <input type="button" value="Save" id="save${id}">
        <br/>`

}

var addFunction = document.getElementById("addFunction");

/*formulaContainer.appendChild(addNewFunction());
document.getElementById("function0").value = startExpression;*/

addFunction.addEventListener("click", function(e) {
    e.preventDefault();
    formulaContainer.appendChild(addNewFunction());
});

function addNewFunction(f, color) {
    var div = document.createElement("div");
    div.innerHTML = addFormulaHTML(numberOfFunction, f, color);
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
    renderView();
});

function renderView() {
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
    getLimitValues();
    drawPoints(calcPoints(funcs, xMin, xMax));
    drawGrid();
}

function getLimitValues() {
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
}

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
    getLimitValues();
    renderView();
});

/// Adding Server Communication \\\
var HOST = "http://localHOST:3000/";

function fetchFunctionsfromServer() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", HOST + "api/functions");
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                try {
                    var functions = JSON.parse(request.responseText);
                    savedFunctions = functions;
                    resolve(functions);
                } catch (e) {
                    reject("Server response is not correct");
                }
            } else if (request.status = 404) {
                document.getElementById("saved").innerHTML = "<h2 class='error'>There is no functions on the server</h2>";
            }
        }
        request.onerror = function() {
            reject("Can not reach the server!");
        }
        request.send(null);
    });
}

function refreshServerData() {
    fetchFunctionsfromServer()
        .then(renderFunctionsList)
        .then(addHandlers)
        .catch(function(e) {
            console.log(e);
        });
}
refreshServerData();


function renderFunctionsList(functions) {
    var savedElement = document.getElementById("saved");
    var content =
        functions.reduce(function(a, f, i) {
            return a + `
                <tr>
                    <td class="btn-del btn-del${i}">X</td>
                    <td class="btn-add${i}">${f.graphName}</td>
                    <td class="btn-add${i}">${f.graphFunction}</td>
                    <td class="btn-add${i}">${f.minX}</td>
                    <td class="btn-add${i}">${f.maxX}</td>
                    <td class="btn-add${i}">${f.graphColor}</td>
                </tr>
            `;
        }, "");
    savedElement.innerHTML = `<table class="func-table">
    <tr>
        <th></th>
        <th>Name</th>
        <th>Function</th>
        <th>From</th>
        <th>To</th>
        <th>Color</th>
    </tr>
    ${content}
</table>`;
    return Promise.resolve(functions);
}

//Placing Event Handlers for fetched functions
var handlersAdded = false;

function addHandlers() {
    //Code should be executed only once
    if (handlersAdded) return;
    handlersAdded = true;
    //Add handler for parent element, so we will not care if children will be changed
    document.querySelector("#saved").addEventListener("click", function(e) {

        //Add item into display list
        var add = e.target.className.match(/btn-add(\d+)/);
        if (add) {
            var f = savedFunctions[add[1]];
            formulaContainer.appendChild(
                addNewFunction(f.graphFunction, f.graphColor)
            );
            //If there are no functions to display we set new limits
            if (funcs.length === 0) {
                updateLimits(f.minX, f.maxX);
            }

            renderView();
        }

        //Delete Items from the server
        var del = e.target.className.match(/btn-del(\d+)/);
        if (del) {
            var request = new XMLHttpRequest();
            request.open("DELETE", HOST + 'api/functions/function');
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    refreshServerData();
                } else if (request.status = 404) {
                    document.getElementById("saved").innerHTML = "<h2 class='error'>There is no functions on the server</h2>";
                }
            }
            console.log("function_id=" + savedFunctions[del[1]]._id);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send("function_id=" + savedFunctions[del[1]]._id);
        }
    });
}

function updateLimits(xmin, xmax) {
    if (xmin >= xmax) return;
    xMin = xmin;
    xMax = xmax;
    document.getElementById("xMin").value = xmin;
    document.getElementById("xMax").value = xmax;
}