/* 9
Найти сумму двух сверхбольших целых чисел (больше MAX_SAFE_INTEGER).
Числа могут быть отрицательными. Для неверно заданных чисел вернуть NaN 
 */
'use strict';

function add(a, b) {
    if (typeof a === "number" || typeof b === "number") {
        a = a.toString();
        b = b.toString();
    }
    if (isNaN(+a) || isNaN(+b)) return NaN;

    function sum(a, b) {
        //positive a and b;
        a = a.split("").map(s => +s).reverse();
        b = b.split("").map(s => +s).reverse();
        var len = a.length > b.length ? a.length : b.length;
        var c = [];
        var extra = 0;
        for (var i = 0; i < len; i += 1) {
            var current = (a[i] ? a[i] : 0) + (b[i] ? b[i] : 0) + extra;
            extra = current > 9 ? 1 : 0;
            c.unshift(current % 10);
        }
        if (extra) c.unshift(extra);
        return c.join("");
    }

    function sub(a, b) {
        //a > b;
        a = a.split("").map(s => +s).reverse();
        b = b.split("").map(s => +s).reverse();
        var extra = 0;
        for (var i = 0; i < a.length; i += 1) {
            var current = a[i] - (b[i] ? b[i] : 0) - extra;
            if (current >= 0) {
                a[i] = current;
                extra = 0;
            } else {
                a[i] = 10 + current;
                extra = 1;
            }

        }
        i = 0;
        a = a.reverse();
        while (!a[i++] && i < a.length) /* Empty */;
        return a.slice(i - 1).join("");
    }
    if (a[0] !== '-' && b[0] !== "-") { return sum(a, b); }
    if (a[0] === '-' && b[0] === "-") { return "-" + sum(a.slice(1), b.slice(1)); }
    if (a[0] === '-') {
        a = a.slice(1);
        if (a.length > b.length || a.length === b.length && a > b) return "-" + sub(a, b);
        else return sub(b, a);
    }
    if (b[0] === '-') {
        b = b.slice(1);
        if (b.length > a.length || b.length === a.length && b > a) {
            console.log(b > a);
            return "-" + sub(b, a);
        } else {
            return sub(a, b);
        }
    }
}

// console.log(add("9007199254740991", "9007199254740991"));
// console.log(add("90000", "-80000")); //10000