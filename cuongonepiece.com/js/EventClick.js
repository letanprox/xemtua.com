$("body").click(function(e) {
    var url_string = window.location.href;
    if(url_string.indexOf('/manga') == -1) MenuClick(e);
    
    if(url_string.includes('/search') || url_string.includes('/danhsachtap') || url_string.includes('/danhsachphim')) ChosePageSearch(e);
    if(url_string.includes('/xemphim')) ClickPlayerContent(e);

    if(url_string.includes('/manga')) EventManga(e);

    if(url_string.includes('/videoedit')) LoadMoreShortVideo(e);
});