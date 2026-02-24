function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  } else if (typeof data === "number") {
    return data.toFixed(2);
  } else if (typeof data === "boolean") {
    return data ? "True value" : "False value";
  }else {return "Unsupported data type";}
}

console.log(processData("raj"));
console.log(processData(76));
console.log(processData(true));

function print(a:string):void{
  console.log(a);
}

function error(a:number):never {
  throw new Error("enter a number ")
}

print("rajat")

error("er")