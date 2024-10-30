// 一个fetch的异步函数，返回promise
function mockFetch (url = "", data = {}) {
    return fetch(url, {
        body: JSON.stringify(data)
    });
}

function limitedRequest (urls, maxNum) {
    const promisePool = [];
    const concurrentNum = Math.min(urls.length, maxNum); // 处理maxNum比urls.length 还要大的情况

    // setResult 代表promise完成的回调函数
    // setResult 函数无论什么样的结果都返回promise，来确保最终promise.all可以正确执行
    const setResult = () => {
        console.log('当前并发度：', promisePool.length);
        if (urls.length === 0) {
            console.log('并发请求已经全部发起');
            return Promise.resolve();
        }
        return requestPromise(urls.shift());
    }

    // 调用一次请求
    const requestPromise = (url) => {
        return mockFetch(url).then(setResult).catch(setResult);
    }


    // 一次性放入初始的个数
    for (let i = 0; i < concurrentNum; i++) {
        promisePool.push(requestPromise(urls.shift())); // 拿数组第一个 Promise 请求
    }

    // 全部请求完成的回调
    return Promise.all(promisePool);

}
// 函数调用
const promiseArr = ["A", "B", "C"];
limitedRequest(promiseArr.slice(0, 2), 2).then(resAB => {
    // 通过AB回来的结果，再去执行C
    mockFetch(promiseArr[2]).then(resC => {
        console.log("C的数据", resC);
    }).catch(errC => {
        console.error(errC);
    });
})
