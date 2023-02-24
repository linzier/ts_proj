class MySet<T> extends Set {
    // 并集
    union(s: Set<T>): Set<T> {
        return new Set([...this, ...s])
    }

    // 差集
    diff(s: Set<T>): Set<T> {
        const r = new Set<T>()
        this.forEach((item) => {
            !s.has(item) && r.add(item)
        })

        return r
    }

    // 交集
    inter(s: Set<T>): Set<T> {
        const r = new Set<T>()
        // 用小集合遍历
        const [small, large] = this.size <= s.size ? [this, s] : [s, this]
        small.forEach((item) => {
            large.has(item) && r.add(item)
        })

        return r
    }
}

const m1 = new MySet<string>(['a', 'b', 'c'])
const m2 = new MySet<string>(['a', 'b', 'd', 'e'])

console.log('m1 union m2:', m1.union(m2))
console.log('m1 diff m2:', m1.diff(m2))
console.log('m1 inter m2:', m1.inter(m2))

// 判断两个集合是否相等
function isTheSameSet(set1: Set<unknown>, set2: Set<unknown>): boolean {
    if (set1.size != set2.size) {
        return false
    }

    return [...set1].every((val) => {
        return set2.has(val)
    })
}