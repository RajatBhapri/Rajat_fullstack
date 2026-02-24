const sumAll = (...nums: (string | number)[]) => {
  let total: number = 0;
  for (let i = 0; i < nums.length; i++) {
    if (typeof nums[i] === "number") {
      total = total + nums[i];
    } else {
      let numb = Number(nums[i]);
      total = total + numb;
    }
  }
  return total;
};

console.log(sumAll(1, 2, "3", 4, 5));

// output :- 15
