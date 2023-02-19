import http from 'node:http'
import fs from 'node:fs/promises'
import url from 'node:url'
import path from 'node:path'
import util from 'node:util'
import stream from 'node:stream'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.chdir(__dirname)

const data = JSON.stringify({ name: 'hahah' })

// 发送 post 请求
// const req = http.request({
//     host: 'http://www.weicheche.cn',
//     path: '/upload',
//     port: 80,
//     method: 'post',
//     headers: {
//         'Content-Length': Buffer.byteLength(data)
//     }
// }, (res) => {
//     console.log(`status:${res.statusCode}`)
//     res.setEncoding('utf-8')
//     res.on('data', (chunk) => {
//         console.log(chunk)
//     })
//     res.on('end', () => {
//         console.log('-----------end-----------')
//     })
// })

// req.on('error', (err) => {
//     console.log('request error:', err)
// })

// req.on('timeout', () => {
//     console.log('request timeout')
// })

// req.setTimeout(1000)

// req.write(data)
// req.end()

// 创建 HTTP Server
const server = http.createServer(async (req, res) => {
    if (req.url == '/image') {
        res.setHeader('Content-Type', 'image/png')

        const image = await fs.open('./123.png', 'r')
        const imageSt =image.createReadStream()

        // res.write(await image.readFile())

        imageSt.on('data', (data) => {
            const ok = res.write(data)
            if (!ok) {
                imageSt.pause()
            }
        })
        res.on('drain', () => {
            imageSt.resume()
        })
        imageSt.on('end', () => {
            res.end()
            imageSt.close()
            image.close()
        })
        
        // res.end()
        // image.close()
    } else {
        console.log('request url:', req.url, 'headers:',req.headers)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ code: 201 }))
        res.end()
    }
})
server.listen(3000, () => {
    console.log('listen')
})