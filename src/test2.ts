interface IConf {
    a: number | string
}

const b = {a: 4} satisfies IConf

interface RGB {
    red: number;
    green: number;
    blue: number;
}

interface HSV {
    hue: number;
    saturation: number;
    value: number;
}

function fas(color: RGB | HSV) {
    if ('red' in color) {
        console.log(color.red)
    }
}
fas({ red: 233, green: 56, blue: 44 })