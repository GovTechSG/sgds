$(document).ready(function () {
    $(".bp-accordion-set > a").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".bp-accordion-body")
                .slideUp(300);
            $(".bp-accordion-set > a i")
                .removeClass("bp-icon-angle-up")
                .addClass("bp-icon-angle-down");
        } else {
            $(".bp-accordion-set > a i")
                .removeClass("bp-icon-angle-up")
                .addClass("bp-icon-angle-down");
            $(this)
                .find("i")
                .removeClass("bp-icon-angle-down")
                .addClass("bp-icon-angle-up");
            $(".bp-accordion-set > a").removeClass("active");
            $(this).addClass("active");
            $(".bp-accordion-body").slideUp(300);
            $(this)
                .siblings(".bp-accordion-body")
                .slideDown(300);
        }
    });
});
