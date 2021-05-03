export function stringValidation(string1, string2){
    var firstString = string1.toLowerCase();
    var secondString = string2.toLowerCase();
    if(firstString == secondString){
        return true;
    }
    for(let i = 0; i < secondString.length; i++){
        if(secondString.charAt(i) != firstString.charAt(i)){
            return false;
        }
    }
    return true;
}

export function avgString(str1, str2){
    var str1Length = str1.length;
    var str2Length = str2.length;
    var pct= (str1Length/ str2Length)*100;
    return pct;
}