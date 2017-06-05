


$(function() {
    //背景画布
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'); canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;//创建颜色

    var dots = {
        nb: 150,
        distance: 100,
        d_radius: 100,
        array: []
    };
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }
    function createColorStyle(r, g, b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
    }
    Dot.prototype = {
        draw: function() {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
    function createDots() {
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }
    function moveDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    function connectDots() {
    }
    function drawDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }
    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
    }
    createDots();//创建点
    requestAnimationFrame(animateDots);

//myPage-1的shadow显示与隐藏
    $('.myInf .myPage-1 .matext01').each((i,v)=>{
        $(v).hover(()=>{$('.myInf .myPage-1 .myUp').eq(i).stop().slideDown()},
                    ()=>{$('.myInf .myPage-1 .myUp').eq(i).stop().slideUp();})})
});

    let vm=new Vue({
        el:'#app',
        data:{
            nowL:0
        },
        methods:{
           show(){$('.z-shadow').stop().slideDown()},
           hide(){$('.z-shadow').stop().slideUp()},
           leftChange(){
               this.nowL=this.nowL+90;
               $('#box').css({
                   transition:'1s all ease',
                   transform:`rotateY(${this.nowL}deg)`
               })

           },
          rightChange(){
              this.nowL=this.nowL-90;
              $('#box').css({
                  transition:'1s all ease',
                  transform:`rotateY(${this.nowL}deg)`
              })
          }
        },
        mounted(){
           $('.list-data li').hover(function () {
                 $(this).addClass('addAnimate')
           },function () {
               $(this).removeClass('addAnimate')
           });
           $('#skills p i').hover(function () {
                 $(this).css({
                      background:'#3c3c3c'
                     ,color:'#fff'
                 })
           },function () {
               $(this).css({
                   background:'none'
                   ,color:'#000'
               })
           });
            $('#skills p a').hover(function () {
                  $(this).addClass('addColor')
            },function () {
                  $(this).removeClass('addColor')
            });
            var timer=null;
            if($(document).width()<800){
                clearInterval(timer);
                // $('html,body').on('touchmove',function () {
                timer=setInterval(function () {
                    if($(document).scrollTop()>1000){
                        $('#Top').stop().animate({
                            opacity:1
                        },1)
                    }else if($(document).scrollTop()<1000){
                        $('#Top').stop().animate({
                            opacity:0
                        },1)
                    }
                },1000);

                // })
            }

              $('html,body').on('mousemove',function () {
                  if($('#Top').offset().top>1200){
                      $('#Top').stop().animate({
                          opacity:1
                      },1)
                  }else if($('#Top').offset().top<1200){
                      $('#Top').stop().animate({
                          opacity:0
                      },1)
                  }
              });
            $('#Top').on('click',function () {
                $('html,body').stop().animate({scrollTop:'1px'},800)
            })
        }
    });
























