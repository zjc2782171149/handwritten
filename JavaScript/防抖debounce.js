function debounce (fn, wait, immediate) {
  let timer;
  return function () {
    if (immediate) fn.apply(this, arguments); // 立即执行

    if (timer) clearTimeout(timer); // 如果debounce不再触发，那么 setTimeout 过 wait 会自动执行，但如果再次触发了就要清空计时器，重新计时
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer && clearTimeout(timer);
      timer = null;
    }, wait);
  }
}

function log () {
  console.log("a");
}

const debounceFn = debounce(log, 350, false);

for (let i = 1; i <= 10; i++) {
  setTimeout(debounceFn, i * 100); // 相当于每 100ms 都会触发一次防抖函数，都会导致 350ms 的计时器重新计时，之后最后一次会打印出'a'     
}