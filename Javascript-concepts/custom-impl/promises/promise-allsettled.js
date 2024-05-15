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

const customAllSettle = (promises) => {
    return promises.reduce((prev, curr) => {
        return prev.then(d1 => {
            return curr.then(d2 => {
                return [...d1, {status: "fulfilled", value: d2}];
            }).catch(e2 => {
                return [...d1, {status: "rejected", value: e2}]
            });
        })
    }, Promise.resolve([]));
}

// success
customAllSettle(promiseList).then(console.log);

// error
customAllSettle(promiseWithErrorList).then(console.log);

// empty array
customAllSettle([]).then(console.log);

const customAllSettle2 = (promises) => {
    const mappedPromises = promises.map(p => 
        p.then(
            d => ({status: "fulfilled", value: d}), 
            e => ({status: "rejected", reason: e})
        )
    )

    return Promise.all(mappedPromises);
};

// success
customAllSettle2(promiseList).then(console.log);

// error
customAllSettle2(promiseWithErrorList).then(console.log);

// empty array
customAllSettle2([]).then(console.log);