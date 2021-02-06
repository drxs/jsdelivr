var $ = mdui.$;
var body = $('body');

//----------浅蓝色对话框，time时间后自动关闭----------
function ShowDialog(title, content, time) {
    var inst = mdui.dialog({
        title: title,
        content: content,
        cssClass: 'mdui-color-light-blue-50',
        buttons: [{text: '确认'}]
    });
    inst.open();
    setTimeout(function () {
        inst.close();
    }, time);
}

function GetCookie(name) {
    //获取Cookie
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] === name) {
            return arr[1];
        }
    }
    return "";
}

//----------页面初始化，设置页面标题、修改抽屉导航栏样式----------
function IndexOnload() {
    document.title = '首页';
    $('#drawer_index').addClass('mdui-list-item-active');
}

function LoginOnload() {
    document.title = '登录';
    $('#drawer_center').addClass('mdui-list-item-active');
}

function CenterOnload() {
    document.title = '个人中心';
    $('#drawer_center').addClass('mdui-list-item-active');
}

function SettingsOnload() {
    document.title = '设置中心';
    $('#drawer_settings').addClass('mdui-list-item-active');
}

function NewsOnload() {
    document.title = '农产品资讯';
    $('#drawer_news').addClass('mdui-list-item-active');
    //添加tab样式
    if (!body.hasClass('mdui-appbar-with-tab'))
        $('body').addClass('mdui-appbar-with-tab');
}

function ProductsOnload() {
    document.title = '农产品展示';
    $('#drawer_products').addClass('mdui-list-item-active');
}

function PriceOnload() {
    document.title = '价格趋势';
    $('#drawer_price').addClass('mdui-list-item-active');
}

function InfoOnload() {
    document.title = '供求信息';
    $('#drawer_info').addClass('mdui-list-item-active');
    if (!body.hasClass('mdui-appbar-with-tab'))
        body.addClass('mdui-appbar-with-tab');
    $('#FabBtnAddInfo').removeClass('mdui-fab-hide');
}

function ManageOnload() {
    document.title = '管理面板';
    $('#drawer_management').addClass('mdui-list-item-active');
    if (!body.hasClass('mdui-appbar-with-tab'))
        body.addClass('mdui-appbar-with-tab');
}

function LinksOnload() {
    document.title = '相关网站';
    $('#drawer_links').addClass('mdui-list-item-active');
}

function DetailOnload() {
    var inst = new mdui.Drawer('#main_drawer');
    inst.close();
}

//----------页面初始化 END----------


//----------登录、注册卡片切换----------
function ShowRegisterCard() {
    $('#login_card').hide();
    $('#register_card').show();
}

function ShowLoginCard() {
    $('#login_card').show();
    $('#register_card').hide();
}


//----------顶部菜单按钮功能----------
$('#head_menu_refresh').on('click', function () {
    location.reload();
});

$('#head_menu_logout').on('click', function () {
    location.href = './function/function.php?action=logout';
});

$('#head_menu_login').on('click', function () {
    location.href = './login.php';
});

$('#head_menu_links').on('click', function () {
    location.href = './links.php';
});
//----------顶部菜单按钮功能 END----------


//----------抽屉导航栏功能----------
$('#drawer_index').on('click', function () {
    location.href = './index.php';
});

$('#drawer_center').on('click', function () {
    location.href = './center.php';
});

$('#drawer_logout').on('click', function () {
    location.href = './function/function.php?action=logout';
});

$('#drawer_settings').on('click', function () {
    location.href = './settings.php';
});

$('#drawer_management').on('click', function () {
    location.href = './management.php';
});

$('#drawer_news').on('click', function () {
    location.href = './news.php';
});

$('#drawer_products').on('click', function () {
    location.href = './products.php';
});

$('#drawer_price').on('click', function () {
    location.href = './price.php';
});

$('#drawer_info').on('click', function () {
    location.href = './info.php';
});

$('#drawer_links').on('click', function () {
    location.href = './links.php';
});

//----------抽屉导航栏功能 END ----------

//----------个人中心页面点击事件绑定----------
$('#center_more_news_policy').on('click', function () {
    location.href = './news.php#news_policy';
});

$('#center_more_news_agriculture').on('click', function () {
    location.href = './news.php#news_agriculture';
});

$('#center_more_info').on('click', function () {
    location.href = './info.php';
});

//----------个人中心页面点击事件 END----------

//----------管理面板-价格管理-下拉选择事件----------
$('#price_product_select').on('change', function () {
    var pid = $('#price_product_select')[0].value;
    $.ajax({
        method: 'POST',
        url: './function/function.php',
        data: {
            GetPriceInfo: '',
            ProductId: pid,
        },
        success: function (data) {
            $('#price_table_body').empty();
            $(data).appendTo('#price_table_body');
        }
    }).then(function () {
    });
});


//----------设置界面，修改用户信息对话框----------
function ChangeInfo(item) {
    mdui.prompt('请输入内容', '修改' + item,
        function (value) {
            mdui.dialog({
                title: '修改' + item,
                content: '请确认是否将' + item + '修改为：' + value,
                cssClass: 'mdui-color-blue-50',
                buttons: [
                    {
                        text: '取消'
                    },
                    {
                        text: '确认',
                        onClick: function () {
                            $.ajax({
                                method: 'POST',
                                url: './function/function.php',
                                data: {
                                    change_info: item,
                                    value: value,
                                },
                                success: function (data) {
                                    ShowDialog('修改' + item, data, '2000');
                                }
                            }).then(function () {
                                setTimeout(function () {
                                    //自动刷新页面，以显示修改后的内容
                                    location.reload();
                                }, 2100);
                            });
                        }
                    }
                ]
            });
        },
        function () {
        },
        {
            confirmOnEnter: true,
            defaultValue: '请输入' + item + '…',
            confirmText: '确认修改',
            cancelText: '取消'
        }
    );
}

//----------设置界面功能----------
$('#setting_id').on('click', function () {
    ShowDialog('禁止操作', '抱歉！用户Id由系统自动生成，不允许用户自行修改！', '2200');
});

$('#setting_name').on('click', function () {
    ChangeInfo('用户姓名');
});

$('#setting_email').on('click', function () {
    ChangeInfo('电子邮件');
});

$('#setting_date').on('click', function () {
    ShowDialog('禁止操作', '抱歉！用户注册时间由系统自动生成，不允许用户自行修改！', '2200');
});

$('#setting_sign').on('click', function () {
    ChangeInfo('个性签名');
});

$('#setting_age').on('click', function () {
    ChangeInfo('年龄');
});

$('#setting_sex').on('click', function () {
    ChangeInfo('性别');
});

$('#setting_tel').on('click', function () {
    ChangeInfo('电话');
});

$('#setting_pwd').on('click', function () {
    mdui.prompt('请验证原密码', '修改密码',
        function (value) {
            $.ajax({
                //使用ajax调用function.php，验证初始密码是否正确
                method: 'POST',
                url: './function/function.php',
                data: {
                    change_info: '密码验证',
                    value: value,
                },
                success: function (data) {
                    if (data === '验证通过') {
                        mdui.prompt('请输入新密码', '修改密码',
                            function (value) {
                                mdui.dialog({
                                    title: '修改密码',
                                    content: '请确认是否将密码修改为：' + value,
                                    cssClass: 'mdui-color-blue-50',
                                    buttons: [
                                        {
                                            text: '取消'
                                        },
                                        {
                                            text: '确认',
                                            onClick: function () {
                                                $.ajax({
                                                    //使用ajax调用function.php，修改密码
                                                    method: 'POST',
                                                    url: './function/function.php',
                                                    data: {
                                                        change_info: '密码',
                                                        value: value,
                                                    },
                                                    success: function (data) {
                                                        ShowDialog('修改密码', data, '2000');
                                                    }
                                                }).then(function () {
                                                });
                                            }
                                        }
                                    ]
                                });
                            },
                            function () {
                            },
                            {
                                confirmOnEnter: true,
                                defaultValue: '请输入新密码…',
                                confirmText: '确认修改',
                                cancelText: '取消'
                            }
                        );
                    } else {
                        ShowDialog('验证失败', '验证失败！错误原因为：' + data, '2000');
                    }
                }
            }).then(function () {
            });
        },
        function () {
        },
        {
            confirmOnEnter: true,
            defaultValue: '请验证原始密码…',
            confirmText: '确认修改',
            cancelText: '取消'
        }
    );
});
