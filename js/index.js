window.onload = function () {
    search();
    banner();
    downtime();
    reload();
}

/*搜索栏颜色逐渐加深*/
function search() {
    //获取搜索盒子
    var searchBox = document.querySelector(".hm_header_box");
    //搜索banner盒子
    var bannerBox = document.querySelector(".hm_banner");
    //获取banner盒子的高度
    var h = bannerBox.offsetHeight;
    console.log(h);
    //监视window的滚动事件
    window.onscroll = function () {
        //不断的获取滚动条离顶部的距离
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        console.log(scrollTop);
        var opacity = 0;
        if (scrollTop < h) {
            opacity = scrollTop / h * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = "rgba(201,21,35," + opacity + ")";
        console.log("opacity" + opacity);
    }
}

/* 轮播图的js */
function banner() {
    var banner = document.querySelector(".hm_banner");
    /* 获取屏幕的宽度 */
    var w = banner.offsetWidth;
    // alert(w);
    /* 图片盒子 选择器.hm_banner > ul:first_child;是个标签选择器来的*/
    var imageBox = banner.querySelector("ul:first-child");
    // console.log(imageBox);
    /* 点的盒子 hm_banner > ul:last-child */
    var pointBox = banner.querySelector("ul:last-child");
    // console.log(pointBox);
    /* 获取到所有的点 */
    var points = pointBox.querySelectorAll("li");
    /*获取imagebanner的长度*/
    var imageBoxLength = imageBox.querySelectorAll("a>img").length;
    console.log(imageBoxLength);
    // console.log(points);
    var timer = "";
    /* 给图片盒子添加过渡 */
    var addTransition = function () {
        imageBox.style.webkitTransform = "all .2s";
        imageBox.style.transition = "all .2s";
    }
    /* 删除图片盒子的过渡 */
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    }
    /* 改变图片的位置 */
    var setTranslateX = function (translateX) {
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
        imageBox.style.transform = "translateX(" + translateX + "px)";
    }
    function autoplay() {
        timer = setInterval(function () {
            index++;
            //给图片添加过渡
            addTransition();
            setTranslateX(-index * w);
            // console.log(index);
        }, 2500);
    }
    /* 自动滚动 */
    var index = 0; /* 数组从0开始的，所以2就是第二种图片了;所以是先加1 */
   autoplay();
    itcast.transitionEnd(imageBox,function () {
       console.log(index);
       if(index > imageBoxLength -2){
           index = 1;
           removeTransition();
           setTranslateX(-index * w);
       }else if(index <= 0){
           index = 8;
           removeTransition();
           //滑动到-1张定位到第一张
           setTranslateX(-index * w);
       }
       setPoint();
    })
    //获取开始触摸的点
    var startX = 0;
    //移动的坐标
    var moveX = 0;
    //移动的距离
    var distance = 0;
    //定义默认手指移动为false
    var isMove = false;
    imageBox.addEventListener("touchstart",function (ev) {
        //开始触摸
        console.log("触摸开始");
        //清空计时事件
        clearInterval(timer);
        //清空过渡
        // removeTransition();
        startX = ev.touches[0].clientX;
        // console.log(startX);
    });
    //触摸移动事件(这个是不断触发的)
    imageBox.addEventListener("touchmove",function (ev) {
        //告诉人家我开始移动了
        isMove = true;
        // console.log("触摸中");
        moveX = ev.touches[0].clientX;
        //计算移动的距离，moveX - startX(根据当前图片来计算)
        distance = moveX - startX;
        //设置图片的移动banner*-index 前面的那部分是不变的,+distance移动的距离
        // console.log(distance);
        removeTransition();
        var currentX = -index * w + distance;
        setTranslateX(currentX);
    });
    //触摸结束事件
    imageBox.addEventListener("touchend",function (ev) {
        console.log("触摸结束");
        console.log(index);
        if (isMove && Math.abs(distance) > w/3){
            //处理index
            if(distance > 0){//右移
                index--;
            }else{//左移
                index++;
            }
            //添加过渡
            addTransition();
            setTranslateX(-index * w);
        }else{
            //如果没有移动也是要加过渡，监听它
            addTransition();
            setTranslateX(-index * w);
        }
        //不满足条件（重置所有触摸的值)
        startX = 0;
        isMove = false;
        moveX = 0;
        distance = 0;
        autoplay();
    });
      /*点的滑动*/
      var setPoint = function() {
        /* 点滑动的时候，清除自己的样式 */
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        /* console.log(index);数组索引是从0开始的所以index数组的长度减去1 */
        /* 设置points前面一个点设置样式 */
        points[index - 1].classList.add("now");
      }
}
function downtime() {
    //需要倒计时的时间
    var time = 5 * 60 * 60;
    var timer = "";
    //操作dom
    var skTime = document.querySelector(".sk_time");
    // console.log(skTime);
    //.sk_time下所有的span
    var spans = skTime.querySelectorAll("span"); //返回的是一个数组
    // console.log(spans);
    timer = setInterval(function () {
        if (time <= 0) {
            clearInterval(timer);
        }
        time--;
        //格式化
        var h = Math.floor(time / 3600); //小时
        // console.log(h);
        var m = Math.floor((time / 60) % 60); //分
        var s = time % 60; //秒
        // console.log(h);
        // console.log(m);
        // console.log(s);
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
    }, 1000);
}
//查看改变刷新网页
function reload() {
    window.onresize = function () {
        location.reload();
    }
}
