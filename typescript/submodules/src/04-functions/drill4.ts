//function toArray(x:number): number[]
//function toArray(x:string): string[]

function toArray(x: string | number): (string | number)[] {
  return x.split("");
}

console.log(toArray("hello"));

console.log(toArray(true)); // Argument of type boolean is not assignable to parameter of type string | number
