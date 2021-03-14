function ResizeMenu(){
    if (window.innerWidth <=  600){
        if(type_screen_ofMenu != 1){
            type_screen_ofMenu = 1;
            changeCssMobileMenu();
        }
    }else if((window.innerWidth <=  768) && (window.innerWidth >  600)){
        if(type_screen_ofMenu != 2){
            type_screen_ofMenu = 2;
            changeCssLargephonesMenu();
        }
    }else if((window.innerWidth <=  992) && (window.innerWidth >  768)){
        if(type_screen_ofMenu != 3){
            type_screen_ofMenu = 3;
            changeCssTabletMenu();
        }
    }else{
        if(type_screen_ofMenu != 4){
            type_screen_ofMenu = 4;
            changeCssPcMenu();
        } 
    } 
}