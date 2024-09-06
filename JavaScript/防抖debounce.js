function debounce (fn, wait, immediate) {
  let timer;
  return function () {
    if (immediate) fn.apply(this, arguments); // 立即执行

    if (timer) clearTimeout(timer); // 如果debounce不再触发，那么 setTimeout 过 wait 会自动执行，但如果再次触发了就要清空计时器，重新计时
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  }
}

