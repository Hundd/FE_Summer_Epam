describe("Deg between clock arrows", function() {
    it("3:15 === 7.5", function() {
        expect(clock(3, 15)).toEqual(7.5);
    });
    it("9:45 === 22.5", function() {
        expect(clock(9, 45)).toEqual(22.5);
    });
    it("12:15 === 82.5", function() {
        expect(clock(12, 15)).toEqual(82.5);
    });
    it("12:00 === 0", function() {
        expect(clock(12, 0)).toEqual(0);
    });
    it("6:30 === 15", function() {
        expect(clock(6, 30)).toEqual(15);
    });
    it("16:30 - too much for analog clock", function() {
        expect(clock(16, 30)).toBe(false);
    });
});