function changeCssMenu(x,loadCss){
    if(type_screen_ofMenu != x || type_screen_ofMenu == 0){
        type_screen_ofMenu = x;
        loadCss();
    }
}
if (window.innerWidth <=  600){
    changeCssMenu(1,changeCssMobileMenu)
}else if((window.innerWidth <=  768) && (window.innerWidth >  600)){
    changeCssMenu(2,changeCssLargephonesMenu)
}else if((window.innerWidth <=  992) && (window.innerWidth >  768)){
    changeCssMenu(3,changeCssTabletMenu)
}else{
    changeCssMenu(4,changeCssPcMenu)
}    