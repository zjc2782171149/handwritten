function useUpated (effectCallback, deps) {
  const isFirst = useRef(true);

  useEffect(() => {
    // 第一次就不执行回调函数
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      return effectCallback();
    }
  }, deps);

  return updated;
}