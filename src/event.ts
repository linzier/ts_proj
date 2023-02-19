import { EventEmitter } from 'node:events'

// EventEmitter
class E extends EventEmitter {
    throwErr() {
        this.emit('error', new Error('自己抛出的错误'))
    }
}
const ee = new E({ captureRejections: true })
ee.on('test', (event) => {
    console.log('got emit event:', event)
})
// error 是个特殊事件
ee.on('error', (err) => {
    console.log('ee 有个 error:', err.message)
})
// 使用 async 函数，需要将 captureRejections 设置为 true
ee.on('someasync', async () => {
    throw new Error('在异步函数抛出异常拉')
})
ee.on('someother', async () => {
    throw new Error('在同步函数抛出异常拉')
})
ee.emit('test', { code: 200 })
ee.throwErr()
ee.emit('someasync')
ee.emit('someother')