let arr = [1, 2, 3]
let obj = {
  a: 1,
  b: 2,
  c: 3
}
for (let item of arr) {
  console.log(item)
}


Object.prototype[Symbol.iterator] = function () {
  // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
  return Object.values(this)[Symbol.iterator]()
}


for (let item of obj) {
  console.log(item)
}
