function translateTime (num) {
  if (num < 0 || num > 86399) {
    console.log("数值无效，过大或过小"); // 23:59:59 是 max，当然有部分地方要求可以 24:00:00
    return;
  }

  // 传进来的是秒数，比如100就是100秒
  const oneMin = 60; // 1分钟是60秒
  const oneHour = 60 * 60; // 1小时是60分钟，即 60 * 60秒

  const nowHour = Math.floor(num / oneHour); // 计算小时数
  const nowMin = Math.floor((num % oneHour) / oneMin); // 计算分钟数
  const nowSecond = num % oneMin; // 计算秒数

  return `${nowHour >= 10 ? nowHour : '0' + nowHour}:${nowMin >= 10 ? nowMin : '0' + nowMin}:${nowSecond >= 10 ? nowSecond : '0' + nowSecond}`;
}

let count = 0; // 循环10次后默认给关闭，业务需求一般是有个按钮来暂停倒计时，这里只是模拟暂停
let currentTime = 100; // 时间，即秒数

const timeInterval = setInterval(() => {
  console.log(translateTime(currentTime));
  // 打印完最后一个0秒后，就停止计时器
  if (currentTime === 0) {
    timeInterval && clearInterval(timeInterval);
  } else {
    currentTime -= 1;
  }

  count++;
  // 循环10次后关闭
  if (count >= 10) {
    timeInterval && clearInterval(timeInterval);
  }
}, 1000);