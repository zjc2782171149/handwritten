// function a () {
//   console.log(1);

//   const promise = new Promise(resolve => {
//     resolve();
//     console.log(2);
//   });

//   console.log(3);

//   return promise;
// }

// console.log(4);

// setTimeout(() => {
//   console.log(5);
// })

// a().then(() => {
//   console.log(6);
// });



// function f (count) {
//   console.log(`foo${count}`);
//   setTimeout(() => { console.log(`bar${count}`); });
// }
// f(1);
// f(2);
// setTimeout(() => { f(3); });

// foo1, foo2, bar1, bar2, foo3, bar3

new Promise((resolve, reject) => {

  console.log(1)

  resolve(true);

  console.log(2);

  // throw new Error('err'); // 如果有，就中断这个函数，即后面的3不会打印

  reject(false);

  console.log(3)

}).catch(ex => console.log(ex))
  .then(res => console.log(res))

// 1 2 3 true