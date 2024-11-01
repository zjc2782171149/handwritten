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