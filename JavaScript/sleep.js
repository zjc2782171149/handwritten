function sleep (date) {
  console.log("开始休眠");

  let flag = true;
  const now = Date.now();
  while (flag) {
    if (Date.now() - now > date) {
      flag = false;
    }
  }
  console.log("结束休眠");
}

sleep(2000);