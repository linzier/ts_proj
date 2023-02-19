import net from 'node:net'

const sock = net.connect({
    path: '/tmp/us.sock',
    onread: {
        buffer: Buffer.alloc(4 * 1024),
        callback: (num, buf: Buffer): boolean => {
            console.log('receive data from server:', buf.toString('utf-8', 0, num))
            return true
        }
    }
}, () => {
    console.log('connected')

    // 发消息
    setInterval(() => {
        sock.write('你好啊')
    }, 2000)
})
