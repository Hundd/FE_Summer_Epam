describe("Practice 2: Adding two very big numbers", function() {
    it("Function add() should be defined", function() {
        expect(add).toBeDefined();
    });
    it("should be able add 2 + 2", function() {
        expect(add("2", "2")).toEqual("4");
    });
    it("9007199254740990 + 9007199254740990 === 18014398509481980", function() {
        expect(add("9007199254740990", "9007199254740990")).toEqual("18014398509481980");
    });
    it("9007199254740990 + -9007199254740990 === 0", function() {
        expect(add("9007199254740990", "-9007199254740990")).toEqual("0");
    });
    it("-9007199254740990 + 7199254740990 === -9000000000000000", function() {
        expect(add("-9007199254740990", "7199254740990")).toEqual("-9000000000000000");
    });
    it("Sending integers will return their sum: 123 + 144 === 267", function() {
        expect(add(123, 144)).toEqual('267');
    });
    it("Sending incorrect string will return NaN", function() {
        expect(add("123a", "144")).toBeNaN();
    });
});