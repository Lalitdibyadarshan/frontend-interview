/**
 * `.then(k => console.log("====", k))` will wait till inner promise is resolved, i.e. after 10secs
 * 
 */
Promise.resolve(1).then((d) => {
    return new Promise((res) => {
        setTimeout(() => res(8), 10000)
    })
}).then(k => k + 1)
.then(console.log); // 9

