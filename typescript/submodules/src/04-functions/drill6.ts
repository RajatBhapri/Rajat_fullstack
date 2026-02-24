function isEven(n: number) {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

console.log(isEven(12));

let c: number = 10;
while (c >= 0) {
  console.log(c);
  c--;
}

type action = "start" | "stop";

function handleAction(action: action) {
  switch (action) {
    case "start":
      console.log("starting");
      break;

    case "stop":
      console.log("stoping");
      break;

    default:
      const default1: never = action;
      return default1;
  }
}

handleAction("stop");
