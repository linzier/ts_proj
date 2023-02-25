import buf from 'node:buffer'
import fs, { WriteStream } from 'node:fs'
import path from 'node:path'
import url from 'url'
import { setTimeout as sleep } from 'node:timers/promises'
import fetch from 'node-fetch'
import { MessageChannel } from 'node:worker_threads'
import { Console } from 'node:console'
import util from 'util'

// Buffer
const b = buf.Buffer.from('你好')
const utf16 = buf.transcode(b, 'utf8', 'utf16le')
console.log('to utf16', utf16.toString('utf16le'))
console.log('Buffer max length:', buf.constants.MAX_LENGTH)
console.log('byte len for utf-8', buf.Buffer.byteLength('你好', 'utf-8'))
console.log('byte len for utf-8', buf.Buffer.byteLength('你好', 'utf16le'))

// 迭代
for (const v of b) {
    console.log('b value:', v.toString(2))
}

// 当前文件和目录
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log('filename:', __filename)
console.log('dirname:', __dirname)

// Blob
const blob = new Blob(['你好'])
console.log('blob size:', blob.size)
console.log('blob to string:', await blob.text())

// AbortController
const ac = new AbortController()
ac.signal.addEventListener('abort', (event) => {
    console.log('aborted:', event.type)
})
ac.abort()
AbortSignal.timeout(1000).addEventListener('abort', (event) => {
    console.log('timeout aborted:', event.type)
})
sleep(1200)

// http 请求
const resp = await fetch('https://api.juejin.cn/tag_api/v1/query_category_briefs')
console.log('resp:', await resp.json())

// MessageChannel（对应地还有广播通信的 BroadcastChannel）
const { port1, port2 } = new MessageChannel()
port1.on('message', (message) => {
    console.log('port1 got message:', message)
    port1.close()
})
port2.postMessage('hello mesg')
port2.close()


// Console
// 平时用的 console 其实就是 Console 类的一个实例
const out = fs.createWriteStream('./out.log')
const err = fs.createWriteStream('./err.log')
const logger = new Console(out, err)
logger.log('write a log')
logger.error('write a error')
logger.assert(false, 'write if false')
// 以 table 格式打印
console.table([{a:'one', b:'1'}, {a:'two', b:'2'}])
// 打印用了多久时间
console.time('test111')
sleep(1000)
console.timeEnd('test111')
// 打印调用栈信息
console.trace()

// util
console.log('util.types.isDate()', util.types.isDate(new Date()))

/**
 * process
 */
process.on('beforeExit', (code: number) => {
    console.log("process before exist", code)
})
process.on('exit', (code: number) => {
    console.log('process exist:', code)
})
// 当出现未捕获的异常时触发
process.on('uncaughtException', (err: Error) => {
    console.log('got uncaught exception:')
})
// throw new Error('hahahah----')

// CPU 架构
console.log('CPU arch:', process.arch)
// 读取命令行参数
process.argv.forEach((val) => {
    console.log('argv:', val)
})
// 环境变量
console.log('process.env:', process.env)
console.log('process.execPath', process.execPath)
// 改变当前工作目录
const oldDir = process.cwd()
console.log('old curr dir:', oldDir)
process.chdir('/tmp')
console.log('new curr dir:', process.cwd())
process.chdir(oldDir)
// console.log('node.js config:', process.config)
// process.stdin.resume()
// console.log('CPU usage:', process.cpuUsage())
// // 捕获信号
process.on('SIGINT', (signal) => {
    console.log('Received ', signal)
})
// process.on('SIGTERM', (signal) => {
//     console.log('Received ', signal)
//     process.exit()
// })
// 给其他进程发信号
process.kill(process.pid, 'SIGINT')
// 设置名字
process.title = 'my node process'

setTimeout(() => {
    process.exit(0)
}, 3000)

function f() {
    console.log('================ddd')
}
f()