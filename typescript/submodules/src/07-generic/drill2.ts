function first<T>(arr:T[]):T | undefined{
  return arr[1]
}

const numbers = [1, 2, 3];
const words = ["a", "b", "c"];

const str = first(words)
const num = first(numbers)

console.log(str);       //b

const mixedarr =[1,"raj",2]

const mixed = first(mixedarr)

console.log(mixed);         //raj
