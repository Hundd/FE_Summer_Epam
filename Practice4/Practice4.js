/*1.
Реализовать приложение,  для рисования графика произвольной функции используя canvas.
Для задания параметров функции использовать  элементы формы:
- текстовое поле для ввода формулы функции вида y=f(x)
- 2 текстовых поля для нижнего и верхнего пределов изменения x1 и x2 
(c ограничением ввода только для числовых значений и проверкой x1<x2)
- поля для задания цвета и толщины графика функции (вид по желанию)
кнопка + для добавления нового графика функции 
*/
// var HOST = "http://localhost:3000/";
var HOST = "http://epam-js-sommer2017.eu-4.evennode.com/";
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
            //For dots that are not in the range
            if (px < f.minX || px > f.maxX) {
                dotsReal.push(NaN);
                continue;
            }
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

function addFormulaHTML(id, f = {}) {
    var func = f.graphFunction || "cos(x)";
    var color = f.graphColor || "blue";
    var _id = f._id || "0";
    var min = f.graphName ? f.minX : xMin;
    var max = f.graphName ? f.maxX : xMax;
    var name = f.graphName || "";
    return `
    <input type="button" value="X" id="del${id}">
    <label>y${id}=</label>
    <input type="text" value="${func}" id="function${id}" data-id="${_id}">
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
    <br/>
    <label for="xMin${id}">xMin:</label>
    <input type="number" name="xMin" id="xMin${id}" value="${min}" step=0.000001>
    <label for="xMax${id}">xMax:</label>
    <input type="number" name="xMax" id="xMax${id}" value="${max}" step=0.000001>
    <label for="func-name${id}">Name:</label>
    <input type="text" name="name" id="func-name${id}" class="func-name" value="${name}">
    <input type="button" value="${_id==='0'?'Save':'Update'}" id="save${id}">
    <hr/>
    <br/>`

}

var addFunction = document.getElementById("addFunction");



addFunction.addEventListener("click", function(e) {
    e.preventDefault();
    formulaContainer.appendChild(addNewFunction());
});

function addNewFunction(f) {
    var div = document.createElement("div");
    div.innerHTML = addFormulaHTML(numberOfFunction, f);
    div.id = "formula-row" + numberOfFunction;
    div.classList.add("formula-row");
    funcIDs.push(numberOfFunction);
    numberOfFunction += 1;
    return div;
}

var functionsForm = document.getElementById("functions");
functionsForm.addEventListener("submit", function(e) {
    e.preventDefault();
    renderView();
});



function renderView() {
    parseFunctionsForm();

    drawPoints(calcPoints(funcs, xMin, xMax));
    drawGrid();
}

function parseFunctionsForm() {
    //Reset limits
    xMax = Number.NEGATIVE_INFINITY;
    xMin = Number.POSITIVE_INFINITY;
    funcs = [];
    funcIDs.forEach(i => {
        var funcElement = document.getElementById("function" + i);
        var func = parseFunction(funcElement.value);
        if (func) {
            var minX = document.getElementById("xMin" + i).value || 0;
            var maxX = document.getElementById("xMax" + i).value || 0;
            if (!checkLimitValues(i)) return;
            updateLimits(minX, maxX);
            //console.log(xMin, xMax)
            funcs.push({
                function: func,
                functionExpression: funcElement.value,
                color: document.getElementById("color" + i).value,
                width: document.getElementById("width" + i).value,
                minX: minX,
                maxX: maxX,
                _id: funcElement.getAttribute("data-id"),
                name: document.getElementById("func-name" + i).value
            });
            funcElement.classList.remove("error");
        } else {
            funcElement.classList.add("error");
        }
    });
    if (!isFinite(xMax)) xMax = 10;
    if (!isFinite(xMin)) xMin = -10;
}

function checkLimitValues(i) {

    var min = document.getElementById("xMin" + i);
    var max = document.getElementById("xMax" + i);
    var minv = parseFloat(min.value)
    var maxv = parseFloat(max.value)
    if (minv < maxv) {
        /*xMin = minv;
        xMax = maxv;*/
        min.classList.remove("error");
        max.classList.remove("error");
        return true;
    } else {
        min.classList.add("error");
        max.classList.add("error");
        // alert("Left value has to be less than right");
        return false;
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
                document.getElementById("saved").innerHTML = "<h2 class='error'>There is no functions on the server</h2>" +
                    "<p class='error'>" + request.responseText + "</p>";
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
                addNewFunction(f)
            );
            //If there are no functions to display we set new limits
            updateLimits(f.minX, f.maxX, funcs.length === 0);

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

function updateLimits(xmin, xmax, setNew) {
    xmin = +xmin;
    xmax = +xmax;
    if (xmin >= xmax) return 1;
    if (setNew) {
        document.getElementById("xMin").value = xMin = xmin;
        document.getElementById("xMax").value = xMax = xmax;
    } else {
        if (xmin < xMin) {
            document.getElementById("xMin").value = xMin = xmin;
        }
        if (xmax > xMax) {
            document.getElementById("xMax").value = xMax = xmax;
        }
    }
    return 0;
}

//Add handlers for Save Buttons
functionsForm.addEventListener("click", function(e) {
    function encodeJSON(data) {
        return Object.keys(data)
            .map(function(key) {
                return "" + key + "=" + encodeURIComponent(data[key]);
            })
            .join("&");
    }
    // console.log(new FormData(functionsForm).getAll());
    var id = e.target.id.match(/save(\d+)/);
    if (id) {
        e.preventDefault();
        id = id[1];
        parseFunctionsForm();
        var f = funcs[id]
        if (f) {
            // POST new function
            if (!f.name) {
                document.getElementById("func-name" + id).classList.add("error");
                return;
            }
            document.getElementById("func-name" + id).classList.remove("error");
            var data = {
                name: f.name,
                graph_function: f.functionExpression,
                min_x: f.minX,
                max_x: f.maxX,
                color: f.color
            };
            // Save or Update Data
            var request = new XMLHttpRequest();
            if (f._id === "0") {
                request.open("POST", HOST + "api/functions/");
            } else {
                request.open("PUT", HOST + "api/functions/function/" + f._id);
            }
            request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    var new_id = JSON.parse(request.responseText).record_id;
                    refreshServerData();
                    f._id = new_id;
                    document.getElementById("function" + id).setAttribute("data-id", new_id);
                    e.target.value = "Update";
                    renderView();
                }
            };
            request.send(encodeJSON(data));
        }
    }
});