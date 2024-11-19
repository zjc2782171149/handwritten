console.log(typeof A);
console.log(typeof B);

function A () {
  return "A";
}

var obj = {};
var B = function () {
  return obj;
}

console.log(typeof new A())
console.log(typeof new B())

console.log(typeof A());
console.log(typeof B());

console.log(new B() === obj);
console.log(B() === obj);