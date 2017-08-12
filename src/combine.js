var arr = ["A", "B", "C", "D"];
//var arr = ["A", "B"];

function nTransform(arr, n) {
    var combinations = [];

    function transform(newArr, oldArr) {
        var len = oldArr.length
        if (len === 1 || n <= 0) return;
        for (var i = 0; i < len; i += 1) {

            //Copying arrays, we don't want them to mutate
            var copyNew = newArr.slice(0);
            var copyOld = oldArr.slice(0);

            var elem = copyOld.splice(i, 1); //take one of the elements
            copyNew = copyNew.concat(elem); //add it to the new array

            if (copyOld.length === 1) {
                n -= 1;
                if (n < 0) return; // if we have enough results, we should stop
                var result = copyNew.concat(copyOld);
                combinations.push(result);
                // console.log(result);
            }
            transform(copyNew, copyOld);
        }
    }
    transform([], arr);
    return combinations;
}

var tr = nTransform(arr, 10);
console.log("Lenght: " + tr.length)
console.log(tr);
/*
Info: Start process (17:36:53)
Lenght: 10
[ [ 'A', 'B', 'C', 'D' ],
  [ 'A', 'B', 'D', 'C' ],
  [ 'A', 'C', 'B', 'D' ],
  [ 'A', 'C', 'D', 'B' ],
  [ 'A', 'D', 'B', 'C' ],
  [ 'A', 'D', 'C', 'B' ],
  [ 'B', 'A', 'C', 'D' ],
  [ 'B', 'A', 'D', 'C' ],
  [ 'B', 'C', 'A', 'D' ],
  [ 'B', 'C', 'D', 'A' ] ]
Info: End process (17:36:53)
*/