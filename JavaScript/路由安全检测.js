// 优化路由配置
// 路由配置是一个数组，每个元素包含path、routes、component、name等字段。
// routes也是一个数组，元素一致
// 当元素配置了path且配置了component时，视为安全配置（浏览器输入path，会渲染component）
// 如果配置了path，没配置component，视为不安全。
// 需要在当前元素的routes数组中增加一个元素作为兜底。（path为空字符串，component写入“404”即可，表示渲染404提示页）
// 不安全

function checkSafe (routeArr) {
  // console.log("3", routeArr, routeArr.length);

  let ifSafe = true; // 看是否不安全
  const routes = routeArr[0].routes;
  // console.log("1", routes);

  // console.log("1", routes, routeArr);
  const resultRoute = [];

  for (const route of routes) {
    // console.log(route);
    let component;
    // 如果是空，那就404
    if (route.path === "") {
      component = "404";
    } else {
      // 如果path不是空，且component没配置，那就设置为不安全，且兜底item设置为404页
      component = !route.component ? "404" : route.component;
      if (!route.component) {
        component = "404";
        ifSafe = false;
      } else {
        component = route.component;
      }
    }

    resultRoute.push({
      ...route,
      component
    })

  }

  if (!ifSafe)
    console.log("不安全");

  return resultRoute;
}


const routesConfig1 = [
  {
    path: '/global/home',
    routes: [
      {
        name: '首页2',
        path: '/global/home/home2',
        component: '',
      },
    ],
  },
]
// 安全
const routesConfig2 = [
  {
    path: '/global/home',
    routes: [
      {
        name: '首页2',
        path: '/global/home/home2',
        component: './src/home',
      },
      {
        path: '',
        component: '404' // 此处404模拟是一个react视图组件
      }
    ]
  },
]
// 安全
const routesConfig3 = [
  {
    path: '/global/home',
    routes: [
      {
        name: '首页2',
        path: '/global/home/home2',
        component: './src/home',
      },
    ],
    component: './src/home'
  },
]

// console.log(checkSafe(["1", "2"]));

console.log(checkSafe(routesConfig1));
console.log(checkSafe(routesConfig2));
console.log(checkSafe(routesConfig3));






