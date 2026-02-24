type func = (a: number, b: number) => void;


const add: func = (a: number, b: number) => {
  console.log(a + b);
};

const printAdd = (a: number, b: number, callback: func) => {
  callback(a, b);
};

printAdd(2, 4, add);
