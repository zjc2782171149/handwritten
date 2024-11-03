// new 里面 return 一个 this
function myNew () {
  console.log("里面的this", this);
  // 创建一个空对象
  const obj = {};
  // 获取构造函数
  const Constructor = Array.prototype.shift.call(arguments);
  // 将空对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype;
  // 将构造函数的 this 指向空对象，并执行构造函数，使得 obj 能读取构造函数上的属性
  const result = Constructor.apply(obj, arguments);
  // 如果构造函数返回一个对象，则返回该对象，否则返回空对象
  return (typeof result === 'object' && result !== null) ? result : obj;
}

const obj = myNew(Array);
console.log(obj);