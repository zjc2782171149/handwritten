
function translateIntoDOM (html) {
  const regex = /<\/?([a-zA-Z]+)>/g;

  let match;

  // 初始化一个栈用于维护当前的节点关系
  const stack = [];

  // 初始化根节点为空
  let root = null;

  // 逐个匹配HTML中的标签
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0]; // 完整的标签字符串，如 <a>或</a>
    const tagName = match[1]; // 标签名称，如a

    if (tag.startsWith("</")) {
      // 如果是结束标签，则弹出栈顶节点，回到父节点
      stack.pop();
    } else {
      // 如果是开始标签，则创建一个新的节点
      const node = {
        key: tagName,
        children: []
      };

      if (stack.length === 0) {
        // 如果栈为空，说明这是根节点
        root = node;
      } else {
        // 否则，将新节点添加到当前栈顶节点的children中
        const parent = stack[stack.length - 1]; // 栈顶节点即stack的最后一位
        parent.children.push(node);
      }

      // 将新节点压入栈中，成为当前处理的节点
      stack.push(node);
    }
  }

  // 返回构建好的树结构
  return root;
}

console.log(translateIntoDOM("<a><b></b></a>"))