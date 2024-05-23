const curry =
  (...args) =>
  (...params) => {
    const list = [...args, ...params];
    if (list.length >= 4) {
      return list.slice(0, 4).reduce((a, b) => a + b, 0);
    }
    return curry(...list);
  };

console.log(curry(1)(2)(3, 4)); // 10 sum of 4 params
