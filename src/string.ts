let s = 'abc中国ac'

console.log('charAt:', s.charAt(3))
console.log('charCodeAt:', s.charCodeAt(3))// Unicode 码
console.log('indexOf:', s.indexOf('a'))
console.log('lastIndexOf:', s.lastIndexOf('a'))
console.log('\u4e2d', Buffer.from('\u4e2d').toString('utf-8'))// 两种写法都能打印“中”
console.log("\u{20BB7}")// 码点放在大括号里面
console.log((20013).toString(16), 20013..toString(16))// 10 进制转 16 进制。数字用括号或者两个点
console.log(s.length)// 字符数
console.log(Buffer.byteLength(s))// 字节数
console.log(s.concat('cd', 'ef', '美丽'))// 字符串拼接
console.log('match:', '1a2b5'.match(/\d+/g))
console.log('replace:', s.replace('abc', 'ABC'))
console.log('search:', s.search('ac'))

let s2 = "𠮷"
console.log('𠮷 length:', s2.length)// 2。js内部是 UTF-16 编码的，𠮷 要用 4 个字节（两个 UTF16）存储，得到 length 是 2
s2 = '𠮷ac'
console.log('𠮷ac length:', s2.length)// 4
// 如何获取正确的长度(或者用 for of 循环也行)
console.log('𠮷ac length 2:', [...s2].length)// 3
// 获取正确的码点
for (const c of s2) {
    console.log('c point code:', c.codePointAt(0))
}

// 和 charCodeAt 一样，fromCharCode 不能处理 U+FFFF 以上的字符（因为底层是 UTF-16）
// ES6 的 codePointAt 和 fromCodePoint 弥补了此不足
// 所以现在仅使用 codePointAt 和 fromCodePoint
console.log('fromCharCode:', String.fromCharCode(134071))// 打不出来
console.log('fromCodePoint:', String.fromCodePoint(134071))// 正确

/**
 * 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。
 * 一种是直接提供带重音符号的字符，比如Ǒ（u01D1）。另一种是提供合成符号（combining character），
 * 即原字符与重音符号的合成，两个字符合成一个字符，比如O（u004F）和ˇ（u030C）合成Ǒ（u004Fu030C）。
 * 这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。​​​​​​​
 * ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化
 */
console.log('normalize:', '\u01D1'.normalize() === '\u004F\u030C'.normalize())
console.log('normalize 2:', '\u004F\u030C'.normalize())

// 按字符遍历字符串
for (const v of s) {
    console.log('for:', v)
}

// 取子串
console.log('slice:', s.slice(3, 5))
// 拆分成字符串数组
console.log('split:', s.split('', 3))
// 转换大小写
console.log(s.toLocaleUpperCase())
console.log(s.substring(3, 5))

console.log('includes:', s.includes('中'))
console.log('startsWith:', s.startsWith('a'))
console.log('endsWith:', s.endsWith('c'))

console.log('repeat:', 'ab'.repeat(3))
console.log('padStart:', 'x'.padStart(10, '-'))
console.log('padEnd:', 'x'.padEnd(10, '-'))
console.log('pad:', (1234).toString(2).padStart(32, '0'))

console.log('...str', [...'abcde中国人𠮷'])// split() 不能正确处理双字节以上的码点
console.log('slice:', [...'e中国𠮷f'].slice(3, 4).join(''))// 直接对字符串 slice 不能正确处理双字节以上的码点

export {}