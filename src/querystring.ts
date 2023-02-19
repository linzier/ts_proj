import querystring from 'node:querystring'

console.log('parse:', querystring.parse('ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=typescript%20!%3A&fenlei=256&oq=fs.open%2520%25E5%259C%25A8%25E8%25B5%258B%25E5%2580%25BC%25E5%2589%258D%25E4%25BD%25BF%25E7%2594%25A8%25E4%25BA%2586%25E5%258F%2598%25E9%2587%258F%2520typescript&rsv_pq=c33a511f00081069&rsv_t=72a4kMNtQ16q0tPWMW%2BWUwnwkwywwRWGHbJdYkF7%2BLWZ7dH8SWvFPemiqks&rqlang=cn&rsv_dl=tb&rsv_enter=1&rsv_btype=t&inputT=6059'))
console.log('stringify', querystring.stringify({ a: '林子', b: ['a', 'b'] }))