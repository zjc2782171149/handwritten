// 编写函数 sum
// sum(1)(2).count() // 3
// sum(1)(2)(3).count() // 6
// sum(1)(2)(3)(4,5).count() // 15

function sum (...args) {
  console.log("外部", args);
  let total = args.reduce((prev, current) => prev + current);

  // 定义一个内部 func 函数，允许继续链式调用，并在每次调用时将新的参数累加到计数器中
  function func (...moreArgs) {
    console.log("内部更多", moreArgs);
    total += moreArgs.reduce((prev, current) => prev + current);
    return func;
  }

  func.count = function () {
    return total;
  };

  // 返回这个 func 函数，允许无限次调用
  return func;
}

// console.log(sum(1)(2).count());
// console.log(sum(1)(2)(3).count());
console.log(sum(1)(2)(3)(4, 5).count());