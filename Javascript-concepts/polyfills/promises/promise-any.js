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
    asyncTask(3),
    asyncTask(6)
]

const errorList = [
    asyncTask(10),
    asyncTask(10),
    asyncTask(10),
    asyncTask(10),
    asyncTask(10)
]

const customPromiseAny = (promises) => {
    return new Promise((res,rej) => {
        const error = new Array(promises.length);
        let errorCount = 0;
        promises.forEach((curr, i) => {
            curr.then(res).catch(e => {
                error[i] = e;
                errorCount++;
                if (errorCount===promises.length) {
                    rej(error)
                }
            });
        })
    });
}

// success
customPromiseAny(promiseList).then(console.log);

// error
customPromiseAny(promiseWithErrorList).then(console.log);

// all error
customPromiseAny(errorList).catch(console.log);

// empty array
customPromiseAny([]).then(console.log);