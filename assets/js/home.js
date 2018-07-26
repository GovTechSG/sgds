$( document ).ready(function() {
    var clipboard = new ClipboardJS('.clipboard-btn');
    clipboard.on('success',function(e){
        console.info('Text:', e.text);
        e.clearSelection();
    });
});