interface user {
  name: string ;
  age: number;
}

function check(user: user) {
  if (user.age < 18) {
    return false;
  } else {
    return true;
  }
}

const user1: user = {
  name: "rajat",
  age: 23,
};

console.log(check(user1));

//---------------------------------------------------------------------------------------------

function addStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log(addStrings(", ", "apple", "banana", "cherry"));
console.log(addStrings(" - ", "TypeScript", "is", "fun"));

// ------------------------------------------------------------------------------------------

function defaultValue(name:string = "rajat",age:number = 34){
  console.log(name +" "+ age);
}

defaultValue()