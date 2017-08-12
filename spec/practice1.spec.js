/*
//NodeJS Stuff
var findAverage = require("../src/practice1").findAverage,
    findSomeDigits = require("../src/practice1").findSomeDigits,
    crossLines = require("../src/practice1").crossLines;
*/

describe("Practice 1: Find Average: ", function() {

    it("Average 0, 0", function() {
        var result = findAverage(0, 0);
        expect(result.arithmetic).toBe(0);
        expect(result.geometric).toBe(0);
    });

    it("Average 4, 9", function() {
        var result = findAverage(4, 9);
        expect(result.arithmetic).toBe(6.5);
        expect(result.geometric).toBe(6);
    });

});

describe("Practice 1: Find Some Digits in the number: ", function() {

    it("has not 4 or 7", function() {
        expect(findSomeDigits(1235689).itHas4or7).toBe(false);
    });

    it("has 4 or 7", function() {
        expect(findSomeDigits(45689).itHas4or7).toBe(true);
    });

    it("has neither 3 nor 6 nor 9", function() {
        expect(findSomeDigits(124578).itHas3or6or9).toBe(false);
    });

    it("has 3 or 6 or 7", function() {
        expect(findSomeDigits(123).itHas3or6or9).toBe(true);
    });

    it("has 3 and 4", function() {
        expect(findSomeDigits(1234).itHas4or7 && findSomeDigits(1234).itHas3or6or9).toBe(true);
    });

});

describe("Practice 1: Cross lines: ", function() {
    it("Regular crossing lines", function() {
        expect(crossLines(0, 0, 5, 5, 0, 5, 5, 0)).toBe(true);
    });

    it("Regular lines are not crossing", function() {
        expect(crossLines(1, 1, 4, 4, 1, 2, 2, 5)).toBe(false);
    });

    it("Parralel lines", function() {
        expect(crossLines(0, 0, 5, 5, 1, 1, 6, 6)).toBe(false);
    });

    it("Horisontal and Vertical lines are crossing", function() {
        expect(crossLines(0, 5, 5, 5, 2, 2, 2, 8)).toBe(true);
    });

    it("Horisontal and Vertical lines are not crossing", function() {
        expect(crossLines(0, 0, 6, 0, 1, 1, 1, 3)).toBe(false);
    });

    it("Vertical line and regular line are crossing", function() {
        expect(crossLines(0, 0, 0, 6, -1, 1, 3, 3)).toBe(true);
    });

    it("Vertical line and regular line are not crossing", function() {
        expect(crossLines(0, 0, 0, 6, 1, 1, 3, 3)).toBe(false);
    });

    it("Horisontal line and regular line are crossing", function() {
        expect(crossLines(0, 0, 6, 0, 0, -2, 6, 2)).toBe(true);
    });

    it("Regular line and short vertical line are not crossing", function() {
        expect(crossLines(0, 0, 6, 4, 2, 3, 2, 4)).toBe(false);
    });

    it("Regular line and short horisontal line are not crossing", function() {
        expect(crossLines(0, 0, 6, 6, 0, 4, 2, 4)).toBe(false);
    });
});