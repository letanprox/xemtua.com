// Original
function encode_utf8( s  , i){
    if(stringlist.includes(i)) return encodeURI(s.replace(/&/gi, "0765547053")); else return s;
}
function decode_utf8( s , i){
    if(stringlist.includes(i)) return decodeURI(s).replace(/0765547053/gi, "&"); else return s;
}


function UPDATE_ITEM(){
    let element = '';true
    for(let i = 0; i < item.length; i++) element = element + '<input type="text"  placeholder="'+item[i]+'"    id="'+item[i]+'_"    value="">';
    return element;
}

function INSERT_ITEM(){
    let element = '';
    for(let i = 0; i < item.length; i++) element = element + '<input type="text"  placeholder="'+item[i]+'"    id="'+item[i]+'">';
    return element;
}

function UPDATE_ITEM_INFO(myObj){

    let element = '';
    for(let i = 0; i < item.length; i++) element = element + '<input type="text"  placeholder="'+item[i]+'"    id="'+item[i]+'_"  value="'+ decode_utf8(myObj[item[i]], i)+ '">';
    return element;
}




var URL_INSERT = () => { return '/cpanel/'+url_insert+'&'+item[0]+'='+document.getElementById(item[0]).value+'&'+item[1]+'='+document.getElementById(item[1]).value;
                        }


var BODY_INSERT = () => { 
    let element = '?';
    for(let i = 2; i < item.length; i++) element = element +'&'+item[i]+'='+encode_utf8(document.getElementById(item[i]).value,i);
    return element;
                    }


var URL_UPDATE = () => { return  '/cpanel/'+url_update+'&'+item[0]+'='+document.getElementById(item[0]+'_').value+'&'+item[1]+'='+document.getElementById(item[1]+'_').value;
                        }


var BODY_UPDATE = () => { 
    let element = '?';
    for(let i = 2; i < item.length; i++) element = element +'&'+item[i]+'='+ encode_utf8(document.getElementById(item[i]+'_').value, i);
    return element;
                        }   

var URL_DELETE = () => { return  '/cpanel/'+url_delete+'&'+item[0]+'='+document.getElementById(item[0]+'_').value+'&'+item[1]+'='+document.getElementById(item[1]+'_').value;
                        }

var URL_SEARCH = () => { return  '/cpanel/'+url_search+'&'+item[0]+'='+document.getElementById("SEARCH_TEXT").value+'&'+item[1]+'='+document.getElementById("SEARCH_TEXT1").value;
                        }



let check;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(check === 1){
                let myObj = JSON.parse(this.responseText);
                for(let i = 0; i < myObj.length ; i++){
                    $('.update_contain').empty();
                    $('.update_contain').append(UPDATE_ITEM_INFO(myObj[i]));
                }
            }else if(check === 2){
                if(this.responseText === 'thanh cong'){
                    $('.update_contain').empty();
                    $('.update_contain').append(UPDATE_ITEM());
                }
            }else if(check === 3){
                if(this.responseText === 'thanh cong'){
                    $('.insert_contain').empty();
                    $('.insert_contain').append(INSERT_ITEM());
                }
            }else if(check === 4){
                if(this.responseText === 'thanh cong'){
                    $('.update_contain').empty();
                    //change            
                    $('.update_contain').append(UPDATE_ITEM());
                }
            }
        }else{
            console.log("-----");
        }
    };

document.getElementById("SEARCH").onclick = function(){
    check = 1;
    //change
    xhttp.open("GET", URL_SEARCH()+"&password="+password, true);
    xhttp.send();
}
document.getElementById("UPDATE").onclick = function(){
    check = 2;
    //change
    xhttp.open("PUT", URL_UPDATE()+"&password="+password, true);
    xhttp.send(BODY_UPDATE());
}
document.getElementById("INSERT").onclick = function(){
    check = 3;
    //change
    xhttp.open("POST", URL_INSERT()+"&password="+password, true);
    xhttp.send(BODY_INSERT());
}
document.getElementById("DELETE").onclick = function(){
    check = 4;
    //change
    xhttp.open("DELETE", URL_DELETE()+"&password="+password, true);
    xhttp.send();
}