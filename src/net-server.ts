import net from 'node:net'
import fs from 'fs/promises'

const server = net.createServer((sock) => {
    console.log('connect come.addr:', sock.remoteAddress, 'port:', sock.remotePort)
    // 监听新连接的事件
    sock.setEncoding('utf-8')
    sock.on('data', (data) => {
        console.log('got data from client:', data)
        sock.write('received:' + data)
    })

    sock.on('error', (err) => {
        console.log('sock error:', err)
    })
    sock.on('end', () => {
        console.log('sock end')
    })
})

server.on('error', (err) => {
    console.log('server error', err)
})

server.on('close', () => {
    try {
        fs.unlink('/tmp/us.sock')
        console.error('unlink sock file suc:')
    } catch (e) {
        console.error('unlink sock file fail:', e)
    }
})

process.on('SIGINT', () => {
    console.log('got SIGINT')
    try {
        fs.unlink('/tmp/us.sock')
        console.error('unlink sock file suc:')
    } catch (e) {
        console.error('unlink sock file fail:', e)
    } finally {
        process.exit(0)
    }
})

/**
 * 创建 TCP 连接
 */
// server.listen(4000, () => {
//     console.log('listen on 4000')
// })

/**
 * 创建 Unix Socket
 * 终端运行：nc -U /tmp/us.sock
 */
server.listen('/tmp/us.sock', () => {
    console.log('listen on unix socket')
})

// console.log('is IP:', net.isIP('127.0.0.1'))