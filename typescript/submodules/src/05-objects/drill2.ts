interface car {
  make: string;
  model: string;
}

type bike = {
  make: string;
  gears: number;
};

interface electricCar extends car {
  year: number;
}

const ecar: electricCar = {
  make: "honda",
  model: "amaze",
  year: 2016,
};

console.log(ecar);

type ebike = {
  year: number;
};

type newbike = bike & ebike;

const bikes: newbike = {
  make: "tvs",
  gears: 0,
  year: 2022,
};
