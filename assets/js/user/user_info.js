$(function(){
    var form = layui.form
var layer = layui.layer

form.verify({
nickname: function(value) {
    if (value.length > 6) {
    return '昵称长度必须在 1 ~ 6 个字符之间！'
    }
}
})
    initUserInfo();
    function initUserInfo(){
        
        $.ajax({
            method:'GET',
            url:"/my/userinfo",
            success:function(res){
                if (res.status!==0){
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('formUserInfo',res.data)
            },
        })
    }
    $("#btnReset").on('click',function(e){
        e.preventDefault();
        initUserInfo();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        e.preventDefault()
        $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            window.parent.getUserInfo();
        }
        })
    })
    
})
