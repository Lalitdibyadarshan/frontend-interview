const asyncFilter = async (dataList, filterFn) => {
    return dataList.reduce((acc, curr) => {
        return acc.then((data) => {
            return new Promise((resolve, reject) => {
                filterFn(curr, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res ? [...data, curr] : data)
                    }
                })
            });
        })
    }, Promise.resolve([]));
}


asyncFilter([1,2,3,4,5], (data, cb) => {
    setTimeout(() => {
        if (data === 10) {
            cb("err");
        } else {
            cb(undefined, data % 2 === 0);
        }
    }, data*100);
}).then(console.log);