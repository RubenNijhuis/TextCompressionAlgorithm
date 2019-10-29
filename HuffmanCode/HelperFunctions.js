const fs = require('fs');

const readFile = (filename) => {
    let content = fs.readFileSync(filename, 'utf8', (err) => {
        if (err) return console.log('File read failed:', err);
    });
    return content;
};

const writeFile = (file, string) => {
    fs.writeFile(file, string, (err) => {
        if (err) return console.log(err);
    });
};

module.exports.readFile = readFile;
module.exports.writeFile = writeFile;
