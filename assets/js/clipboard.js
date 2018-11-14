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

    var icon_classNameCopy = $('.icon-clipboard-btn small');
    icon_classNameCopy.each(function(key,value){

        // $(this).addClass('icon_className' + key)
    });

    var icon_clipboard = new ClipboardJS('.icon-clipboard-btn');
    icon_clipboard.on('success',function(e){
        console.log(e.trigger.lastElementChild)
         var originalText = e.trigger.lastElementChild.innerText;
        e.clearSelection();
        e.trigger.classList.remove('sgds-tooltip');
        e.trigger.lastElementChild.innerText = 'Copied';
        e.trigger.lastElementChild.classList.add('has-text-success');
        window.setTimeout(function() {
            e.trigger.lastElementChild.innerText = originalText;
            e.trigger.classList.add('sgds-tooltip');
            e.trigger.lastElementChild.classList.remove('has-text-success');
        }, 1000);
    });
});