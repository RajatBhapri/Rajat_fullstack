type rec = Record<string, number>

const prices:rec = {
  honda: 34,
  toyota:56,
  maruthi:20
}

type person = {
  name:string,
  age:number
}

const people = new Map<string, person>()

people.set("user1",{name:"rajat",age:34})
people.set("user2",{name:"raj",age:37})

console.log(people.get("user1"));