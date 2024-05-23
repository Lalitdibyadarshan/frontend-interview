const asyncTask = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (time === 10) {
                reject(`error ${time}`)
            } else {
                resolve(`completing ${time}`);
            }
        }, 100*time);
    });
}

const promiseList = [
    asyncTask(5),
    asyncTask(2),
    asyncTask(3),
    asyncTask(1),
    asyncTask(6)
]

const promiseWithErrorList = [
    asyncTask(5),
    asyncTask(2),
    asyncTask(10),
    asyncTask(1),
    asyncTask(6)
]

// iterative
const customAll = function(promises) {
    if (!promises.length) {
        return Promise.resolve([]);
    }

    return new Promise((resolveCb, rejectCb) => {
        let successCount = 0;
        const resolved = new Array(promises.length);

        promises.forEach((item, index) => {
            item.then((result) => {
                resolved[index] = result;
                if (++successCount === promises.length) {
                    resolveCb(resolved);
                }
            }).catch(err => {
                rejectCb(`following error occured for ${index} index - ${err}`);
            });
        })
    });
}

// success
customAll(promiseList).then(console.log);

// error
customAll(promiseWithErrorList).catch(console.log);

// empty array
customAll([]).then(console.log);

// --------------------------------------------------------------------------------------------------------------------

// recursive
const customAllRecur = (promises) => {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    const [firstPromise, ...rest] = promises;

    return firstPromise.then((data) => {
        return customAllRecur(rest).then((innerData) => {
            return [data, ...innerData];
        })
    })
}

// success
customAllRecur(promiseList).then((d) => console.log("recursive", d));

// error
customAllRecur(promiseWithErrorList).catch((d) => console.log("recursive", d));

// empty array
customAllRecur([]).then((d) => console.log("recursive", d));

// --------------------------------------------------------------------------------------------------------------

// reducer
const customReducerAll = (promises) => {
    return promises.reduce((prev, curr) => {
        return prev.then((data) => {
            return curr.then((innerData) => {
                return [...data, innerData]
            });
        })
    }, Promise.resolve([]));
}

// success
customReducerAll(promiseList).then((d) => console.log("reducer", d));

// error
customReducerAll(promiseWithErrorList).catch((d) => console.log("reducer", d));

// empty array
customReducerAll([]).then((d) => console.log("reducer", d));
