// console.log(a);
// console.log(b);
// var a = 1;
// console.log(a);
// console.log(b);

function test () {
  var a = 1;
  console.log(this.a);
}

var a = 2;
test();