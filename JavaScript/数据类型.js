const obj1 = { a: { b: '1' } };
const obj2 = obj1.a;
const obj3 = obj2;
const obj4 = { ...obj1.a };

console.log(obj3 === obj1.a);
console.log(obj4 === obj1.a);

console.log(Number.isNaN(0));
console.log(Number.isNaN(10));
console.log(NaN === NaN);