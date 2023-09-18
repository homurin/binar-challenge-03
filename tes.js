class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static printJson() {
    return {
      name: this.name,
      age: this.age,
    };
  }
  printLog() {
    console.info(User.printJson());
  }
}

new User("edi", "20").printLog();
