function checkCapital(str){
    for(var i = 0; i < str.length; i++) {
        if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90){
            return true;
        }
    }
    return false;
}

module.exports={
    checkLength:(name, str, len)=> {
        if(str.length > len)
            return true;
        else
            return name + " Must More Than " + len + " Characters";
    },
    checkEmail:(email)=> {
         if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true)
             return true;
         else
             return "Wrong Format Of Email";
    },
    checkPassword:(str1, str2)=> {
        var result = "";
        if(str1 !== str2)
            result += "Password And Re-Password Not Match. ";
        else if (str1.length <= 8) {
            result += "Password And Re-Password Must More Than 8 Character. ";
        } else if(checkCapital(str1) == false)
            result += "Password Must Have Less One Capital Character. "
        else
            return true
        return result;
    },
    checkPhone:(phone)=> {
        if(isNaN(phone))
            return "Wrong Format Of Phone Number";
        else if(phone.length == 11) {
            if(parseInt(phone / 1000000000) != 84)
                return "Not Viet Nam's Phone Number";
            else
                return true;
        }
        else if(phone.length == 10) {
            if(parseInt(phone / 1000000000) != 0)
                return "Not Viet Nam's Phone Number";
            else
                return true;
        } else {
            return "Wrong Format Of Phone Number";
        }
    }
}