// satisfies 操作符
interface IConf {
    a: number | string
}

const b = {a: 4} satisfies IConf
// 用 satisfies 后，b.a 的类型是根据实际值判定的（number），而不是 IConf 声明的 number | string
console.log("satisfies", b.a.toFixed(2))

// in 操作符
interface RGB {
    red: number;
    green: number;
    blue: number;
}
interface HSV {
    hue: number;
    saturation: number;
    value: number;
}
function setColor(color: RGB | HSV) {
    if ("hue" in color) {
        // color 被推断为 HSV
        console.log(color.value)
    }
    // ...
}

class Person {
    constructor(man: Man) {

    }
}

class Man {

}

// 类型推断
function f2(o: unknown): string {
    // 将 unknown 断言为 object
    if (o && typeof o == 'object') {
        // 断言 o.name 存在且为 string
        if ('name' in o && typeof o.name == 'string') {
            return o.name
        }
    }

    return ''
}
console.log(Number.isNaN(NaN))

// is 类型谓词
function isString(s: unknown): s is string {
    return typeof s === 'string'
}

function ff2(s: unknown) {
    if (isString(s)) {
        return s.toLocaleLowerCase()
    }
}
ff2('abc')

// 函数重载
function overf(a: string, b: string): string;
function overf(a: number): number;
function overf(a: number, b: number): number;
function overf(a: string | number, b?: string | number): string | number {
    if (typeof a === 'string') {
        return a + b
    }

    if (typeof b === 'undefined') {
        return a
    }

    if (typeof a === 'number' && typeof b === 'number') {
        return a + b
    }

    return ''
}

const ffa = overf(23)
const ffb = overf('aa', 'bb')
const ffc = overf(2, 5)

// unknown 类型可以赋值给 {} | null | undefined 类型
function fff(a: unknown, b: {} | null | undefined) {
    b = a
}

// 如何表示任意非 null 类型
// {} 表示非 null 的任何类型（非 null、undefined）
// 等价于 type NonNullable<T> = T extends null|undefined ? never : T（这里 T extends U ? X : Y）是条件类型
type NonNullable<T> = T & {}
const v22: NonNullable<string> = 'adf'

function ff3(...args: any[]) {
    console.log('any args', args)
}
ff3('4', '5', 9)

const myv1:ReturnType<typeof f2> = 'df'

function nf(): number {
    return 1
}
console.log('ffffffff:',  typeof nf)

// infer
type ParamType<T> = T extends (...args: Array<infer P>) => any ? P : T
type Func = (color: RGB) => void
function inferFunc(color: RGB) {

}
const pt: ParamType<typeof inferFunc> = { red: 23, blue:3, green: 45 }
const pt2: ParamType<Func> = pt
const pt3: ParamType<string> = 'dsafa'
// 内置类型
const pt4: ReturnType<typeof f2> = 'faf'
const arr: Array<string> = ['2']
const arr2: Array<Array<number>> = [[1], [2, 5]]

type ConstrType = new (...args: any[]) => any
type ConstructorType<T extends abstract new (args: any) => any> = T extends abstract new (args: infer P) => any ? P : never
const pt5: ConstructorParameters<typeof Person> = [new Man()]
console.log('pt5:', pt5)

type TulpleType<T extends [any, any]> = T extends [infer P, infer P] ? P : never
const ttp: [number, string] = [4, '56']
const pt6: TulpleType<typeof ttp> = 34

type TTuple = [string, number];
type Res = TTuple[number];  // string | number

type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = Foo<{ a: string, b: string }>;  // string
type T11 = Foo<{ a: string, b: number }>;  // string | number

type EleType<T> = T extends any[] ? T[number] : T
type EleType2<T> = T extends Array<infer P> ? P : T
type EleType3<T, K extends keyof T> = T[K]

const tarr: EleType2<number[]> = 45

interface IPerson {
    name: string;
    age: number;
}
type OEType = keyof IPerson
type OEType2 = keyof IPerson[]

let numm: number | null
numm = null

function extend<T extends object, U extends object>(first: T, second: U): T & U {
    const result = <T & U>{}

    for (const k in first) {
        (result as T)[k] = first[k]
    }

    for (const k in second) {
        if (!result.hasOwnProperty(k)) {
            (result as U)[k] = second[k]
        }
    }

    return result
}

const obj1 = { name: 'san', age: 23 }
const obj2 = { love: 'bask' }
const obj3 = extend(obj1, obj2)
console.log(extend(obj1, obj2))

const tsn: never = (() => {
    throw new Error('dd')
})()


export {}