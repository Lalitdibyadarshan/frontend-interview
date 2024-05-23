const asyncTask = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time === 10) {
        reject(`error ${time}`);
      } else {
        resolve(`completing ${time}`);
      }
    }, 100 * time);
  });
};

const promiseList = [
  asyncTask(5),
  asyncTask(2),
  asyncTask(3),
  asyncTask(1),
  asyncTask(6),
];

const parallelProcess = (promises) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const result = [];
    promises.forEach((p, i) => {
      p.then((data) => {
        result[i] = data;
      })
        .catch((e) => {
          result[i] = e;
        })
        .finally(() => {
          counter++;
          if (counter === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

const batchProcess = (tasks, batchSize) => {
  const slicedArr = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    slicedArr.push(tasks.slice(i, i + batchSize));
  }

  return slicedArr.reduce((prev, curr, index) => {
    return prev.then((data) => {
      return parallelProcess(curr).then((d) => {
        console.log("batch", index, d);
        return [...data, ...d];
      });
    });
  }, Promise.resolve([]));
};

batchProcess(promiseList, 3).then(console.log);
