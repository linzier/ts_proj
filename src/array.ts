// 打平，如 [[1, 2, 3]] =》[1, 2, 3]
function flatten(arr: unknown[]) {
    return ([] as unknown[]).concat(...arr)
}

// console.log(flatten([[1, 2, 3]]))

const arr1 = [1, 3, 5, 7]
// reduce 的使用
// p1 是上次执行 reduce 的返回值，如果是第一次执行，则取数组第一个元素
const sum = arr1.reduce((p1, p2) => {
    return p1 + p2
})
// console.log(sum)

// 斐波那契函数
// n 从 1 开始
const m = new Map()
function fibonacci(n: number): number {
    if (n < 3) {
        return 1
    }

    if (m.has(n)) {
        return m.get(n)
    }

    const v = fibonacci(n - 1) + fibonacci(n - 2)
    m.set(n, v)

    return v
}
// for (let i = 1; i <= 100; i++) {
//     console.log('fibonacci:', fibonacci(i))
// }

const arr = 'My name ::. is::Jerry.los. My age is:12.'.matchAll(/:([^:.]+)\./g)
for (const a of arr) {
    // console.log(a[1])
}
// console.log(arr)

// 使用生成器将数组拍平
const arr2 = [1, [[2], 3, 4], 5]
function* flatten2(arr: unknown[]): Generator {
    for (let i = 0; i < arr.length; i++) {
        !Array.isArray(arr[i]) ? yield arr[i] : yield* flatten2(arr[i] as unknown[])
    }
}
const gen = flatten2(arr2)
console.log('gen val:', gen.next().value)
console.log('gen val:', gen.next().value)
console.log('gen val:', gen.next().value)
console.log('gen val:', gen.next().value)
console.log('gen val:', gen.next().value)

// 判断两个集合是否相等
function isTheSameSet(set1: Set<unknown>, set2: Set<unknown>): boolean {
    if (set1.size != set2.size) {
        return false
    }

    return [...set1].every((val) => {
        return set2.has(val)
    })
}

const set1= new Set()
const set2= new Set()
// console.log('is the same set:', isTheSameSet(set1, set2))

// 数组去重
function unique(arr: unknown[]): unknown[] {
    return [...new Set(arr)]
}
const arr3 = [1, 1, 'aa', 4, 'aa', 5, 6, 5]
console.log(unique(arr3))

// 过滤
const arr4 = [1,2,3,4, 5]
// 返回偶数
console.log('filter:', arr4.filter((item) => !(item & 1)))

// 获取元素的位置
const arr5 = ['a', '3', 5]
console.log('indexOf:', arr5.indexOf('3'))

console.log('toString:', arr4.toString())

console.log('shift', arr4.shift())

// 数组排序
const arr6 = [10, 2, 15, 3]
arr6.sort()
console.log('sort:', arr6)// 默认的 sort 行为是将数组中元素转成字符串，对字符串进行排序，此处不是我们想要的
arr6.sort((a, b) => a - b)// 指定排序函数
console.log('sort 2:', arr6)

let arr7: (string | number)[] = [1,2,3,4,5]
arr7.splice(1, 2)// 从下标 1 开始删掉两个元素
console.log('splice 1:', arr7)// [1, 4, 5]
arr7 = [1,2,3,4,5]
arr7.splice(1, 2, 'a', 'b')
console.log('splice 2:', arr7)

arr7 = [1,2,3,4,5]
arr7.reverse()
console.log('reverse:', arr7)

// some
arr7 = [2, 4, 5, 6, 8]
console.log('some:', arr7.some((ele) => (ele as number) & 1))// 只要有一个是奇数就行
console.log('every:', arr7.every((ele) => (ele as number) & 1))// 必须全部是奇数

// includes
console.log('includes:', arr7.includes(5))

// 返回符合测试条件的第一个元素
console.log('find:', arr7.find((ele) => ele > 5))
// 返回符合测试条件的第一个元素的索引
console.log('findIndex:', arr7.findIndex((ele) => ele > 5))

// fill
arr7.fill(0)
console.log('fill:', arr7)

let arr8 = [1, [2, [3, [4, 5], 6, [7, 8]]], 9, [[[10]]]]
arr8 = arr8.flat(100)
console.log('flat:', arr8)

// flatMap
let arr9 = ['I am linvanda', 'I come from China']
arr9 = arr9.flatMap((ele) => ele.split(' '))
console.log('flatMap:', arr9)

export {}