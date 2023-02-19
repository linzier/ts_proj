import crypto from 'node:crypto'

const secret = '1234'
const message = 'hello'

// sha256 hash 摘要认证
const str = crypto.createHmac('sha256', secret).update(message).digest('hex')
console.log('sha256', str)
console.log('md5', crypto.createHmac('md5', secret).update(message).digest('hex'))

// 只需要摘要
console.log('sha256 3', crypto.createHash('sha256').update('hello').digest('hex'))
console.log('sha256 4', crypto.createHash('sha256').update('world').digest('hex'))
console.log('md5 2', crypto.createHash('md5').update('world').digest('binary').length)

// 生成 uuid
console.log('uuid:', crypto.randomUUID())

// 随机 int
console.log('random int:', crypto.randomInt(1, 100))

// 随机 byte
console.log('random byte:', crypto.randomBytes(256).toString('hex'))

// 生成密码
console.log('password', crypto.scryptSync('mypassword', 'abd897asdf343', 64).toString('base64'))