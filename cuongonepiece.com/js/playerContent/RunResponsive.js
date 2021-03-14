function changeCssRePlayerContent(x,loadCss){
    if(type_screenPlayerContent != x || type_screenPlayerContent == 0){
        type_screenPlayerContent = x;
        loadCss();
    }
    scrollBarList();
}
function RunResponsivePlayerContent(){
    if (window.innerWidth <=  600){
        changeCssRePlayerContent(1,changeCssNoPcPlayerContent);
    }else if((window.innerWidth <=  768) && (window.innerWidth >  600)){
        changeCssRePlayerContent(2,changeCssNoPcPlayerContent);
    }else if((window.innerWidth <=  992) && (window.innerWidth >  768)){
        changeCssRePlayerContent(3,changeCssNoPcPlayerContent);
    }else{
        changeCssRePlayerContent(4,changeCssPcPlayerContent);
    } 
}
RunResponsivePlayerContent();