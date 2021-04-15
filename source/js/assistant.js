
//扩展jquery库，重写addClass函数，使之适应各种浏览器，并且可添加动画完成的回调函数
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
function bindrewards(){
    let qrstr = ["<div style='position:fixed;margin:auto;z-index:999'><div id='rewards'>",
                "<div id='qrbox'>",
                "<img class='qrcode wechat' src='/images/wx_reward_qr.png' title='微信'/>",
                "<img class='qrcode alipay' src='/images/alipay_reward_qr.png' title='支付宝'/>",
                "</div>",
                "</div></div>"].join('');
    $('#container').append(qrstr);
    let $rewards = $('#rewards');
    $('#btn-support').on('click',function(e){
        if($rewards.is(':hidden')){
            $rewards.show();
            $rewards.animateCss('fadeInDown');
        }
        e.stopPropagation();
    });
    $('body').on('click',function(){
        if(!$rewards.is(':hidden')){
            $rewards.animateCss('fadeOutDown',()=>{
                $rewards.hide();
            });
        }
    });
    $rewards.on('click',function(e){
        e = e || window.e;
        e.stopPropagation();
    });
    console.log('reward binded')
};

jQuery(document).ready(function ($) {
    bindrewards();
    if(!window.enable_assistant){
        console.log('assistant disabled')
        return
    }
    console.log('assistant enabled')
    $("body").append("<div id='spig' class='spig'><div id='message'>加载中……</div><div id='mumu' class='mumu'></div></div>");
    var qrstr = ["<div id='rewards'>",
                "<div id='qrbox'>",
                "<img class='qrcode wechat' src='/images/wx_reward_qr.png' title='微信'/>",
                "<img class='qrcode alipay' src='/images/alipay_reward_qr.png' title='支付宝'/>",
                "</div>",
                "</div>"].join('');
    // $('#spig').append(qrstr);
    
    var $mumu = $("#mumu");
    var $message = $("#message");
    var $spig = $("#spig");
    var spig_top = 300;//距离顶部的距离
    var $rewards = $('#rewards');
    
   //显示消息函数,是否强制(优先级)显示消息，当有消息正在显示的时候，其他定时器
   //调用的显示消息将被忽略。
    var showing = false;
    function showMessage(txt,delay,force) {
            
            force = force || false;
            delay = delay || 7000;
            if(force || !showing){
                $message.hide().stop(true);
                showing = true;
                $message.html(txt);
                $message.fadeIn();
                $message.fadeTo(500, 1);
                // console.log('msg:delay:'+delay)
                $message.fadeOut(delay,function(){
                    showing = false;
                }); 
            }

    };
    window.girlhelper = {
        binddragevent:function(){
            //拖动
            var _move = false;
            var ismove = false; //移动标记
            var _x, _y; //鼠标离控件左上角的相对位置
            $spig.mousedown(function (e) {
                _move = true;
                _x = e.pageX - parseInt($spig.css("left"));
                _y = e.pageY - parseInt($spig.css("top"));
             });
            $(document).mousemove(function (e) {
                if (_move) {
                    var x = e.pageX - _x; 
                    var y = e.pageY - _y;
                    var wx = $(window).width() - $spig.width();
                    var dy = $(document).height() - $spig.height();
                    if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                        $spig.css({
                            top: y,
                            left: x
                        }); //控件新位置
                        ismove = true;
                    }
                }
            }).mouseup(function () {
                _move = false;
            });
        },
        //绑定hover事件
        bindhoverevent:function(){
            $message.hover(function () {
                $message.fadeTo("100", 1);
            });
            $mumu.mouseover(function () {
                $mumu.stop();
                $mumu.fadeTo("300", 0.3);
                var msgs = [
                    "我是可以随意托动的哟，不信你试试。",
                    "想不想跟本仙女玩呀~", 
                    "本小助理可远观不可亵玩！",
                    "我会隐身哦！嘿嘿！", 
                    "别动手动脚的，把手拿开！！",
                    "再不把手拿开小心我横竖竖你！！", 
                    "主人，他摸我，呜呜呜呜~~~", 
                    "你把手拿开我就出来！"];
                var i = Math.floor(Math.random() * msgs.length);
                showMessage(msgs[i]);
            });
            $mumu.mouseout(function () {
                $mumu.fadeTo("300", 1)
            });
            var f = $("#spig").offset().top;
            $(window).scroll(function () {
                $("#spig").animate({
                    top: $(window).scrollTop() + f + spig_top
                },{
                    queue: false,
                    duration: 1000
                });
            });
        },
        //绑定赞赏
        bindrewards:function(){
            $('#btn-support').on('click',function(e){
                if($rewards.is(':hidden')){
                    showMessage('左侧是微信，右侧是支付宝。点击空白隐藏二维码哟! TnT ',10000,true);
                    $rewards.show();
                    $rewards.animateCss('fadeInDown');
                }
                e.stopPropagation();
            });
            $('body').on('click',function(){
                if(!$rewards.is(':hidden')){
                    $rewards.animateCss('fadeOutDown',()=>{
                        $rewards.hide();
                    });
                }
            });
            $('#spig').on('click',function(e){
                e = e || window.e;
                e.stopPropagation();
            });
        },

        //开始
        hello:function(){
            var now = (new Date()).getHours();
            if (now > 0 && now <= 6) {
                showMessage(' 晚上好，可爱的你。O(∩_∩)O', 6000);
            } else if (now > 6 && now <= 11) {
                showMessage(' 早上好，可爱的你。O(∩_∩)O', 6000);
            } else if (now > 11 && now <= 14) {
                showMessage(' 中午好，可爱的你。O(∩_∩)O', 6000);
            } else if (now > 14 && now <= 18) {
                showMessage(' 下午好，可爱的你。O(∩_∩)O', 6000);
            } else {
                showMessage(' 晚上好，可爱的你。O(∩_∩)O', 6000);
            }
           
            $spig.animate({
                top: $(window).scrollTop() + $spig.offset().top + spig_top,
                left: document.body.offsetWidth - 290
            },{
                queue: false,
                duration: 1000
            });
        },
        //无聊讲点什么
        boringsay:function(){
            var index = 0;
            window.setInterval(function () {
                var msgs = [
                "找到你的需要的资料了没QAQ", 
                "怎么不理人家呀~~", 
                "你会来看看人家嘛~ QAQ", 
                "…@……!………", 
                "悄悄告诉你：“我主人超级好哟~~~，嘘，别告诉别人~”",
                "我是胡先生的小小助理哦~_~，我可爱吧！嘻嘻!~^_^!~~"];
                //var i = Math.floor(Math.random() * msgs.length);
                showMessage(msgs[(index++)%msgs.length], 10000);
            }, 30000);
        },
        //无聊动动
        boringmove:function(){
            var randommove = function () {
                //高度百分比
                var _H = [0.35, 0.5,0.65,-0.1,-0.3,-0.5,-0.6];
                //宽度百分比
                var _W = [0.4, 0.5, 0.65, -0.4, -0.5, -0.6,-0.65];
                var wi = Math.floor(Math.random() * _W.length);
                var hi = Math.floor(Math.random() * _H.length);
                $(".spig").animate({
                    left: document.body.offsetWidth/2*(1+_W[wi])
                    //top:  document.body.offsetHeight/2*(1+_H[hi])
                },{
                    duration: 2000
                    //complete: showMessage(msgs[i])
                });
            };
            //经过测试发现如果离开了本页面，浏览器不会一直执行setInterval的内容，
            //而是加入待执行队列(测试chrome是这样)，再当页面恢复的时候从队列里拿出来一起执行，
            //所以就会发生当用户离开页面一段时间在回来的时候助手一直移动。
            //这个就是当用户离开的时候清空循环定时器，恢复的时候继续重复。
            window.boringfn = window.setInterval(randommove, 45000);
            document.body.onfocus = function(){
                if(!window.boringfn){
                    window.boringfn = window.setInterval(randommove, 45000);
                }  
            };
            document.body.onblur = function(){
                window.clearInterval(window.boringfn);
                window.boringfn = null;
            };
        },

        init:function(){
            
            this.hello();
            this.bindhoverevent();
            this.binddragevent();
            this.bindrewards();
            this.boringsay();
            this.boringmove();
        }
        
    };
    window.girlhelper.init();
   
});

// //鼠标点击时
// jQuery(document).ready(function ($) {
//     var stat_click = 0;
//     var $mumu = $("#mumu");
//     var m = '....';
//     $mumu.click(function () {
//         if (!ismove) {
//             stat_click++;
//             if (stat_click > 4) {
//                 msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了，人家脸都红色...", "非礼呀！救命！OH，My ladygaga"];
//                 var i = Math.floor(Math.random() * msgs.length);
//                 m = msgs[i];
//             } else {
//                 msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "别摸我了，再摸我就脸红了！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉我主人来打你的哦！", "干嘛动我呀！小心我咬你！"];
//                 var i = Math.floor(Math.random() * msgs.length);
//                 m = msgs[i];
//             }
//             var i = Math.floor(Math.random() * msgs.length);
//             //高度百分比
//             var _H = [0.1, 0.3, 0.5,0.75,-0.1,-0.3,-0.5,-0.75];
//             //宽度百分比
//             var _W = [0.3, 0.4, 0.5, 0.6,0.7,0.75, -0.4, -0.5, -0.6,-0.7,-0.75];
//             var wi = Math.floor(Math.random() * _W.length);
//             var hi = Math.floor(Math.random() * _H.length);
//             $(".spig").animate({
//                 left: document.body.offsetWidth/2*(1+_W[wi]),
//                 top:  document.body.offsetheight/2*(1+_H[hi])
//             },{
//                 duration: 2000,
//                 complete: showMessage(m)
//             });
//         } else {
//             ismove = false;
//         }
//     });
// });




