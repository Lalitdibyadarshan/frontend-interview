const curry_2 =
  (...args) =>
  (...params) => {
    const allArgs = [...args, ...params];
    if (allArgs.length >= 4 && !params.length) {
      return allArgs.reduce((a, b) => a + b, 0);
    }

    return curry_2(...allArgs);
  };
console.log(curry_2(1, 2)(3, 4)());
