describe("Pincode checker", function() {
    var pinChecker;
    beforeEach(function() {
        pinChecker = pincode(1234, 3);
    });
    it("Should be defined", function() {
        expect(pinChecker).toBeDefined();
    });
    it("User enters correct pin", function() {
        expect(pinChecker(1234)).toBe(true);
    });
    it("User enters wrong pin", function() {
        expect(pinChecker(3586)).not.toBe(true);
    });
    it("User enters wrong password but later he will enter correct", function() {
        expect(pinChecker(3456)).toBe(false);
        expect(pinChecker(2345)).toBe(false);
        expect(pinChecker(1234)).toBe(true);
    });
    it("User enters wrong password many times and card becames blocked", function() {
        expect(pinChecker(2345)).toBe(false);
        expect(pinChecker(2345)).toBe(false);
        expect(pinChecker(2345)).toBe(false);
        expect(pinChecker(1234)).toBe(false);
        expect(pinChecker(1234)).toBe(false);
        expect(pinChecker(1234)).toBe(false);
    });
});