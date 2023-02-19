
(new Promise((resolve) => {
    console.log('---a-')
    resolve('--')
    console.log('----e')
})).then((o) => {
    console.log('----b')
})
console.log('----c')