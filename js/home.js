$( document ).ready(function() {

    var carousel_setting = {
        loop:true,
        autoplay:true,
        autoplayTimeout:7000,
        margin:0,
        nav:false,
        mouseDrag:false,
        items: 1,
        dots:true,
        animateOut: 'fadeOut',
        responsive : {
            // breakpoint from 0 up
            0 : {
                dots : true,
                mouseDrag:true
            },

            // breakpoint from 768 up
            768 : {
                dots : false

            }
        }

    };

    var programme_carousel = $('.programme-carousel');
    var programme_nav_left = $('.carousel-nav-container.programme-nav .carousel-nav.left');
    var programme_nav_right = $('.carousel-nav-container.programme-nav .carousel-nav.right');

    var career_carousel = $('.career-carousel');
    var career_nav_left = $('.carousel-nav-container.career-nav .carousel-nav.left');
    var career_nav_right = $('.carousel-nav-container.career-nav .carousel-nav.right');

    programme_carousel.owlCarousel(carousel_setting);
    programme_nav_left.click(function(){
        programme_carousel.trigger('prev.owl.carousel',[1000])
    });
    programme_nav_right.click(function(){
        programme_carousel.trigger('next.owl.carousel',[1000])
    });

    career_carousel.owlCarousel(carousel_setting);
    career_nav_left.click(function(){
        career_carousel.trigger('prev.owl.carousel',[1000])
    });
    career_nav_right.click(function(){
        career_carousel.trigger('next.owl.carousel',[1000])
    });

});