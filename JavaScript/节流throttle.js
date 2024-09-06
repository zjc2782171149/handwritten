function throttle (fn, wait) {
  let prev = new Date();
  return function () {
    let now = new Date();
    // 如果超出了需等待的 wait，那就可以执行啦总算
    if (now - prev > wait) {
      fn.apply(this, arguments);
      prev = new Date();
    }
  }
}