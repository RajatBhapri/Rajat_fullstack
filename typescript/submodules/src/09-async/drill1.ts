const demo: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

async function add(a: number, b: number): Promise<number> {
  return a + b;
}

function print(x: number) {
  console.log(x);
}

function multiply(a: number, b: number, callback: (x: number) => void) {
  let x: number;
  setTimeout(() => {
    x = a * b;
    callback(x);
  }, 1000);
}

multiply(3, 5, print);

function mult(a: number, b: number) {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      let x = a * b;
      resolve(x);
    }, 500);
  });
}

mult(3, 7).then(print);
