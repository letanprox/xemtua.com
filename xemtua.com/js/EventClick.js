$("body").click(function(e) {
    var url_string = window.location.href;
    if(url_string.indexOf('/chapter') == -1) MenuClick(e);
    
    // if(url_string.includes('/search') || url_string.includes('/danhsachtap') || url_string.includes('/danhsachphim')) ChosePageSearch(e);
    if(url_string.includes('/episode')) ClickPlayerContent(e);
    if(url_string.includes('/movie')) ClickPlayerContent(e);
    if(url_string.includes('/ova')) ClickPlayerContent(e);

    if(url_string.includes('/chapter')) EventManga(e);

    if(url_string.includes('/video')) LoadMoreShortVideo(e);
});