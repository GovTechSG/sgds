$(document).ready(function(){
    $(".show-landing-modal").click(function() {
        $("#modal-landing-page").addClass("is-active");
    });
    $(".show-doc-modal").click(function() {
        $("#modal-doc-page").addClass("is-active");
    });

    $(".sgds-modal-close, .sgds-modal-background").click(function() {
        $(".sgds-modal").removeClass("is-active");
    });
});