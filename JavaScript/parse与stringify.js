class UrlTools {
  // your code here
  parse (s1) {
    // 当所有默认格式都如此，比如第一个是个?
    let paramString = s1.slice(1);
    let paramArr = paramString.split("&"); // 切割成不同的参数字符串，比如 foo=bar
    let map = {};

    for (const eachParam of paramArr) {
      let param = eachParam.split("="); // 切割成键值对先
      if (map[param[0]]) {
        const prevValue = map[param[0]]; // 有可能是字符串，也有可能是多个也就是数组
        const currentValue = Array.isArray(prevValue) ? prevValue.push(param[1]) : [prevValue, param[1]];

        map[param[0]] = currentValue;
        // map.set(param[0], currentValue);
      } else {
        map[param[0]] = param[1];
        // map.set(param[0], param[1]);
      }
    }

    return map;

  }

  stringify (paramObject) {
    let resultString = "?";

    // console.log(paramObject)
    for (const paramKey in paramObject) {
      // console.log(paramKey);
      const paramValue = paramObject[paramKey]; // 拿到这个对象该属性的值

      if (Array.isArray(paramValue)) {
        // 如果是数组，那就要重复拼接了
        for (const currentValue of paramValue) {
          resultString += `${paramKey}=${currentValue}&`;
        }
      } else {
        // 不是数组，直接拼接即可
        resultString += `${paramKey}=${paramValue}&`;
      }

    }

    return resultString.slice(0, resultString.length - 1); // 最后一位的 & 删掉
  }
};

let urlTool = new UrlTools();

console.log('UrlTools.parse', urlTool.parse('?foo=bar&abc=xyz&abc=123'));
console.log('UrlTools.stringify', urlTool.stringify({
  foo: 'bar',
  abc: ['xyz', '123'],
}));