var expr = '2 * sin(x) * sin(x) + cos(x) + abs(x)';
try {
    var matched = expr.match(/\w{2,4}/g);
    var uniqMatched = {};
    matched.forEach(f => uniqMatched[f] = true);
    Object.keys(uniqMatched).forEach(function(f) {
        if (f in Math) {
            expr = expr.replace(RegExp(f, "g"), "Math." + f);
            console.log(expr);
        }
    });
    var x = 3.14159;
    var funcs;
    console.log(eval(expr));
} catch (e) {
    console.log(e.message)
}