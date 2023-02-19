import fs from 'node:fs/promises'
import url from 'node:url'
import path from 'node:path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.chdir(__dirname)

// 模拟触发背压
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
const writer = (await fs.open('./test3.txt', 'w')).createWriteStream()
const data = 'hello'
const callback = (err: Error | null | undefined) => {
    if (err) {
        console.error('write err')
    }

    console.log('write finished')
} 

let i = 1000000;
write();

/**
 * 会被调多次
 */
function write() {
    console.log('begin to write')

    let ok = true;
    do {
        i--;
        if (i === 0) {
            // Last time!
            writer.write(data, 'utf-8', callback);
        } else {
            // See if we should continue, or wait.
            // Don't pass the callback, because we're not done yet.
            // OK == false 表示写缓冲区满了，需要暂停写入
            ok = writer.write(data, 'utf-8');
        }
    } while (i > 0 && ok);

    if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        // 如果没写完，则在 drain 事件（写缓冲区空）中继续写入（注册一次性事件）
        writer.once('drain', write);
    }
}