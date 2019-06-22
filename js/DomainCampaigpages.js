//此方法为统计此页面浏览次数====================================start
//参数：id 为后台活动页面id编号

//document.write('<script src="//www.niceloo.com/Scripts/Jquery/jquery.cookie.js" type="text/javascript"></script>');

function OnloadStatistics(id) {
    var domScript = document.createElement('script');
    domScript.type = "text/javascript";
    domScript.src = "//www.niceloo.com/Scripts/Jquery/jquery.cookie.js";
    if (domScript.readyState) {
        domScript.onreadystatechange = function () {
            if (domScript.readyState == "loaded" || domScript.readyState == "complete") {
                domScript.onreadystatechange = null;
                OnloadStatistics2(id);
            }
        };
    } else {
        domScript.onload = function () {
            OnloadStatistics2(id);
        };
    }
    document.getElementsByTagName('head')[0].appendChild(domScript);
}

function OnloadStatistics2(id) {
    var host = window.location.host;
    if (host.indexOf('www') > 0)
        host = window.location.host.substring(window.location.host.indexOf('.') - 0 + 1);
    if ($.cookie('OriginUrl') == null || $.cookie('OriginUrl').length < 1) {
        //$.cookie('OriginUrl', window.location.href, { expires: 1, path: '/', domain: 'niceloo.com' });
        $.cookie('OriginUrl', window.location.href, { expires: 1, path: '/', domain: host});
    }
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/OnloadStatistics.ashx?id=" + id,
        dataType: "jsonp",
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback", //callback的function名称 
        success: function (json) {
            if (json[0].name != "true") {
                alert("fail，delete，no");
            }
        },
        error: function () {
            alert('fail001');
        }
    });

}
//此方法为统计此页面浏览次数====================================end


//跳转方法开始=========================

function Jmp(jmptype) {
    var domainend = "";
    var domain = "member.niceloo.com";
    if (jmptype == "0") {
        domainend = "/LearningCenter/NetworkGradeNew.aspx"
    }
    else if (jmptype == "1") {
        domainend = "/LearningCenter/UserFileData.aspx"
    }
    var tmp = window.open("//" + domain + domainend, "", "");
}
//跳转方法结束===============================



//获取指定名称的cookie的值 ==================================================start
function getCookie(objName) {//获取指定名称的cookie的值 
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
}
//获取指定名称的cookie的值 ==================================================end


//此方法判断活动页面是否可用====================================start
//参数：id 为后台活动页面id编号
//可用继续执行方法，不可用不执行

function IsPageEnable(id) {
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/CampaigpagesEnable.ashx?id=" + id,
        dataType: "jsonp",
        jsonp: "callbackparam002", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback002", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if ($.cookie("uKey") != null && $.cookie("uKey") != "") {
                    update(id, "", 1);
                }
            }
            else {
                alert("此活动已过期");
            }
        },
        error: function () {
            alert('fail002');
        }
    });


}
//此方法为统计此页面浏览次数====================================end


//此方法为活动页面用户操作日志插入====================================start
//参数：id 为后台活动页面id编号
//参数：userid 为用户id
//参数：sOperateType 为操作类型：值是1,2,3：1代表注册，2代表登录，3代表已登录
function update(id, userid, sOperateType, Urlvalue) {
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/UserCampaigpagesDispose.ashx?id=" + id + "&operateType=" + sOperateType,
        dataType: "jsonp",
        jsonp: "callbackparam003", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback003", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                var tmps = window.open(Urlvalue, "", "");
            }
            else {
                var tmp = window.open(Urlvalue, "", "");
            }
        },
        error: function () {
            alert('fail003');
            window.location.href = Urlvalue;
        }
    });
}

//此方法为活动页面用户操作日志插入====================================end


//此方法为活动页面用户操作日志的最前端方法====================================start


//Campaigpagesid为活动简章的页面id，tpye为操作类型：1为链接跳转，2为开通课程，3为收藏资料  ， tpyeValue为对应类型的值如：链接地址，课程id，资料id, isQuick是否显示快速登录界面
function CampaigpagesOperate(Campaigpagesid, type, tpyeValue, isLogin, isQuick) {
    $.cookie('campaigpagesId', Campaigpagesid, { expires: 7, path: '/' }); //存活动页面idcookie，用户登录的时候使用
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/CampaigpagesEnable.ashx?id=" + Campaigpagesid,
        dataType: "jsonp",
        jsonp: "callbackparam002", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback002", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if ($.cookie("uKey") != null && $.cookie("uKey") != "") {
                    if (type == "1") {
                        update(Campaigpagesid, "", 3, tpyeValue)
                    }
                    else if (type == "2") {
                        UserClass(Campaigpagesid, "", 3, tpyeValue);
                    }
                    else if (type == "3") {
                        UserFileDataCollect(Campaigpagesid, "", 3, tpyeValue);
                    }
                }
                else {
                    try {
                        if (isLogin == "1") {
                            ShowLoginUrl('Login', Campaigpagesid);
                        }
                        else {
                            if (isQuick)
                                ShowLoginUrl('Register', Campaigpagesid, "", true);
                            else
                                ShowLoginUrl('Register', Campaigpagesid);
                        }

                    } catch (e) {
                        ShowLoginUrl('Login', Campaigpagesid);
                    }
                }
            }
            else {
                alert("此活动已过期");
            }
        },
        error: function () {
            alert('fail002');
        }
    });
}

function CampaigpagesOperate_V2(Campaigpagesid, type, tpyeValue, isLogin) {
    $.cookie('campaigpagesId', Campaigpagesid, { expires: 7, path: '/' }); //存活动页面idcookie，用户登录的时候使用
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/CampaigpagesEnable.ashx?id=" + Campaigpagesid,
        dataType: "jsonp",
        jsonp: "callbackparam002", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback002", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if ($.cookie("uKey") != null && $.cookie("uKey") != "") {
                    if (type == "1") {
                        update(Campaigpagesid, "", 3, tpyeValue)
                    }
                    else if (type == "2") {
                        UserClass(Campaigpagesid, "", 3, tpyeValue);
                    }
                    else if (type == "3") {
                        UserFileDataCollect(Campaigpagesid, "", 3, tpyeValue);
                    }
                }
                else {
                    try {
                        if (isLogin == "1") {
                            ShowLoginUrl_V2('Login', Campaigpagesid);
                        }
                        else {
                            ShowLoginUrl_V2('Register', Campaigpagesid);
                        }

                    } catch (e) {
                        ShowLoginUrl_V2('Login', Campaigpagesid);
                    }
                }
            }
            else {
                alert("此活动已过期");
            }
        },
        error: function () {
            alert('fail002');
        }
    });
}


//此方法为活动页面用户操作日志的最前端方法====================================start


//此方法为用户收藏资料====================================start
function UserFileDataCollect(id, userid, sOperateType, fileid) {
    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/UserFileDataCollect.ashx?id=" + id + "&operateType=" + sOperateType + "&FileDataId=" + fileid,
        dataType: "jsonp",
        jsonp: "callbackparam004", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback004", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if (confirm("您的资料已收藏成功，请您在用户中心【资料收藏】列表里面查看。 点击确认，去用户中心查看。")) {
                    Jmp(1);
                }
            }
            else {
                alert("您的资料收藏失败。请重试！");
            }
        },
        error: function () {
            alert('fail004');
            alert("您的资料收藏失败。请重试！");
        }
    });
}
//此方法为用户收藏资料====================================end


//此方法为用户开通免费课程====================================start
function UserClass(id, userid, sOperateType, Classid) {

    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/UserClass.ashx?id=" + id + "&operateType=" + sOperateType + "&Classid=" + Classid,
        dataType: "jsonp",
        jsonp: "callbackparam005", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback005", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if (confirm("您的【网络课程】已经开通，点击【确定】进入用户中心听课即可。")) {
                    Jmp(0);
                }
            }
            else if (json[0].name == "false010") {

                if (confirm("您的用户中心【网络课程】已有此课程，点击【确定】进入用户中心听课即可。")) {
                    Jmp(0);
                }
            }
            else {
                //存储过程调用时返回-1，好像调用执行语句有问题，存储过程出现-1的记录基本不存在，此处做已经开课处理
                //alert("您的课程开通失败,请重试！");
                if (confirm("您的用户中心【网络课程】已有此课程，点击【确定】进入用户中心听课即可。")) {
                    Jmp(0);
                }
            }
        },
        error: function () {
            alert('fail005');
            alert("您的课程开通失败,请重试！");
        }
    });
}
//此方法为用户开通免费课程====================================end











//新添加方法跳转====================================start


//Campaigpagesid为活动简章的页面id，anchorUrl当前页面锚点地址： ， skipUrl：跳转链接链接地址，operaType操作类型：1为只定位锚点，2为登陆后直接跳转，3既有定位，又有跳转
function CampaigpagesOperateJmp(Campaigpagesid, anchorUrl, skipUrl, operaType) {


    $.cookie('campaigpagesId', Campaigpagesid, { expires: 7, path: '/' }); //存活动页面idcookie，用户登录的时候使用


    $.ajax({
        type: "get",
        async: false,
        url: "//www.niceloo.com/Campaigpages/CampaigpagesEnable.ashx?id=" + Campaigpagesid,
        dataType: "jsonp",
        jsonp: "callbackparam002", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback002", //callback的function名称 
        success: function (json) {
            if (json[0].name == "true") {
                if ($.cookie("uKey") != null && $.cookie("uKey") != "") {
                    update(Campaigpagesid, "", 3, skipUrl);
                }
                else {
                    try {
                        if (operaType == "1") {
                            ShowLoginUrl('Login', Campaigpagesid);
                        }
                        else {
                            ShowLoginUrl('Register', Campaigpagesid);
                        }

                    } catch (e) {
                        ShowLoginUrl('Login', Campaigpagesid);
                    }

                }


            }
            else {
                alert("此活动已过期");
                //  return "false";
            }
        },

        error: function () {
            alert('fail006');
        }
    });



}










//此方法为活动页面用户操作日志的最前端方法====================================start






//此方法为微信分享====================================start
document.write('<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
function WX_Share(title, content, image) {
    //debugger
    $.ajax({
        type: "post",
        async: false,
        url: "//www.niceloo.com/Campaigpages/WX_Share.aspx/GetWXData?url="+encodeURIComponent(location.href.toString()),
        //url: "../../Campaigpages/WX_Share.aspx/GetWXData",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        jsonp: "callbackparam007", //服务端用于接收callback调用的function名的参数 
        jsonpCallback: "success_jsonpCallback007", //callback的function名称 
        success: function (json) {
            if (json != null) {
                var obj = JSON.parse(json.d);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: obj.wx_appID,     //$("#wx_appID").val(), // 必填，公众号的唯一标识
                    timestamp: obj.wx_timestamp,     // $("#wx_timestamp").val(), // 必填，生成签名的时间戳
                    nonceStr: obj.wx_nonceStr,     // $("#wx_nonceStr").val(), // 必填，生成签名的随机串
                    signature: obj.wx_signature,     // $("#wx_signature").val(),// 必填，签名，见附录1
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline'
                    ]
                });

                var imgUrl = (image == undefined) ? "//wap.niceloo.com/Image/nicelooloonew.png" : image;
                //var shareUrl = location.href;
                var shareUrl = "//www.niceloo.com/zhuanti/news/zlg/";
                wx.ready(function () {
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: title,       //$("#wx_title").val(),
                        desc: content,      //$("#wx_content").val(),
                        //link: location.href,
                        link: shareUrl,
                        imgUrl: imgUrl,
                        success: function (res) {
                        }
                    });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: title,       //$("#wx_title").val(),
                        desc: content,      //$("#wx_content").val(),
                        //link: location.href,
                        link: shareUrl,
                        imgUrl: imgUrl,
                        success: function () {
                        }
                    });
                });
            }
        },
        error: function () {
            console.log("获取微信分享数据失败")
        }
    });
}
//此方法为微信分享====================================end

