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

function isCircle(s: Shape): s is { kind: "circle"; radius: number }{
  return s.kind === "circle"
}

function areaof(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  } else if ("size" in shape) {
    // narrowing manually using 'in' operator
    return shape.size ** 2;
  } else {
    // remaining type must be rectangle
    return shape.width * shape.height;
  }
}

const areay:Shape = {kind:'circle',radius:20}

console.log(areaof(areay));