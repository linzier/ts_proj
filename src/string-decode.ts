import decoder from 'node:string_decoder'

const dc = new decoder.StringDecoder('utf-8')

// e4 b8 ad e5 9b bd
console.log(Buffer.from('中国').toString('hex'))

dc.write(Buffer.from([0xE4, 0xB8, 0xAD, 0xE5]))
dc.write(Buffer.from([0x9B, 0xBD]))
console.log('end 1:', dc.end())
