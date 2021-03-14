window.addEventListener("resize", function() {
    var url_string = window.location.href;
    if(url_string.includes('/anime')) ResizePlayerContent();
    if(url_string.includes('/ova')) ResizePlayerContent();
    if(url_string.includes('/movie')) ResizePlayerContent();
    ResizeMenu();
});