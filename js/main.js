init();



function init(){
    $('.code-bar').hide();
    $('.core-status').html('正在重启本地服务').css("color","#FC8900");
    runCore();
}
function restart () {
    $('.core-status').html('正在重启本地服务').css("color","#FC8900");
    
    $('.core-port').html('----');
    $('.core-user').html('正在获取');
    runCore();
}
function runCore(){
    mount();
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

function mount(){
    var isRoot = false;
    var exec = require('child_process').exec;
    exec("whoami", function (error, stdout, stderr) {
        var user = stdout.toString();
        isRoot = user=="root\n";
            if(isRoot){
            $('.mount-user').html('为了您的安全，尽量不要用ROOT来使用迅雷。');
            $('.mount-code').hide();
            $('.mount-example').hide();
        }else{
            $('.mount-user').html('抱歉，你不是ROOT，在命令行中执行以下代码：');
            $('.mount-path').hide();
            $('.mount-name').hide();
            $('.mount-root').hide();
    }
    });
    
    
}
function bind (path,name) {
    exec("mkdir /mnt/"+name, function (error, stdout, stderr) {
            
    });
    exec("sudo mount --bind "+path+" /mnt"+name, function (error, stdout, stderr) {
          
    });
}
function mountBind () {
    var path = $('.mount-path input').val();
    var name = $('.mount-name').val();
    bind(path,name);
}
function mountReset () {
    $('.mount-path input').val('');
    $('.mount-path input').val('');
}
function mountCancel () {
    
}