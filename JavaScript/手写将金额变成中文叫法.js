const numberArr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const unitArr = ["", "十", "百", "千", "万", "十", "百", "千", "亿"];

function numberToChinese (num) {
  if (num === 0) return "零";
  let numStr = num.toString();
  let len = numStr.length;
  let result = [];
  let zeroFlag = false;
  for (let i = 0; i < len; i++) {
    let digit = parseInt(numStr[len - 1 - i]);
    if (digit === 0) {
      zeroFlag = true;
    } else {
      if (zeroFlag) {
        result.unshift("零");
        zeroFlag = false;
      }
      result.unshift(numberArr[digit] + unitArr[i % 9]);
    }
    if (i === 4 || i === 8) {
      // 如果该有万或亿时，开头不包含亿或者万，那就加进来
      if (!result[0].includes("亿") && !result[0].includes("万")) {
        result.unshift(unitArr[i]);
      }
    }
  }
  let final = result.join('');
  final = final.replace(/零+/g, '零'); // 匹配多个零
  final = final.replace(/^一十/, '十'); // 匹配以一十为开头
  final = final.replace(/零$/, ''); // 匹配以零结尾
  final = final.replace(/亿万/, '亿');
  return final;
}

console.log(numberToChinese(123))
console.log(numberToChinese(10002))
console.log(numberToChinese(100023))
console.log(numberToChinese(10033330023))
console.log(numberToChinese(100000002))


