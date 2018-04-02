$(document).ready(function(){
    $bpExample = $('.bp-example');
    $toggleBtn = $('.toggle-styling');
    $.each($bpExample, function(){
        $(this).on('click',function(){

            $(this).toggleClass('no-styling');
            console.log($(this))
        });
    });
});