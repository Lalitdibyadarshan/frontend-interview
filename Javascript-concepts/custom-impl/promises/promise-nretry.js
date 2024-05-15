const wait = (delay) => {
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, delay);
    })
}

const nRetry = (fn, numOfRetry, delay) => {
    console.log("numOfRetry", numOfRetry);
    return new Promise((resolve, reject) => {
        fn().then(resolve)
        .catch(async (err) => {
            console.log("retry num - ", numOfRetry);

            if (numOfRetry > 0) {
                await wait(delay);

                return nRetry(fn, numOfRetry - 1, delay).then(resolve).catch(reject);
            } else {
                reject(err);
            }  
        })
    })
}

let isErrorCounter = 6;

nRetry(() => {
    isErrorCounter--;
    console.log("isErrorCounter", isErrorCounter);
    if (isErrorCounter) {
        console.log("errrorrrrrrr");
        return Promise.reject("error occured in fn")
    } else {
        return Promise.resolve("completed")
    }
}, 4, 100).then(console.log).catch(console.log)