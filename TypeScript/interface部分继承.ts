// Pick 关键字来实现部分继承
interface Person {
  name: string;
  age: number;
  id: number;
  sex: 0 | 1;
}

// 问女生年纪不太礼貌，所以我们不需要 age 这个属性
type Woman = Pick<Person, "name" | "id">;

// 此时 Woman 等效于 Female
interface Female {
  name: string;
  id: number;
}



// Omit 关键字来实现部分继承
interface User {
  id: number;
  name: string;
  age: number;
  sex: 0 | 1;
  tel: number;
}

type EditUser = Omit<User, "id">; // 就是在 User 的基础上，去掉 id 属性
