const url1 = "http://epam-ajax-test-e-walker.c9users.io:8080";
const url2 = "/api/tables/foo";
const url = require("url");
const request = require("request");
var postURL = "http://localhost:3000/api/functions/";
// var postURL = "http://epam-js-sommer2017.eu-4.evennode.com/api/functions";
/*
request.get("http://epam-ajax-test-e-walker.c9users.io:8080/api/tables/foo", function(err, res) {
    console.log(res.body);
});*/
/*request.get("http://localhost:3000/api", function(err, res) {
    if (err) {
        console.log(err.message);
    }
    console.log(res.body);
});*/
var form = {
    name: "sqrt3",
    graph_function: "sqrt(x)",
    min_x: 0,
    max_x: 4,
    color: "red"
};
/* */


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