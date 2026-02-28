type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; size: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Polygon = { kind: "polygon"; sides: number };

type Shape = Circle | Square | Triangle | Polygon;

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius * s.radius;

    case "square":
      return s.size * s.size;

    case "triangle":
      return (s.base * s.height) / 2;

    case "polygon":
      return s.sides * 10;

    default:
      const neverCheck: never = s;
      return neverCheck;
  }
}