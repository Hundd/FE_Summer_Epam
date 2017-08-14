//We will use add() function written in practice2.js task
//To run this code please open automorph.html file.

const MAX_VALUE = 100000000000000000000; // 10 ^ 20
const maxPair = "100000000000000000001"; //MAX_VALUE + 1

function prevPair(pair) {
    return pair[0] + pair.slice(2);
}

function sum(pair) {
    if (pair === "1") return "1";
    return add(pair, sum(prevPair(pair)));
}
var totalSum = add(sum(maxPair), -10001); //Subtraction because of we don't have pairs for 10001
console.log(totalSum); // The answer: 111111111111111101130