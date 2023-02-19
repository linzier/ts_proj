import os from 'node:os'

console.log('endianness', os.endianness())
console.log('os.loadavg()', os.loadavg())
console.log('os.networkInterfaces()', os.networkInterfaces())
console.log('os.platform()', os.platform())
console.log('os.tmpdir()', os.tmpdir())
console.log('os.totalmem()', os.totalmem())
console.log('signals.SIGHUP', os.constants.signals.SIGINT)