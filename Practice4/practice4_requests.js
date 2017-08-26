const url = require("url");
const request = require("request");
var HOST = "http://epam-js-sommer2017.eu-4.evennode.com/";
var postURL = HOST + "api/functions/";

/*request.get("http://localhost:3000/api", function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});*/


request.post({
    url: postURL,
    form: {
        name: "sqrt",
        graph_function: "sqrt(x)",
        min_x: 0,
        max_x: 4,
        color: "green"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "sin2x",
        graph_function: "sin(2*x)",
        min_x: -5,
        max_x: 5,
        color: "blue"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "sin",
        graph_function: "sin(x)",
        min_x: -6,
        max_x: 6,
        color: "gray"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});

request.post({
    url: postURL,
    form: {
        name: "cos",
        graph_function: "cos(x)",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
///MOC DATA 
request.post({
    url: postURL,
    form: {
        name: "meander radio",
        graph_function: "(cos(x) - cos(3*x)/3 + cos(5*x)/5 - cos(7*x)/7 + cos(9*x)/9 - cos(11*x)/11 +5)*cos(30*x)",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "meander",
        graph_function: "cos(x) - cos(3*x)/3 + cos(5*x)/5 - cos(7*x)/7 + cos(9*x)/9 - cos(11*x)/11",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "radio",
        graph_function: "(cos(x)+5)*cos(30*x)",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "FM signal",
        graph_function: "cos(5*(5+sin(x))*x)",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "Computed Expression",
        graph_function: "(x < -0.1 || x > 0.1)? (1/x) : NaN",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});
request.post({
    url: postURL,
    form: {
        name: "Ln",
        graph_function: "x>0.001?log(x):NaN",
        min_x: -7,
        max_x: 7,
        color: "red"
    }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});




/**/
/*
request.put({
    url: "http://localhost:3000/api/functions/function/599ea58e22d21f03f422d1c4",
    form: form
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
})*/

/*
request.delete({
    url: "http://localhost:3000/api/functions/function",
    form: { function_id: "599ea58e22d21f03f422d1c4" }
}, function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
})*/