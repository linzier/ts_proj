import path from 'node:path'
import url from 'node:url'

console.log('PATH', process.env.PATH?.split(path.delimiter))
console.log('basename:', path.basename(url.fileURLToPath(import.meta.url)))
console.log('dirname:', path.dirname(url.fileURLToPath(import.meta.url)))
console.log('ext name', path.extname('index.ts'))
console.log('path format:', path.format({ dir:'/usr/local', name: 'index', ext: '.js' }))
console.log('path is absolute', path.isAbsolute('../abc'))
console.log('path join', path.join('/usr', 'local', 'bin'))
console.log('normalize', path.normalize('/usr/local/bin/../../'))
console.log('parse', path.parse('/home/user/dir/file.txt'))