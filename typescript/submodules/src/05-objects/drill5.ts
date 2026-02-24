type person = {
  name: string,
  age:number,
  weight:number
}

const person1 : Partial<person> = {
name:"rajat"
}

const person2 : Pick<person, "age"> = {
  name: "rajat",    // name doesnot exist in type Pick<person, "age">
  age:23      
}

const person3 : Omit<person,"age"> = {
  name:"rajat",
  weight:34,
  age:25        //age doesnot exist in type omit
}

const person4 : Partial<Pick<person, "name" | "age">> = {
  weight:45     //'weight" does not exist in type Partial<Pick<person, "name" | "age">> 
}

const person5 : Partial<Omit<person, "age">> = {
  name:"rajat",
  weigth:84
}

console.log(person1);
console.log(person2);
console.log(person3);
console.log(person4);