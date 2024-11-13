const f = async () => {
  await Promise.resolve();
  return Math.random() > 0.5 ? undefined : [' '].map((s) => {
    s, a:1
  })
}

type t1 = typeof f;
type t2 = Awaited<ReturnType<t1>>;

console.log(t1, t2);