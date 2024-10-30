const getOrderId = (function () {
  let count = 0;
  return function () {
    ++count;
    return `id_${count}`;
  }
})();

console.log(getOrderId());
console.log(getOrderId());
console.log(getOrderId());
console.log(getOrderId());
