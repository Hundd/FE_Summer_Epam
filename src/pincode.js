function pincode(PIN_CODE, MAX_MISTAKES) {
    var wrongInputs = 0;
    var cardBlocked = false;
    return function(pin) {
        if (cardBlocked) return false;
        if (pin !== PIN_CODE) {
            wrongInputs += 1;
            if (wrongInputs === MAX_MISTAKES) {
                cardBlocked = true;
            }
            return false;
        }
        //if pin is correct
        wrongInputs = 0;
        return true;
    }
}