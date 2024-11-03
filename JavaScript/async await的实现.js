function* getResult (params) {

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
      console.log(1);
    }, 1000);
  })

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
      console.log(2);
    }, 500);
  })

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
      console.log(3);
    }, 100);
  })
}
const gen = getResult()

function co (g) {
  const nextObj = g.next();
  if (nextObj.done) {
    return;
  }
  nextObj.value.then(() => {
    co(g)
  })
}

co(gen)

// 完整封装
function generatorToAsync (generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function go (key, arg) {
        let res;
        try {
          res = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        const { value, done } = res;
        return done
          ? resolve(value)
          : Promise.resolve(value).then(
            (val) => go("next", val),
            (err) => go("throw", err)
          );
      }
      go("next");
    });
  };
}

const fn = (num) => new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));

function* gen () {
  const num1 = yield fn(1);
  console.log(num1);
  const num2 = yield fn(num1);
  console.log(num2);
  const num3 = yield fn(num2);
  console.log(num3);
  return num3;
}

generatorToAsync(gen)().then((res) => console.log(res));