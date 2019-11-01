// const checkFunc=require('./func');

function checkLength(name, str, len) {
    if(str.length > len)
        return true;
    else
        return name + " Must More Than " + len + " Characters";
}
function checkEmail(email) {
     if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == true)
         return true;
     else
         return "Wrong Format Of Email";
}
function checkCapital(str) {
    for(var i = 0; i < str.length; i++) {
        if(str.charCodeAt(i) >= 60 && str.charCodeAt(i) <= 90){
            return true;
        }
    }
    return false;
}
function checkPassword(str1, str2) {
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
}
function checkPhone(phone) {
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

$(document).ready(function(){
    $('#register').click(()=>{
        var username = $("#username").val().trim();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        var re_password = $("#re_password").val().trim();
        var address = $("#address").val().trim();
        var phone = $("#phone").val().trim();

        var errors = {};
        errors.username = checkLength("User Name",username, 3);
        errors.email = checkEmail(email);
        errors.password = checkPassword(password, re_password);
        errors.phone = checkPhone(phone);
        var print_error = "";
        for(element in errors) {
            if(errors[element] !== true) {
                print_error += "<h6>" + errors[element] + "</h6><br>";
            }
        }
        if(print_error != "") {
            $("#Error").css("display", "block");
            $("#Result").css("display", "none");
            $("#Error").html(print_error);
        } else {
            $("#register").css("display", "none");
            $("#loading").css("display", "block");
        }

        $.ajax({
            url: "/homepost",
            type: "post",
            data: {
                username,
                email,
                password,
                re_password,
                address,
                phone
            } ,
            success: function (data) {
                if(data == true) {
                    $("#Result").css("display", "block");
                    $("#Error").css("display", "none");
                    $("#Result").html("Register Successfully");
                } else {
                    $("#Error").css("display", "block");
                    $("#Result").css("display", "none");
                    $("#Error").html(data);
                }
                $("#register").css("display", "block");
                $("#loading").css("display", "none");
            },
            error: function() {
                alert("ERROR While Submited");
            }
        });
    })
})