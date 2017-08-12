/*1.9. Даны два числа. Найти среднее арифметическое и среднее геометрическое их
модулей.
 */
function findAverage(a, b) {

    var result = {};

    result.arithmetic = (Math.abs(a) + Math.abs(b)) / 2
    result.geometric = Math.sqrt(Math.abs(a) * Math.abs(b));

    return result;
}



/*2.9. Дано двузначное число. Определить:
а) входят ли в него цифры 4 или 7;
б) входят ли в него цифры 3, 6 или 9.
*/
function findSomeDigits(digit) {
    var result = {};

    result.itHas4or7 = /[47]/.test(digit);
    result.itHas3or6or9 = /[369]/.test(digit);

    return result;
}



/*3.9. Два отрезка на плоскости заданы целочисленными координатами своих концов в декартовой системе координат.
 Требуется определить, существует ли у них общая точка. */
function crossLines(x1, y1, x2, y2, x3, y3, x4, y4) {
    //Find out minimum and maximum values for each point;
    var p1XMin = x1 < x2 ? x1 : x2,
        p1XMax = x1 > x2 ? x1 : x2,
        p1YMin = y1 < y2 ? y1 : y2,
        p1YMax = y1 > y2 ? y1 : y2,

        p2XMin = x3 < x4 ? x3 : x4,
        p2XMax = x3 > x4 ? x3 : x4,
        p2YMin = y3 < y4 ? y3 : y4,
        p2YMax = y3 > y4 ? y3 : y4;

    if ((p1XMin <= p2XMax && p2XMin <= p1XMax && p1YMin <= p2YMax && p2YMin <= p1YMax) === false) {

        //Two sections can't have commond dot because they're lying in different spaces;
        return false;
    }

    var dx1 = x2 - x1;
    var dy1 = y2 - y1;
    var dx2 = x4 - x3;
    var dy2 = y4 - y3;

    //canonical solution for line y = a x + b;
    var a1 = dy1 / dx1,
        a2 = dy2 / dx2;

    if (a1 === a2) {
        //Lines are parallel
        return false;
    }
    if (isFinite(a1) && isFinite(a2)) {
        //Lines can be described with a canonical solution y = a x + b;
        //Find a common point
        //y = a1 x + b1;
        //y = a2 x + b2;

        var b1 = y1 - a1 * x1,
            b2 = y3 - a2 * x3;

        var x = (b2 - b1) / (a1 - a2),
            y = a1 * x + b1;
        return (
            x <= p1XMax && x <= p2XMax &&
            x >= p1XMin && x >= p2XMin &&
            y <= p1YMax && y <= p2YMax &&
            y >= p1YMin && y >= p2YMin
        );

    }

    // if one of lines is vertical and another is regular
    if (!dx1) {
        var b2 = y3 - a2 * x3;
        y = a2 * x1 + b2;
        return y <= p1YMax && y >= p1YMin;
    }

    if (!dx2) {
        var b1 = y1 - a1 * x1;
        y = a1 * x3 + b1;
        return y <= p2YMax && y >= p2YMin;
    }
    //Probably unreachable code but anyway
    return true;
}
// console.log(crossLines(0, 0, 6, 4, 2, 3, 2, 4));


//For NodeJS compatibility
/*if (module && module.exports) {
    module.exports = { findAverage, findSomeDigits, crossLines };
}*/