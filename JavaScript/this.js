// var a = 10;

// function fn () {
//   return this.a + 1;
// }

// var obj = {
//   a: 5,
//   test1: function () {
//     let a = 1;
//     console.log("test1");
//     return fn();
//   }
// };

// obj.test2 = fn;

// console.log(obj.test1());
// console.log(fn());
// console.log(obj.test2());

//作用域和NaN 这里不具体讲作用域，意在说明NaN
var b = 1;
function outer () {
  var b = 2;
  function inner () {
    // b++;
    console.log(b);
    var b = 3;
  }
  inner();
}
outer();
//输出结果 NaN
