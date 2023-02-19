/**
 * master-worker 模式
 */
import express, { Request, Response } from 'express'
import cluster, { Worker } from 'node:cluster'
import os from 'node:os'

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
    // 主进程，fork 并管理工作进程
    cluster.on('exit', (worker: Worker, code: number, signal: string) => {
        console.log(`worker ${worker.process.pid} exit.code:${code}, signal:${signal}, will restart...`)
        const newWorker = cluster.fork()
        console.log(`new worker ${newWorker.process.pid} run.`)
    })

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    // worker 进程，每个进程启动单独的 http server，监听同一个端口
    const app = express()

    app.use((req: Request, res: Response) => {
        res.send("hello,response by " + process.pid)
        // 以一定的概率退出
        if (Math.random() > 0.5) {
            console.log(`${process.pid} throw error`)
            process.exit(4)
        }
    })

    app.listen(9000, () => {
        console.log(`process ${process.pid} run, listen on 9000`)
    })
}
