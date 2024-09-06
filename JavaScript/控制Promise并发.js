let time1;

function gets (ids, max) {
  time1 = new Date();

  return new Promise((resolve) => {
    const res = new Array(ids.length).fill(null);
    let loadcount = 0;
    let curIndex = 0;

    function load (id, index) {
      return get(id).then(
        (data) => {
          loadcount++;

          if (loadcount >= ids.length) {
            // 越界的就不赋值了
            if (loadcount === ids.length)
              res[index] = data;

            console.log("收工");
            resolve(res);
          } else {
            res[index] = data;
            curIndex++;
            load(ids[curIndex], curIndex);
          }
        },
        (err) => {
          res[curIndex] = err;
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

// gets([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112], 2).then(data => {
//   let time2 = new Date();

//   console.log("耗时", time2 - time1);
//   console.log("返回数据", data, data.length);
// })
function f (count) {
  console.log(`foo${count}`);
  setTimeout(() => { console.log(`bar${count}`); });
}
f(1);
f(2);
setTimeout(() => { f(3); });





