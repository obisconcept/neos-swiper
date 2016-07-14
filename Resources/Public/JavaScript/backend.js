$(document).ready(function () {

    $('body').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(event) {

        if (event.target.localName == 'body') {

            updateSwipers();
            
            stopSwipers();

            positionSwipperBullets();

        }

    });
    


});

if (typeof document.addEventListener === 'function') {

    document.addEventListener('Neos.PageLoaded', function(event) {

        initSwiper();
        
        stopSwipers();

    });

}

window.stopSwipers = function() {
    
    $('.swiper-container').each(function() {

        this.swiper.stopAutoplay();
    
    });
    
}