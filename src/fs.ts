/**
 * 文件系统的所有 API 都有三种风格：同步、回调、promise
 */
// import fs from 'node:fs'// 回调和同步风格 API
import fs, { FileHandle, FileReadResult } from 'node:fs/promises'// promise 风格 API
import url from 'node:url'
import path from 'node:path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.chdir(__dirname)

let fileHandle!: FileHandle

try {
    fileHandle = await fs.open('test.txt', 'w')

    await fileHandle.writeFile('你好啊 你好啊')
} finally {
    await fileHandle?.close()
}

// read
try {
    fileHandle = await fs.open('test.txt', 'r')

    console.log('file size:', (await fileHandle.stat()).size)

    let rst: FileReadResult<Buffer>
    const buff = Buffer.alloc(1024)
    let offset = 0

    while (true) {
        rst = await fileHandle.read(buff, offset, 8)
        if (!rst.bytesRead) {
            break
        }

        offset += rst.bytesRead
    }

    console.log('read file cont:', buff.toString('utf-8', 0, offset))
} finally {
    // 一定要 close
    await fileHandle?.close()
}

// readFile
try {
    fileHandle = await fs.open('test.txt', 'r')

    // 读取整个文件
    console.log('readFile:', await fileHandle.readFile({ encoding: 'utf-8' }))
} finally {
    await fileHandle?.close()
}

// readLines
try {
    fileHandle = await fs.open('test.txt', 'r')

    // 读取一行
    for await (const line of fileHandle.readLines()) {
        console.log('---line:', line)
    }
} finally {
    await fileHandle?.close()
}

// 截短文件
// try {
//     fileHandle = await fs.open('test.txt', 'r+')

//     await fileHandle.truncate(9)
// } finally {
//     await fileHandle?.close()
// }

// write 从 Buffer 写数据
try {
    fileHandle = await fs.open('test2.txt', 'w')

    let woffset = 0
    const wBuff = Buffer.from('你好世界我是谁')
    let remain = wBuff.length

    while (true) {
        const rst = await fileHandle.write(wBuff, woffset, remain > 2 ? 2 : remain)
        woffset += rst.bytesWritten
        remain -= rst.bytesWritten
        if (woffset >= wBuff.length) {
            break
        }
    }
} finally {
    await fileHandle?.close()
}

// copyFile
try {
    fs.copyFile('test.txt', 'test3.txt')
    console.log('copy test.txt to test3.txt')
} catch {
    console.error('copy fail')
}

// cp 拷贝整个目录
// fs.cp(...)

// mkdir 创建目录
try {
    fs.mkdir('./test/dir/', { recursive: true })
} catch {
    console.error('mkdir fail')
}

// 打开目录
try {
    const dir = await fs.opendir('./')
    // 迭代目录
    for await (const ent of dir) {
        console.log('opendir:', ent.name, 'is file:', ent.isFile())
    }
} catch {

}

// readdir
try {
    const dir = await fs.readdir('./')
    for (const file of dir) {
        console.log('readdir:',file)
    }
} catch {
    
}

// watch 监听文件修改
// try {
//     const w = fs.watch('./', { recursive: true })
//     for await (const event of w) {
//         console.log('watch:', event)
//     }
// } catch (e) {
//     console.log('watch error:', e)
// }