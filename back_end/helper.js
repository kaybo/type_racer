
function generateWord(n){

    var fs = require("fs");
    var words = fs.readFileSync("words.txt", "utf-8").toString().split("\r\n");
    var string = "";

    for(var i = 0; i < n; i++){
        string += words[Math.floor(Math.random() * words.length)] + " ";
    }

    return string;

}
function avgString(str1, str2){
    var str1Length = str1.length;
    var str2Length = str2.length;
    var pct= (str1Length/ str2Length)*100;
    return pct;
}
module.exports = {generateWord, avgString};