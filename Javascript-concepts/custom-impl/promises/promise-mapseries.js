const mapSeries = async (dataList, mapFn) => {
    return dataList.reduce((acc, curr) => {
        return acc.then((data) => {
            return new Promise((resolve, reject) => {
                mapFn(curr, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve([...data, res]);
                    }
                })
            })
        });
    }, Promise.resolve([]));
}

mapSeries([1,4,5,6,3,7], (data, cb) => {
    setTimeout(() => {
        if (data < 0) {
            cb("err")
        } else {
            cb(undefined, data * 10)
        }
    }, data * 100);
}).then(console.log)