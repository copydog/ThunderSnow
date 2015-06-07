init();



function init(){
    $('.code-bar').hide();
    $('.core-status').html('正在启动中').css("color","#FC8900");
    runCore();
}
function runCore(){
    var filePath = './thunderCore/portal';
    var exec = require('child_process').exec;
    exec(filePath, function (error, stdout, stderr) {
        $('.core-status').html('启动成功').css("color","green");
        var a = JSON.stringify(stdout);
        anaResult(a);
    });
}
function anaResult(input){
    var num = new RegExp("[0-9]+","i");
    var en = new RegExp("[a-zA-Z]+");
    var codeNum = new RegExp(": [a-zA-Z]+");
    var port = new RegExp("YOUR CONTROL PORT IS\: [0-9]+","i");
    var user = new RegExp("USER\:(.)+\.");
    var code = new RegExp("THE ACTIVE CODE IS: [a-zA-Z]+");
    //port
    var portRes = port.exec(input);
    var portNum = num.exec(portRes);
    $('.core-port').html(portNum);
    //bind check
    var status = code.test(input);
    if(status){
        var codestr = code.exec(input);
        var codestr = codeNum.exec(codestr);
        var coderes = en.exec(codestr);
        $('.code-bar').show();
        $('.core-user').html("未绑定(登录后用激活码绑定)");
        $('.core-code').html(coderes);
        return false;
    }else{
    //username
        $('.user-bar').show();
        var res = user.exec(input);
        var len = JSON.stringify(res).length;
        user1 = JSON.stringify(res);
        var username = user1.substring(8,len-27);
        $('.core-user').html(username);
        return true;
    }
}
