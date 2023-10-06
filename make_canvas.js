const { createCanvas, loadImage } = require('canvas')
// const canvas = createCanvas(200, 200)
// const ctx = canvas.getContext('2d')

const fs = require('fs')
const path = require('path')
const srcFolder = path.join(__dirname, 'src', 'blocks')
const outFolder = path.join(__dirname, 'out')
fs.mkdirSync(outFolder, {recursive: true})
// fs.mkdirSync
const blocks = fs.readdirSync(srcFolder).sort((a,b) => parseInt(a.replace('.png')) - parseInt(b.replace('.png')));
;(async () => {
    let i = 0;
    for (const block of blocks) {
        console.log(block,i)
await doIt(block,i)
i++;
    }
})()

function doIt(blp,i) {
    const theI = i;
    return new Promise(async (res) => {
        const bl = require(path.join(srcFolder, blp))
        const canvas = createCanvas(64, 64)
        const ctx = canvas.getContext('2d')
        await bl(ctx)
        canvas.toBuffer((e,b) => {
            if(e) throw e
            fs.writeFile(path.join(outFolder, `${theI}.png`), b, (e,r) => res())
        })
    })
}