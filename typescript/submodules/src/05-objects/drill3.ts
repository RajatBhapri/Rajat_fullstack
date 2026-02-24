type person = {
  name:string,
  middleName?: string,
  lastName:string
}

const person1: person ={
  name :"rajat",
  lastName:"bhapri"
}

console.log(person1.middleName?.toLowerCase());  // prints undefined
console.log(person1.middleName.toLowerCase());    // 'person.middleName' is possibly 'undefined' | cannot read property of undefined