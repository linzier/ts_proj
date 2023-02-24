// 混合

// 定义一个构造函数
type Constructor<T = {}> = new (...args: any[]) => T

/**
 * 混合函数，接收类（构造函数），返回一个继承该类的子类
 * @param base 
 * @returns 
 */
function timestamped<T extends Constructor>(base: T) {
    return class extends base {
        timestamp = Date.now()
    }
}

class User {
    constructor(public name: string) {

    }
}

// 基于 User 类创建新混合类
const TUser = timestamped(User)
const user = new TUser('张三')

console.log(user)