$( document ).ready(function() {
    var highlights = $('.language-html');
    highlights.each(function(key, value){
        $(this).addClass('highlight' + key)
    });

    var clipboard = new ClipboardJS('.clipboard-btn');
    clipboard.on('success',function(e){
        console.log(e)
        var originalText = e.trigger.innerHTML;
        e.clearSelection();
        e.trigger.textContent = 'Copied';
        window.setTimeout(function() {
            e.trigger.textContent = originalText;
        }, 1000);

    });
});