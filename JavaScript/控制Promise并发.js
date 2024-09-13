let time1;

function gets (ids, max) {

  return new Promise((resolve) => {
    const res = new Array(ids.length).fill(null);
    let loadcount = 0;
    let curIndex = 0;

    function load (id, index) {
      return get(id).then(
        (data) => {
          console.log("完成一个", data);
          loadcount++;

          if (loadcount > ids.length) {
            // 越界的就不赋值了
            console.log("溢出的其他几个不理了");
          } else if (loadcount === ids.length) {
            res[index] = data; // 最后一个也返回了！
            console.log("收工");
            resolve(res);
          } else {
            res[index] = data;
            curIndex++;
            load(ids[curIndex], curIndex);
          }
        },
        (err) => {
          res[index] = err;
          loadcount++;
          curIndex++;
          load(ids[curIndex], curIndex);
        }
      );
    }

    for (let i = 0; i < max && i < ids.length; i++) {
      curIndex = i;
      load(ids[i], i);
    }
  });
}

function get (id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 1000);
  })
}

time1 = new Date();
gets([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112], 3).then(data => {
  let time2 = new Date();

  console.log("耗时", time2 - time1);
  console.log("返回数据", data, data.length);
})






