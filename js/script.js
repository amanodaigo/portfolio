// Loading
$(window).on('load', function(){
    setTimeout(function(){
        $('.loading').addClass('loaded');
        $('header').addClass('show');
        $('.header-inner').addClass('anim');
    }, 3000);
    setTimeout(function(){
        $('.loading').hide();
        $('.header-inner').removeClass('anim');
    }, 7000);
    setTimeout(function(){
        $('#about > h2').addClass('inview');
    }, 5000);
    setTimeout(function(){
        $('.profile > div').each(function(i){
            $(this).delay(200 * i).queue(function(){
                $(this).addClass('inview').dequeue();
            });
        });
    }, 5200);

    $('.typing').each(function(){
        var text = $(this).html();
        var textbox = '';
        text.split('').forEach(function(target){
            if(target !== ' '){
                textbox += '<span>' + target + '</span>';
            }else{
                textbox += target;
            }
        });
        $(this).html(textbox);
    });

    $('.typing').each(function(){
        $(this).children().each(function(i){
        var time = 100;
        $(this).delay(time * i).fadeIn(time);
        });
    });
});

$(document).ready(function(){
    // Heading Animation
    $('h1 span.heading').each(function(){
        var text = $(this).html();
        var textbox = '';
        text.split('').forEach(function(target){
            textbox += '<span>' + target + '</span>';
        });
        $(this).html(textbox);
    });

    $(window).on('scroll', function(){
        var ua = navigator.userAgent;
        if((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0){
            var scroll = 2500;
        }else{
            if($(this).scrollTop() > 80){
                $('header').addClass('fixed');
            }else{
                $('header').removeClass('fixed');
            }
            if($(this).scrollTop() > 7300){
                $('header').addClass('hide');
            }else{
                $('header').removeClass('hide');
            }
            var scroll = 1700;
        }
        if($(this).scrollTop() > scroll){
            $('.disp-scroll').addClass('hide');
        }else{
            $('.disp-scroll').removeClass('hide');
        }

        // Display Animation
        $('h2, .strength p, .strength img, .works-wrapper > div, .thanks').each(function(i){
            var pos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var height = $(window).height();
            if (scroll > pos - height + height / 100){
                $(this).addClass('inview');
            }
        });
    });

    // Smooth Scroll
    $('a[href^="#"]').click(function(){
        var speed = 500;
        var href= $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var pos = target.offset().top;
        $('html, body').animate({scrollTop:pos}, speed, 'swing');
        return false;
    });

    // Scroll to Top
    var progressPath = $('.progress-wrap path');
    var pathLength = progressPath.get(0).getTotalLength();

    progressPath.css({
        'transition': 'none',
        'strokeDasharray': pathLength + ' ' + pathLength,
        'strokeDashoffset': pathLength
    });

    progressPath[0].getBoundingClientRect();
    progressPath.css('transition', 'stroke-dashoffset 10ms linear');

    var updateProgress = function(){
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.css('strokeDashoffset', progress);
    };

    updateProgress();

    $(window).on('scroll', updateProgress);

    var offset = 300;
    var speed = 500;

    $(window).on('scroll', function(){
        if($(this).scrollTop() > offset){
            $('.progress-wrap').addClass('active-progress');
        }else{
            $('.progress-wrap').removeClass('active-progress');
        }
    });

    var isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    var eventType = (isTouchDevice) ? 'touchend' : 'click';

    $('.progress-wrap').on(eventType, function(event){
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, speed, 'swing');
        return false;
    });


    // Horizontal Scroll
    var $stickyContainers = $('.works');

    $stickyContainers.each(function(){
        var $stickyContainer = $(this);
        var $stickyItem = $stickyContainer.find('.sticky');
        var $scroller = $stickyContainer.find('.works-wrapper');
        $scroller.addClass('nobar');

        var updateStickyHeight = function(){
            var stickyHeight = $scroller.get(0).scrollWidth - $scroller.get(0).clientWidth + $stickyItem.get(0).clientHeight;
            $stickyContainer.css('--sticky-container-height', `${stickyHeight}px`);
        };
        updateStickyHeight();

        new ResizeObserver(updateStickyHeight).observe($scroller.get(0));
        new ResizeObserver(updateStickyHeight).observe($stickyItem.get(0));

        var syncScroll = function(){
            var rect = $stickyContainer[0].getBoundingClientRect();
            if(rect.top <= 0 && rect.bottom >= $(window).height()){
                $scroller.scrollLeft($(window).scrollTop() - $stickyContainer.offset().top);
            }else if(rect.bottom < $(window).height()){
                $scroller.scrollLeft($scroller.get(0).scrollWidth - $scroller.get(0).clientWidth);
            }else{
                $scroller.scrollLeft(0);
            }
        };

        var observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    $(window).on('scroll', syncScroll);
                    syncScroll();
                }else{
                    $(window).off('scroll', syncScroll);
                }
            });
        }, {threshold: 0});

        observer.observe($stickyContainer[0]);
    });

    // Modal Window
    $(window).scroll(function(){
        var ua = navigator.userAgent;
        if((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0){
            var scroll = $(this).scrollTop() + 50;
        }else{
            var scroll = $(this).scrollTop() - 50;
        }
        $('.modal-open-button').on('click', function(){
            $('body').css('overflow-y', 'hidden');
            $('.modal-contents').css('top', scroll + 'px');
            var modal_id = $(this).attr("id");
            $('.modal, .modal-wrapper.' + modal_id).fadeIn();
            $('.close-button-wrapper').addClass('show');
        });
    });
    $('.modal-close-button, .modal').on('click', function(){
        $('.modal, .modal-wrapper').fadeOut();
        $('body').css('overflow-y', 'auto');
        $('.close-button-wrapper').removeClass('show');
    });

});