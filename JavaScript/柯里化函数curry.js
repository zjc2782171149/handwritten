function curry (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}

function add (a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1, 2)(3)); // 6





// es6 实现
function curry (fn, ...args) {
  // fn.length 指该函数接受的参数个数
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}


// function test (fn, ...args) {
//   console.log("test arr", args);
// }
// test(() => { }, 1, 2, 3, 4, 5, 6);