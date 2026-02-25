function demo<T>(x: T): T {
  return x;
}

const str = demo("rajat");
const num = demo(23);
const obj = demo({ name: "rajat" });

console.log(num);
console.log(str);
console.log(obj);

const Xsrt = demo<string>("rajat");
const Xnum = demo<number>(43);

console.log(Xsrt);
console.log(Xnum);

function demo1(x: any): any {
  return x;
}

const xxnum = demo1(23);
const xxstr = demo1("rajat"); // error
xxnum.toFixed();
xxstr.toFixed(); //error
