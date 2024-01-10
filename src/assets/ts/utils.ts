
// 将16进制颜色转换为rgba
export function hexToRgb(hex:string, opacity:number):string {
    let rgb = [];
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
    }
    rgb.push(opacity);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
}

// 滑动到顶部
export function scrollToTop():void {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
