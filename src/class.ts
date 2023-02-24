
class Foo<T> {
    foo: T
    
    constructor(o: T) {
        this.foo = o
    }
}

/**
 * 实例化泛型 T 为 number
 */
class FooNumber extends Foo<number> {

}

const foo: FooNumber = new Foo(34)

function f<T>(x: T) {
    return x
}

// numbF 取 f 针对 number 的实现
const numbF = f as { (x: number): number; }

