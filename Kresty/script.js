console.log("Wellcome to the game:");
var form = document.getElementById("form");
var input = document.querySelector("#form input");
var alert = document.querySelector(".alert");
var table = document.querySelector("table");
var newGame = game();
table.addEventListener("click", function(e) {
    var response = newGame(e.target.id);
    checkResponse(response);
})
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var value = input.value;
    input.value = "";
    if (value >= 1 && value <= 9 || value === "") {
        alert.classList.remove("active");
        var response = newGame(value - 1);
        checkResponse(response);

    } else {
        alert.textContent = "Ошибочный ввод";
        alert.classList.add("active");
    }
});

function checkResponse(response) {
    console.log(response);
    if (typeof response === "string") {
        alert.textContent = response;
        alert.classList.add("end");
    } else if (response === -1) {
        alert.textContent = "Wrong move!";
        alert.classList.add("active");
    } else {
        alert.classList.remove("active");
    }
}

function game() {
    var field = new Array(9);
    var step = 0; // количество ходов
    var message;
    var gameFinnished = false;
    var computerMove;
    return function(next) {
        // console.log("NEXT:", next);
        if (gameFinnished) return message;
        if (step === 0) {
            if (next === -1) {
                computerMove = 4;
                field[computerMove] = "O";
                render();
                step += 1;
                return checkWinner() || computerMove;
            } else {
                field[next] = "X";
                if (cellIsFree(4)) {
                    computerMove = 4;
                } else {
                    computerMove = 0;
                }
                field[computerMove] = "O";
                render();
                step += 2;
                return checkWinner() || computerMove;
            }
        } else if (next === -1) {
            next;
        } else {
            if (!cellIsFree(next)) return -1;
            field[next] = "X";
            step += 1;
            if (step < 9) {
                do {
                    computerMove = Math.round(Math.random() * 8);
                } while (!cellIsFree(computerMove));
                step += 1;
            }
            field[computerMove] = "O";
            render();
            return checkWinner() || computerMove;
        }
    }

    function cellIsFree(cell) {
        return !field[cell];
    }

    function render() {
        field.forEach((e, i) => {
            var cell = document.getElementById(i);
            if (cell && e) {
                cell.textContent = e;
            }
        });
    }

    function checkWinner() {
        function check(val) {
            return (
                //Horisontal lines;
                field[0] === val &&
                field[1] === val &&
                field[2] === val ||

                field[3] === val &&
                field[4] === val &&
                field[5] === val ||

                field[6] === val &&
                field[7] === val &&
                field[8] === val ||

                //Vertical lines
                field[0] === val &&
                field[3] === val &&
                field[6] === val ||

                field[1] === val &&
                field[4] === val &&
                field[7] === val ||

                field[2] === val &&
                field[5] === val &&
                field[8] === val ||

                //diagonals
                field[0] === val &&
                field[4] === val &&
                field[8] === val ||

                field[2] === val &&
                field[4] === val &&
                field[6] === val
            );
        }
        if (check("X")) {
            gameFinnished = true;
            return message = "User Won";
        }
        if (check("O")) {
            gameFinnished = true;
            return message = "System Won";
        }
        if (step === 9) {
            gameFinnished = true;
            return message = "Drawn game";
        }
        return 0;
    }
}