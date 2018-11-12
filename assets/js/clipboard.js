$( document ).ready(function() {
    var highlights = $('.language-html');
    highlights.each(function(key, value){
        $(this).addClass('highlight' + key)
    });

    var clipboard = new ClipboardJS('.clipboard-btn');
    clipboard.on('success',function(e){

        var originalText = e.trigger.innerHTML;
        e.clearSelection();
        e.trigger.textContent = 'Copied';
        e.trigger.classList.add('is-success');
        window.setTimeout(function() {
            e.trigger.textContent = originalText;
            e.trigger.classList.remove('is-success');
        }, 1000);

    });
});