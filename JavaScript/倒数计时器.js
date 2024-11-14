function time (num) {
  if (num > 86399000) {
    num = 86399000;
  }
  let initTime = num;

  function showCurrentTime (initTime) {
    const totalSeconds = Math.floor(initTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime =
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0');
    console.log(formattedTime);
  }

  showCurrentTime(initTime);
  const timer = setInterval(() => {
    initTime -= 1000;
    if (initTime < 0) {
      clearInterval(timer);
      return;
    }
    showCurrentTime(initTime);
  }, 1000);
}
