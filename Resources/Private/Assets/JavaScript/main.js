$(document).ready(function() {

    initSwiper();

});

window.initSwiper = function() {
    
    var swiper = [];
    $('.swiper-container').each(function(index){

        var $el = $(this);

        swiper[index] = $el.swiper({
            speed: 400,
            pagination: $el.find('.swiper-pagination')[0],
            paginationClickable: true,
            autoplay: 10000,
            autoplayDisableOnInteraction: false,
            simulateTouch: false
        });

        $el.find('.prev-slide').on('click', function(){
            swiper[index].swipePrev();
        });

        $el.find('.next-slide').on('click', function(){
            swiper[index].swipeNext();
        });
        
        positionSwipperBullets();
    
        $(window).resize(function() {
    
            updateSwipers();
    
            positionSwipperBullets();
    
        });

    });

}

window.positionSwipperBullets = function() {

    if ($('.swiper-container .swiper-pagination').length > 0) {

        $('.swiper-container .swiper-pagination').hide();

        var rightWidth = Number($('.swiper-container .head .head-inner').css('marginRight').replace('px', '')) + Number($('.swiper-container .head .head-inner').css('paddingRight').replace('px', ''));
        $('.swiper-container .swiper-pagination').css('right', String(rightWidth) + 'px');

        $('.swiper-container .swiper-pagination').show();

    }

}

window.updateSwipers = function() {

    $('.swiper-container').each(function() {

        this.swiper.update();
        this.swiper.slideTo();
        this.swiper.startAutoplay();

    });

}