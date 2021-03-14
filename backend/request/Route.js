module.exports = (root,method,url,returnRoute) => {
    n = url.indexOf("?") === -1 ? n = url.length : n = url.indexOf("?");
    url = url.substring(0, n);

    let url_check = url;
    if(url_check.includes('/api') || url_check.includes('/jpanel') || url_check.includes('/cpanel')){
        url_check = '/' + url_check.split("/")[1] + '/' +  url_check.split("/")[2] ;
    }else{
        if(url_check !== '/') url_check = '/' + url_check.split("/")[1];
    }
    
    if(root.includes("xemtua.com")) root = "xemtua.com";
    if(root.includes("cuongonepiece.com")) root = "cuongonepiece.com";
    let list = returnRoute.state[root];
    for (let i in list) {
        if ('/' + list[i].name === url_check && list[i].method === method){
            url = '/' + list[i].file;
        }
    }
    return url;
};