export function hexToRgb(hex:string, opacity:number):string {
    let rgb = [];
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
    }
    rgb.push(opacity);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
}


// 请求有道词典翻译

export const get_youdao_translate = async (num:number, word:string) => {
    const youdao_url:string = `youdao_dict/suggest?num=${num}&ver=3.0&doctype=json&cache=false&le=en&`;
    let data = await fetch(`${youdao_url}q=${word}`)
    return await data.json();
}