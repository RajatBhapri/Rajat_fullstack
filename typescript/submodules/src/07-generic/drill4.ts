type ApiResponse<T = unknown> = { status: number; data: T };

const res1: ApiResponse<string> = {
  status: 200,
  data: "active",
};

const res2: ApiResponse = {
  status: 200,
  data: "active",
};


console.log(res1.data.toUpperCase());
console.log(res2.data.toUpperCase());     //'res2.data' is of type 'unknown'