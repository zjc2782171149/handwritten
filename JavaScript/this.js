// 1 ---------------------------------------------------------------------------------------------
// var a = 10;

// function fn () {
//   return this.a + 1;
// }

// var obj = {
//   a: 5,
//   test1: function () {
//     let a = 1;
//     console.log("test1");
//     return fn();
//   }
// };

// obj.test2 = fn;

// console.log(obj.test1());
// console.log(fn());
// console.log(obj.test2());

// 2 ---------------------------------------------------------------------------------------------
//作用域和NaN 这里不具体讲作用域，意在说明NaN
// var b = 1;
// function outer () {
//   var b = 2;
//   function inner () {
//     // b++;
//     console.log(b);
//     var b = 3;
//   }
//   inner();
// }
// outer();
// //输出结果 NaN

// 3 ---------------------------------------------------------------------------------------------
//答案解析版本
// var name = "小余window"
// var person = {
//   name: "person",
//   sayName: function () {
//     console.log(this.name);
//   }
// };
// function sayName () {
//   console.log(this);
//   var sss = person.sayName
//   sss();//this.name是小余window ，独立函数调用，所以这里的this指向最外层的window
//   person.sayName();//隐式调用，this指向person，控制台打印的this.name是person
//   (person.sayName)();//person，隐式调用
//   (b = person.sayName)();//间接函数引用，是独立的函数调用，所以是小余window，(b = person.sayName)是一个整体
// }

// sayName()



// 4 ---------------------------------------------------------------------------------------------
var name = 'window'

//person1是字面量对象
var person1 = {//定义对象的时候是不会产生作用域的，所以对象里面的上层在对象外面
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },//普通函数
  foo2: () => console.log(this.name),//箭头函数
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },//函数套函数，返回普通函数
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }//函数套函数，返回箭头函数
}

var person2 = { name: 'person2' }

// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

// person1.foo2(); // window(不绑定作用域,上层作用域是全局)
// person1.foo2.call(person2); // window

//这里的person1.foo3()的调用下拿到结果在()继续调用，这种属于独立调用   因为foo3()调用后是返回一个全新的函数，相当于一个匿名函数的独立调用
// person1.foo3()(); // window(独立函数调用)
// person1.foo3.call(person2)(); // window(独立函数调用)
// person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// person1.foo4().call(person2); // person1(上层找到person1)


// 5 ---------------------------------------------------------------------------------------------
// var a = 10;

// function fn () {
//   return this.a + 1;
// }

// var obj = {
//   a: 5,
//   test1: function () {
//     let a = 1;
//     return fn();
//   },
//   test3: function () {
//     let a = 1;
//     return fn2();
//   }
// };

// obj.test2 = fn;

// console.log(obj.test1()); // 11
// console.log(fn()); // 11
// console.log(obj.test2()); // 6

// const fn2 = () => {
//   return this.a + 1;
// }
// console.log(obj.test3()); // 11

// 12.
var name = "windowsName";
var a = {
  name: "Cherry",
  func1: function () {
    console.log(this.name)
  },
  func2: function () {
    // let that = this;
    setTimeout(function () {
      console.log(this.name);
      // that.func1();
    }, 100);
  }
}

a.func2();