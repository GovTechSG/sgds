$( document ).ready(function() {
    var highlights = $('.language-html');
    highlights.each(function(key, value){
        $(this).addClass('highlight' + key)
    });

    var clipboard = new ClipboardJS('.clipboard-btn');
    clipboard.on('success',function(e){
        e.clearSelection();
    });
});