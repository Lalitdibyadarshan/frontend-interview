const curry = () => {
  let result = 0;

  return (param) => {
    result += param;
    return result;
  };
};

const sum = curry();

console.log(
  sum(5), // 5
  sum(3), // 8
  sum(4), // 12
  sum(0),
); // 12
