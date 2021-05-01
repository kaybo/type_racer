
function generateWord(n){

    var fs = require("fs");
    var words = fs.readFileSync("words.txt", "utf-8").toString().split("\r\n");
    var string = "";

    for(var i = 0; i < n; i++){
        string += words[Math.floor(Math.random() * words.length)] + " ";
    }

    return string;

}

module.exports = generateWord;