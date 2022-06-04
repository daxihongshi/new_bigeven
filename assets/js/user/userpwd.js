$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function(value){
              if(value===$('[name=oldpwd]').val()){
                  return "新旧密码一致"
              }
          },
          repwd:function(value){
            if(value!==$('[name=newpwd]').val()){
                return "密码不一致"
            }
          }
    })
    $('.layui-from').on('submit',function(e){
        e.preventDefault();
        // e.preventDefault()
        $.ajax({
        url: '/my/updatepwd',
        method: 'POST',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('更新密码失败！')
            }
            layer.msg('更新密码成功！')
            $('.layui-from')[0].reset();
        }
        })
    })
})   