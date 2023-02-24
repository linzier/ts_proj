// 索引签名
const o: any = {}
const obj = {
    name: '林子',
    toString() {
        return 'obj'
    }
}

// typescript 将对象作为索引签名时，不会自动调 toString()
// o[obj] = 'yes'// 报错
o[obj.toString()] = 'yes'// OK
console.log(o)

interface Iindex {
    [key: string]: number;
    // name: string; // 报错：当提供了索引前面时，所有显式的索引都必须符合索引签名
}

type Indexes = 'a' | 'b' | 'c'
type MyIndex = { [k in Indexes]?: string }
const myIndex: MyIndex = { a: '2', b: '3' }
const iindex: Iindex = { 'a': 1, 'b': 3 }
