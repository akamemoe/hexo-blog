(function () {
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
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

            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function')
                    callback();
            });

            return this;
        },
    });
    let qrstr = ["<div id='rewards-box' style='top:0;left:0;display:none;position:fixed;z-index:100;height:100%;width:100%;background-color:rgba(156,156,156,0.5);'><div id='rewards'>",
        "<div id='qrbox'>",
        "<img class='qrcode wechat' src='/images/wx_reward_qr.png' title='微信'/>",
        "<img class='qrcode alipay' src='/images/alipay_reward_qr.png' title='支付宝'/>",
        "</div>",
        "</div></div>"].join('');
    $('body').append(qrstr);
    let $rewards_box = $('#rewards-box');
    let $rewards = $('#rewards');
    $('#btn-support').on('click', function (e) {
        $rewards_box.css('display','block')
        $rewards.show();
        $rewards.animateCss('rollIn');
        e.stopPropagation();
    });
    $rewards_box.on('click', function () {
        console.log('$rewards_box click');
        
        $rewards.animateCss('rollOut',()=>{$rewards.hide();$rewards_box.css('display','none');});
    });
    /*
    $rewards.on('click', function (e) {
        e = e || window.e;
        e.stopPropagation();
    });*/
    console.log('reward binded')
})();