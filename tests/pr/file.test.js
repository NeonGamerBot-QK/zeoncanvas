const fs = require('fs')
const path = require('path')
 const argv = process.argv.slice(3)
 describe('Argv tests', () => {
    it ('should not be an empty array', () => {
        expect(argv.length !== 0).toBeTruthy()
    })
    // it('should be a valid file path', (e) => {
    //     expect(fs.existsSync(path.join(__dirname, '..', 'src/blocks', argv[0]))).toBeTruthy()
    // })
 })
 

 require('../filetests')(argv[0])