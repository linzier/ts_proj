
function delay(t: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            t === 1000 ? reject('error from d') : resolve(t)
        }, t)
    })
}

// (async () => {
//     console.time('t')
//     await Promise.allSettled([
//         delay(3000),
//         delay(1000),
//         delay(2000)
//     ]).then((values) => {
//         console.log(values)
//     })
//     console.timeEnd('t')
// })()

Promise.race([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('done 1')
            resolve('ok')
        }, 2000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('done 2')
            reject('error')
        }, 1000)
    }),
]).then((result) => {
    console.log('then', result)
}).catch((e) => {
    console.log('catch', e)
})