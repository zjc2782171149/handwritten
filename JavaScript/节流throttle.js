let count = 0;

function throttle (fn, wait) {
  let prev = new Date();
  const that1 = this;
  // console.log("throttle外", this);
  return function () {
    // const that2 = this;
    // console.log("throttle内", this);
    // console.log("是否等", that1 === that2);

    let now = new Date();
    // 如果超出了需等待的 wait，那就可以执行啦总算
    if (now - prev > wait) {
      // fn();
      fn.apply(this, arguments);
      prev = new Date();
    }
  }
}

// const throttleTest = throttle(test, 2000);
const obj = {
  a: 1,
  throttleTestObj: throttle(test, 2000) // 绑定在了obj内
}

const throttleTestWindow = throttle(test, 2000); // 绑定在了window


function test () {
  count++;
  console.log("打印this环境", this, count);

};



setInterval(() => {
  obj.throttleTestObj();
}, 500)