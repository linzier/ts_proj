// 定义一个复杂对象
const obj = {
    obj: {
        children: {
            a: 1
        }
    }
}

const objProxy = new Proxy(obj, {
    get(target, property, receiver){
        console.log('-- target --', property, receiver)
        return Reflect.get(target, property, receiver)
    },

    set(target, property, value, receiver) {
        console.log('-- set --')
        return Reflect.set(target, property, value, receiver)
    }
})

// Proxy 和 Reflect 结合使用
const obj2 = {name: 'sanzi', func() {console.log('fc')}}
const p = new Proxy(obj2, {
    get(target, property, receiver) {
        console.log('get', property)
        return Reflect.get(target, property)
    },
    set(target, property, newValue, receiver): boolean {
        console.log('set', property)

        return Reflect.set(target, property, newValue)
    }
})
// console.log(p.name)
// p.name = '李四'
// console.log(p.name)
// p.func()

Reflect.defineProperty(obj2, 'test', { enumerable: false, value: 'two' })
// console.log(Reflect.get(obj2, 'test'))
// console.log(JSON.stringify(obj2))

// console.log(9007199254740991n + 100000n)

export {}