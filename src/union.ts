// 辨析联合类型
interface Square {
    kind: 'square';
    width: number;
}

interface Rectange {
    kind: 'rectange';
    width: number;
    height: number;
}

// 定义一个联合类型
type Shape = Square | Rectange

function area(s: Shape): number {
    // 每个里面都有字面量类型 kind，用来标识类型
    switch (s.kind) {
        case 'square':
            return s.width * s.width
        case 'rectange':
            return s.width * s.height
        default:
            const n: never = s
            return n
    }
}
