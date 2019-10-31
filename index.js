var fs=require('fs');
const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.listen(1212,()=>console.log('Server is running on port 1212'));

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));

const checkFunc=require('./public/js/func');

//
app.get('/home',(req,res)=>{
    res.render('home');
});

app.post('/homepost',(req,res)=>{
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password.trim();
    var re_password = req.body.re_password.trim();
    var address=req.body.address.trim();
    var phone = req.body.phone.trim();

    var errors = {};
    errors.username = checkFunc.checkLength("User Name",username, 3);
    errors.email = checkFunc.checkEmail(email);
    errors.password = checkFunc.checkPassword(password, re_password);
    errors.phone = checkFunc.checkPhone(phone);
    var print_error = "";
    for(element in errors) {
        if(errors[element] !== true) {
            print_error += "<h6>" + errors[element] + "</h6><br>";
        }
    }
    if(print_error != "") 
        console.log(errors);
    else{
        let user={
            username,
            email,
            password,
            address,
            phone
        }
        fs.appendFile('register.txt',JSON.stringify(user)+',\n','utf8',function(err){
            if(err)
                throw err;
            else{
                setTimeout(function() {
                    res.send(true);
                }, 3000);
            }
        });

        
    }
})