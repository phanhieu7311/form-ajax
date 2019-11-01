function checkCapital(str){
    for(var i = 0; i < str.length; i++) {
        if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90){
            return true;
        }
    }
    return false;
}
function checkLength(name, str, len) {
    if(str.length > len)
        return true;
    else
        return name + " Must More Than " + len + " Characters";
}
function checkPassword(str1) {
    var result = "";
    if (str1.length <= 8) {
        result += "Password Must More Than 8 Character. ";
    } else if(checkCapital(str1) == false)
        result += "Password Must Have Less One Capital Character. "
    else
        return true
    return result;
}

$(document).ready(()=>{
    $('#login').click(()=>{
        var username = $("#username").val();
        var password = $("#password").val();

        var errors = {};
        errors.username = checkLength("User Name",username, 3);
        errors.password = checkPassword(password);
        console.log(errors);
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
            $("#login").css("display", "none");
            $("#loading").css("display", "block");
        }

        $.ajax({
            url: "/loginpost",
            type: "post",
            data: {
                username,
                password,
            } ,
            success: function (data) {
                if(data == true) {
                    $("#Result").css("display", "block");
                    $("#Error").css("display", "none");
                    $("#Result").html("Login Successfully");
                } else {
                    $("#Error").css("display", "block");
                    $("#Result").css("display", "none");
                    $("#Error").html(data);
                }
                $("#login").css("display", "block");
                $("#loading").css("display", "none");
            },
            error: function() {
                alert("ERROR While Submited");
            }
        });
    })
})