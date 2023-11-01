const fs = require('fs')
const path = require('path')
describe('Files in src/blocks', () => {
    // loop thr src/block then check and match with PR info
    const files = fs.readdirSync(path.join(__dirname, '..', 'src/blocks'))
 
    for(const f of files) {
       require('./filetests')(f)
  
    }
})