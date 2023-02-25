enum En {
    F = '',
}

const s: En = 'df' as En

function ffa() {
    let cnt = 0
    return () => {
        return cnt++
    }
}

const { count } = new class {
    private cnt = 0

    count = () => {
        return this.cnt++
    }
}()

// const func = f()
// console.log(func())
// console.log(func())
// console.log(func())
// console.log(func())

// console.log(count())
// console.log(count())
// console.log(count())
// console.log(count())

const func = (x: number) => (y: number) => x + y
console.log(func(3)(4))
