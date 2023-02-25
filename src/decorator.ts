/**
 * 类装饰器
 * @param C 
 * @returns 
 */
function classDecorator(C: new (...args: any[]) => any) {
    console.log('use classDecorator', C.name)
    return class extends C {
        constructor(...args: any) {
            super(...args)

            console.log('new from decorator')
        }

        [Symbol.toString()]() {
            return "--------I am " + C.name
        }
    }

    return C
}

function paramDecorator(target: object, funcName: string | symbol, paramIndex: number) {
    console.log('param dec:', funcName, paramIndex)
}

function methodDecorator(target: object, funcName: string | symbol, dec: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    console.log('--method dec', dec)

    const orig = dec.value

    dec.value = function (...args: any[]) {
        console.log('==before invoke')
        const rst = orig.call(this, ...args)
        console.log('==after invoke')

        return rst
    }

    return dec
}

@classDecorator
class A {
    constructor(public soo = 3) {

    }

    @methodDecorator
    foo(@paramDecorator name: string) {
        console.log('---invoke func', name, 'soo:', this.soo)
    }
}

const a = new A()
a.foo('sanzi')


export {}