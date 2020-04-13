# popups-layer
这是一个弹出层框架
```html
<!--将css和fonts文件复制 引入css样式-->
<link rel="stylesheet" href="css/popups-layer.css">

<!--引入js文件-->
<script src="lib/popupsLayer.min.js"></script>

<script>
// 简单示例
document.querySelector('button').addEventListener('click', () => {
    // 创建对象
    let layer = new PopupsLayer({
        // 指定布局行为，对象分为3类：layer、title、content，所有对象中都包含style属性，可以添加自定义样式
        layer: {
            // 居中显示
            position: 'CENTER'
        },
        title: {
            // 设置标题
            text: 'This is a PopupsLayer'
        },
        content: {
            // 设置内容框文本
            text: 'Hello！',
            // 为内容框设置按钮并绑定相应事件
            btnGroup: {
                // 按钮id属性为ok
                ok: {
                    // 使用class属性ok（class属性ok已经在popups-layer.css中定义）
                    theme: 'ok',
                    // 按钮文字
                    text: '确定'
                },
                // 按钮id属性为cancel
                cancel: {
                    // 使用class属性cancel（class属性cancel已经在popups-layer.css中定义）
                    theme: 'cancel',
                    // 按钮文字
                    text: '取消',
                    // 按钮绑定函数
                    fn: function () {
                        layer.close();
                    }
                }
            }
        }
    });
});
</script>
```
