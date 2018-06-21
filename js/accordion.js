$(document).ready(function(){
    $(".bp-accordion-set > a").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".bp-accordion-body")
                .slideUp(200);
            $(".bp-accordion-set > a i")
                .removeClass("bp-icon-cross")
                .addClass("bp-icon-plus");
        } else {
            $(".bp-accordion-set > a i")
                .removeClass("bp-icon-cross")
                .addClass("bp-icon-plus");
            $(this)
                .find("i")
                .removeClass("bp-icon-plus")
                .addClass("bp-icon-cross");
            $(".bp-accordion-set > a").removeClass("active");
            $(this).addClass("active");
            $(".bp-accordion-body").slideUp(200);
            $(this)
                .siblings(".bp-accordion-body")
                .slideDown(200);
        }
    });
})
