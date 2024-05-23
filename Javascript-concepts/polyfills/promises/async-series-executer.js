const asyncTask = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("resolved", time);
            resolve(`completing ${time}`);
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

promiseList.reduce((prev, curr) => {
    return prev.then((data) => {
        console.log("data", data);
        return curr.then(d => {
            console.log("---",data, d);
            return d;
        })
    })


}, Promise.resolve());
