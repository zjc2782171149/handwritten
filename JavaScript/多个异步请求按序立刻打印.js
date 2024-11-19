

const urls = [];

function main () {
  // 模拟一个 URL 数组
  const n = 100;
  for (let i = 0; i < n; i++) {
    urls.push(`http://www.baidu.com/${i}`);
  }

  ifFinishArr = new Array[n].fill(false); // 默认都没完成


  for (let i = 0; i < urls.length; i++) {
    runPromise(urls[i], i); // 同时并发所有 URL，如果此题有并发限制要求，那就可以改成 i < urls.length
  }
}

// 模拟请求
function get (url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      resolve(res);
    }).reject(err => {
      reject(err);
    })
  })
}

let finishMaxIndex = 0; // promise完成的最大索引
let resultArr = []; // 存储每个promise完成的结果数组
let ifFinishArr = []; // 标记每个promise是否完成的数组
let prevConsoleIndex = 0; // 防止重复打印，比如打印了[0,3]，那到索引 [4,5] 完成时，只打印 [4,5]

function runPromise (url, index) {
  get(url).then(res => {
    ifFinishArr[index] = true; // 标记为完成
    resultArr[index] = res; // 存储结果
    finishMaxIndex = Math.max(finishMaxIndex, index); // 更新最大完成索引

    // 下面开始看是否要打印
    let j = 0;
    while (j <= finishMaxIndex && ifFinishArr[j]) {
      // 比如更新最大索引到4时，前面就算2,3完成了，但0和1没完成时依旧不能打印 [0, 4] 的结果
      j++;
    }

    // 说明可以符合条件可以打印！
    if (j === finishMaxIndex + 1) {
      while (prevConsoleIndex <= finishMaxIndex) {
        console.log(resultArr[prevConsoleIndex]);
        prevConsoleIndex++;
      }
    }


  })
}