function a () {
  console.log(1);

  const promise = new Promise(resolve => {
    resolve();
    console.log(2);
  });

  console.log(3);

  return promise;
}

console.log(4);

setTimeout(() => {
  console.log(5);
})

a().then(() => {
  console.log(6);
});



// function f (count) {
//   console.log(`foo${count}`);
//   setTimeout(() => { console.log(`bar${count}`); });
// }
// f(1);
// f(2);
// setTimeout(() => { f(3); });

// foo1, foo2, bar1, bar2, foo3, bar3