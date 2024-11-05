function boldKeyword (str, keywords) {
  const keywordSet = new Set();
  for (const keyword of keywords) {
    keywordSet.add(keyword); // 去重 + 方便后续O(1)查是否存在关键词
  }
  console.log(keywordSet);

  // 接下来分词，把每个分词以及起始索引记录下来
  const n = str.length;
  let prevIndex = 0; // 记录当前单词的起始，从0开始，不断更新再
  while (str[prevIndex] < "a" || str[prevIndex] > "z") {
    prevIndex++; // 找到第一个英文字母开始
  }
  console.log("起始", prevIndex);

  for (let i = prevIndex; i < n; i++) {
    if (str[i] >= "a" && str[i] <= "z") {
      // 是字母就不做操作，继续往后
    } else {
      // 不是字母了，那就说明单词结束了，把单词记录下来
      const nowWord = str.substring(prevIndex, i);
      console.log("目前单词结束了", prevIndex, i, nowWord);

      // 这个单词是关键词，那就加星号，这里复杂度是O(1)，因此整体算法就只是扫一遍str的O(n)
      if (keywordSet.has(nowWord)) {
        str = str.substring(0, prevIndex) + "*" + nowWord + "*" + str.substring(i);
        i += 2; // 原本是在单词最后一个字母的后面那一个位置，加一个*那么此时i就是到了最后一个字母这，此时最后一个字母右边又来个*，因此i得往后移2位才是新的开始。而这里只加1位，因为for循环还会往后再移一位
      }

      // 往后找到第一个字母，即开始新的下一轮
      while (str[i] < "a" || str[i] > "z") {
        i++;
      }
      prevIndex = i; // 更新单词开头

    }

  }

  return str;
}

const str = "hello world, this is a test string, test is a keyword";
const keywords = ["test", "keyword"];
console.log(boldKeyword(str, keywords)); // 打印的值是"hello world, this is a *test* string, *test* is a *keyword*"


