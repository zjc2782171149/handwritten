function getAllTags () {
  const tagArr = document.getElementsByTagName("*");
  const tagSet = new Set(); // 需要去重

  for (const tag of tagArr) {
    tagSet.add(tag.tagName); // 把每个元素的标签名加进来
  }

  return Array.from(tagSet);
}