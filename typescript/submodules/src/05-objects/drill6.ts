interface person {
  name: string;
  age: number;
}

interface employee extends person {
  role: string;
  department?: string;
}

const employee1: employee = {
  name: "raj",
  age: 24,
  role: "developer",
};

const employee2: Omit<employee, "age"> = {
  name: "rajat",
  age: 24, //age doesnot exist in type omit
  role: "junior",
};

console.log(employee1);
console.log(employee2);
