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
