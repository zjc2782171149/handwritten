// 返回一个函数，允许Promise请求出错 count 次，若成功立刻返回，不成功就count次之后将最后一次 err 返回

Promise.retry = (handler, count) => {
  return (...args) => {
    let nowCount = 0;
    return new Promise((resolve, reject) => {
      const run = () => {
        handler(...args).then(res => {
          console.log("成功");
          resolve(res);
        }).catch(err => {
          nowCount++;
          console.log(`失败第${nowCount}次`);
          if (nowCount >= count) {
            // 不允许继续尝试了，该返回了
            reject(err)
          } else {
            // 继续尝试
            run();
          }
        })
      }

      run();
    })
  }
}

// 模拟异步请求，1s后返回出错的结果
const asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error"))
    }, 1000)
  })
}

const retryFunc = Promise.retry(asyncFunc, 3);
retryFunc().then(res => {
  console.log("成功完成请求", res);
}).catch(err => {
  console.log("仍然失败", err);
})


