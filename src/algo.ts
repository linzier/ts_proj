// chunck 数组，如 [1, 2, 3, 4, 5, 6, 7] -> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]
// 可以用循环或者递归实现
// 这里的递归存在内存问题
function chunk(arr: unknown[], n: number): unknown[][] {
    if (arr.length === 0) {
        return []
    }

    if (arr.length <= n) {
        return [arr]
    }

    return [arr.slice(0, n), ...chunk(arr.slice(n), n)]
}

// 用循环实现
function chunk2<T>(arr: T[], num: number): T[][] {
    if (arr.length <= num) {
        return [arr]
    }
    
    const result = []
    let i = 0
    const len = arr.length
    while (i < len) {
        result.push(arr.slice(i, i + num))

        i += num
    }

    return result
}

// 用尾递归实现
function chunk3(arr: unknown[], num: number): unknown[][] {
    return innerChunk3(arr, num)
}

function innerChunk3(arr: unknown[] , num: number, i: number = 0, result: unknown[][] = []): unknown[][] {
    // 尾递归的特点：在函数终止处返回最终结果
    if ( i > arr.length) {
        return result
    }

    // 中间步骤
    // 尾递归每次生成一个中间结果，并将该中间结果传给下一个步骤使用
    return innerChunk3(arr, num, i + num, result.concat([arr.slice(i, i + num)]))
}

// const arr = new Array(1000).fill(1, 0, 1000)
// console.time('chunk1')
// chunk(arr, 2)
// console.timeEnd('chunk1')

// console.time('chunk2')
// chunk2(arr, 2)
// console.timeEnd('chunk2')

// const arr = [1, 2, 3, 4, 5, 6, 7]
// console.time('chunk3')
// console.log(chunk3(arr, 2))
// console.timeEnd('chunk3')

// 合并两个数组
// 如 [1, 2, 3] 和 [4, 5, 6] 合并成 [[1, 2], [3, 4], [5, 6]]
// 可以用循环或者递归实现
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
    if (arr1.length != arr2.length || !arr1.length || !arr2.length) {
        return []
    }

    const [first1, ...other1] = arr1
    const [first2, ...other2] = arr2

    return [[first1, first2], ...zip(other1, other2)]
}
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
// console.log(zip(arr1, arr2))

// 斐波那契函数
// 尾递归实现
function fibonacci2 (n: number, start = 1, total = 1): number {
    if(n <= 2){
        return total
    }
    return fibonacci2 (n -1, total, total + start)
}
// console.time('go')
// const fb1 = fibonacci2(10000)
// console.timeEnd('go')
// console.log('fb1:', fb1)

// 斐波那契函数
// 普通递归实现
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
// console.time('go2')
// const fb2 = fibonacci(1000)
// console.timeEnd('go2')
// console.log('fb2:', fb2)

// 斐波那契函数
// 普通循环实现
function fibonacci3(n: number): number {
    if (n < 3) {
        return 1
    }

    let p1 = 1, p2 = 1, curr = 0
    for (let i = 2; i < n; i++) {
        curr = p1 + p2 
        p1 = p2
        p2 = curr
    }

    return curr
}
// console.time('go3')
// const fb3 = fibonacci3(1000)
// console.timeEnd('go3')
// console.log('fb3:', fb3)

// 阶乘。普通递归实现
// 循环不变式：f(n) = n * f(n-1)（如5!=5*4!）
function factorial(n: number): number {
    if (n < 2) {
        return 1
    }

    return n * factorial(n-1)
}
// console.time('factorial')
// const f4 = factorial(1000)
// console.timeEnd('factorial')
// console.log('f4:', f4)

// 阶乘。普通循环实现
function factorial2(n: number): number {
    let x = 1
    for (let i = 1; i <= n; i++) {
        x *= i
    }

    return x
}
// console.time('factorial2')
// const f5 = factorial2(1000)
// console.timeEnd('factorial2')
// console.log('f5:', f5)

// 阶乘。尾递归实现
function jiecheng(n: number, result: number = 1): number {
    if (n == 1) {
        return result
    }

    return jiecheng(n - 1, result * n)
}
// console.time('f3')
// const rst11 = jiecheng(10)
// console.timeEnd('f3')
// console.log(rst11)

// n 从 1 开始。f(n) = f(n-1) + f(n-2)
function febo(n: number, prev2: number = 1, prev1: number = 1): number {
    if (n < 3) {
        return prev1
    }

    return febo(n - 1, prev1, prev2 + prev1)
}
// console.time('f1')
// console.log(fibonacci3(1000))
// console.timeEnd('f1')

// console.time('f2')
// console.log(febo(100))
// console.timeEnd('f2')

/**
 * 版本号排序
 */
let arr = ['2.3.3', '2.10.2']
const arr22 = arr.map((item) => {
    return item.split('.').map((ele) => {
        return Number(ele)
    })
})

arr22.sort((ele1, ele2) => {
    for (const i in ele1) {
        if (ele1[i] == ele2[i]) {
            continue
        }

        return ele2[i] - ele1[i]
    }

    return 0
})
arr = arr22.map((item) => {
    return item.join('.')
})

// [['热', '冷''], ['大', '中'], ['辣', '微辣', '不辣']]  => 热+大，热+中，冷+大，冷+中
function compose(arr: string[][]): string[] {
    return innerCompose(arr, 1, arr[0])
}

function innerCompose(arr: string[][], i: number = 0, result: string[] = []): string[] {
    if (i === arr.length) {
        return result
    }

    // 生成本步骤的结果
    const currRst = []
    for (const v of arr[i]) {
        for (const v2 of result) {
            currRst.push(v2 + v)
        }
    }

    return innerCompose(arr, i + 1, currRst)
}

// const orig = [['热', '冷'], ['大', '中'], ['辣', '微辣', '不辣']]
// console.time('compose')
// const rst = compose(orig)
// console.timeEnd('compose')
// console.log(rst)

// 二分搜索
function binSearch<T>(arr: T[], ele: T): number {
    if (arr.length === 0) {
        return -1
    }

    if (arr.length === 1) {
        return arr.pop() === ele ? 0 : -1
    }

    let left = 0
    let right = arr.length - 1

    do {
        // 取中间位置
        let index = left + Math.floor((right - left)/2)
        // 找到了
        if (arr[index] === ele) {
            return index
        }

        // 注意这里移动 left 或者 right 的时候，需要+1个或者减一个，以跳过已经比较的当前元素（index）
        // 这样还能防止当 left/right 与 index 重叠时导致的无限循环
        ele > arr[index] ? left = index + 1 : right = index - 1
    } while(left <= right)

    return -1
}

// const arr6 = [1, 2, 3, 5, 6, 7, 8, 12, 15, 19, 29, 40, 80, 120]
// const rst = binSearch(arr6, 1)
// const rst2 = binSearch(arr6, 120)
// console.log(rst, rst2)

function thousands(num: number): string {
    if (num < 1000) {
        return String(num)
    }

    let ret = 0
    const arr = []
    while (num != 0) {
        ret = num % 1000
        arr.push(ret < 100 ? String(ret).padStart(3, '0') : String(ret))

        num = Math.floor(num / 1000)
    }

    arr[arr.length - 1] = parseInt(arr[arr.length - 1]).toString()

    return arr.reverse().join(',')
}

// console.log(thousands(123456007))
// const a = BigInt('128994923923832883')
// const b = BigInt('128994923923832881')
// console.log(a+b)

// 实现升序排序的插入排序
function insertSort<T>(arr: T[]) {
    if (arr.length < 2) {
        return
    }

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] >= arr[j - 1]) {
                break;
            }

            // 如果当前位置的值小于前面的值，则交换
            const x = arr[j]
            arr[j] = arr[j - 1]
            arr[j - 1] = x
        }
    }
}
// const arr7 = [5, 6, 2, 1, 8, 3, 9, 4]
// insertSort(arr7)
// console.log(arr7)

// 归并排序
// 将 arr 一分为二，分别对两边执行排序，然后对排好序的两部分执行合并操作
function mergeSort<T>(arr: T[]) {
    innerMergeSort(arr, 0, arr.length - 1)
}

// 为了防止频繁 slice 导致数组元素浅拷贝，我们用下标来表示子数组
// 该函数能对子数组 arr[start:end] 执行归并排序
function innerMergeSort<T>(arr: T[], start: number, end: number) {
    // 子数组只有一个元素，不需要排了
    if (start >= end) {
        return
    }

    // 将子数组一分为二
    const mid = start + Math.floor((end - start) / 2)
    // 对左子数组执行归并排序
    innerMergeSort(arr, start, mid)
    // 对右子数组执行归并排序
    innerMergeSort(arr, mid + 1, end)

    // 将排好序的两部分子数组合并
    innerMerge(arr, start, mid, end)
}

function innerMerge<T>(arr: T[], start: number, mid: number, end: number) {
    // 创建一个临时数组用于存储合并中间结果
    const tmpArr = new Array<T>(end - start + 1)
    let leftPoint = start
    let rightPoint = mid + 1
    for (let i = 0; i < tmpArr.length; i++) {
        if (leftPoint > mid) {
            // 左边数组用完了，只能用右边的
            tmpArr[i] = arr[rightPoint]
            rightPoint++
            continue
        } else if (rightPoint > end) {
            // 右边数组用完了，只能用左边的
            tmpArr[i] = arr[leftPoint]
            leftPoint++
            continue
        }

        // 两边子数组元素都没有用完
        if (arr[leftPoint] <= arr[rightPoint]) {
            tmpArr[i] = arr[leftPoint]
            leftPoint++
        } else {
            tmpArr[i] = arr[rightPoint]
            rightPoint++
        }
    }

    // 将 tmpArr 的值复制回去
    arr.splice(start, end - start + 1, ...tmpArr)
}
// const arr8 = [5, 6, 2, 1, 8, 3, 9, 4, 2, 5, 7, 23, 12, 15, 13, 20]
// mergeSort(arr8)
// console.log('merge sort:', arr8)

// 快速排序
// 原址排序
function quickSort<T>(arr: T[]) {
    innerQuickSort(arr, 0, arr.length - 1)
}

// 该函数能对 arr[start:end] 子数组执行快排
function innerQuickSort<T>(arr: T[], start: number, end: number) {
    // 只剩一个时无需排序了
    if (start >= end) {
        return
    }

    // 从 arr 中随机取一个元素，然后让所有小于等于该值的元素放在其左边，大于它的放在其右边
    const index = start + Math.floor(Math.random() * (end - start))
    const ele = arr[index]

    // 实现原址排序
    // 我们尽量将小于等于 ele 的元素往左边放，大于它的往右边放
    // 所以我们定义两个游标，left 游标左边的元素都小于等于 ele；right 游标右边的元素都大于 ele

    // 为了满足 left、right 的定义，我们先将 ele 临时放到数组最后面（即和最后一个元素交换位置。防止 ele 所在的位置不满足要求）
    let tmp = arr[end]
    arr[end] = ele
    arr[index] = tmp

    let left = start
    let right = end - 1

    // left 和 right 在一次循环中最多只能有一个移动，保证不会导致 right < left
    while (left < right) {
        if (arr[left] <= ele) {
            // 当前位置的值满足条件，left 指针直接后移
            left++
            continue
        }

        if (arr[right] > ele) {
            // right 位置的值满足条件，right 指针直接前移
            right--
            continue
        }

        // 走到这里，说明 left 和 right 位置的值应该互换
        tmp = arr[left]
        arr[left] = arr[right]
        arr[right] = tmp
    }

    // 至此，left 和 right 重叠
    // 如果 left 位置的值大于 ele 则和 ele 交换，否则用 left + 1 位置的值和 ele 交换
    // 因为 right 是从 end - 1 开始移动的，所以 left + 1 不会越界（顶多是最后一个元素也就是 ele 自身）
    const idx = arr[left] > ele ? left : left + 1
    tmp = arr[idx]
    arr[idx] = ele
    arr[end] = tmp

    // 再对 idx 左右两边的子数组分别执行快排
    innerQuickSort(arr, start, idx - 1)
    innerQuickSort(arr, idx + 1, end)
}
// let arr9 = [5, 6, 2, 1, 8, 3, 9, 4, 2, 5, 7, 23, 12, 15, 13, 20]
// arr9 = Array.from({ length: 50 }, (val) => {
//     return Math.floor(Math.random() * 100)
// })
// console.log('before quick sort:', arr9)
// console.time('quicksort')
// quickSort(arr9)
// console.timeEnd('quicksort')
// console.log('quick sort:', arr9)

export {}