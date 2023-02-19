import zlib from 'node:zlib'
import url from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import stream from 'node:stream'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.chdir(__dirname)

const gzip = zlib.createGzip()
const readSt = (await fs.open('./test3.txt', 'r')).createReadStream()
const writeSt = (await fs.open('./test3.gz', 'w')).createWriteStream()

// 管道处理
stream.pipeline(readSt, gzip, writeSt, (err) => {
    if (err) {
        console.log('pipeline fail', err)
    }
})
