function calculate (s, arr) {
  const n = s.length;
  let dp = new Array(n + 1).fill(false); // dp[i]表示字符串s的前i个字符能否被顺利拆分进arr中，即arr中是否有前i个字符
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      let nowString = s.substring(j, i); // 截取出来当前部分的字符串
      // [0, j) 和 [j, i) 都满足，才叫做前i个字符都顺利拆分，才存进 dp[i]
      if (dp[j] && arr.includes(nowString)) {
        dp[i] = true;
        break; // 跳出本次，继续让i往后移，找下一个dp
      }
    }
  }

  return dp[n];

}

console.log(calculate("applepenapple", ["apple", "pen"]))
console.log(calculate("applepenappl", ["apple", "pen"]))
console.log(calculate("applepenapple", ["apple", ""]))
