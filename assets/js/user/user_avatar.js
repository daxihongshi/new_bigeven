$(function(){
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);
  $('#btnChooseImage').on('click',function(){
      $('#file').click(); 
  })
  $('#file').on('change',function(e){
    
    var filelist=e.target.files;
    if(filelist.length===0){
        return layer.msg('请选择图片')

    }
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })
  $('#btnUpload').on('click',function(e){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png');
    e.preventDefault();

    $.ajax({
    url: '/my/update/avatar',
    method: 'POST',
    // 快速获取表单中的数据   
    data:{
        avatar:dataURL,
    },
    success: function(res) {
        if (res.status !== 0) {
            return layer.msg('更新用户头像失败')
        }
        layer.msg('更新用户头像成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        window.parent.getUserInfo();
    }
    })
  })
})