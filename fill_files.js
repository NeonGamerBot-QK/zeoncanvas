const fs = require('fs')
const path = require('path')
const srcFolder = path.join(__dirname, 'src', 'blocks')
const str = (c,i) => `module.exports = (ctx) => {
    // wow is this an empty file space>
    // you should add some code here
    // or even a PR (wowie)

}`
/**
  ctx.rect(0,0,64,64);
    ctx.fillStyle = "${c ? 'red' : 'blue'}";
    ctx.fill();
    // write text int
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("${i}", 10, 30);
 */
function doIt(i) {
    return  new Promise((res) => {
         const theI = i;
         if(!fs.existsSync(path.join(srcFolder, `${theI}.js`))) {
          fs.writeFile(path.join(srcFolder, `${theI}.js`), str(theI%2 == 0,theI), (err,r) => {
              res(r)
          })
      }
        })
 }
;(async () => {
    let max = 100;
let i = 0;

       function r() {
        console.log(i,max)
              if(i >= max) return;
              doIt(i).then(() => {
                i++;
                console.log(i,max)
                r()
              })
       }
     setTimeout(() =>     r(),1000)
  
})()
