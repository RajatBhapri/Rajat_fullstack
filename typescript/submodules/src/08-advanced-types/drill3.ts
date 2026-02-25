type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number | undefined {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

      break;   

    case "rectangle":
      console.log("rectangle" + shape.width + shape.height);
      break;

    case "square":
      return shape.size ** 2;
      break;

    default:
      const x: never = shape;
      return x;
  }
}

const areas = area({ kind: "square", size: 10 });
console.log(areas);
