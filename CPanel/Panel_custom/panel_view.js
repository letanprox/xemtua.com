
function decode_utf8( s , i){
    if(stringlist.includes(i)) return decodeURI(s).replace(/0765547053/gi, "&"); else return s;
}

function OneItem(myObj){
    let element = '';
    for(let i = 0; i < item.length; i++) element = element + '<div>'+ decode_utf8(myObj[item[i]], i) +'</div>';
    element = element + '</span><button id="'+myObj[item[0]];
    return element;
}

let URL_COUNT = "/jpanel/"+url_count+"?"+value_group+"="+value_group_+"&"+value_group1+"="+value_group1_;  // return number
let URL_DELETE = "/jpanel/"+url_delete+"?"+value_group+"="+value_group_+"&"+value_group1+"="+value_group1_+"&"+item[0]+"=";   //return thanh cong
let URL_POST = "/jpanel/"+url_getlist+"?"+value_group+"="+value_group_+"&"+value_group1+"="+value_group1_;  //return json


let check = -1;
let emty;

let number_item = 10;
let count;
let total_page;
let current_page = 1;

//XML HTTP 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {
    
    //CHECK ---------------------------------------
    if(check === 1){
        $('.list_number_page').empty(); 
            for(let i = 0; i < total_page-1 ; i++){
                k = i + 1;
                if(k == current_page) var elements = '<span id="touch_number_page">--'+k+'--</span>';
                else var elements = '<span id="'+k+'">--'+k+'--</span>';
                $('.list_number_page').append(elements);
            }

            
        let myObj = JSON.parse(this.responseText);
        emty = 0;
            for(let i = 0; i < myObj.length ; i++){
                if(emty === 0) {$('.list_contain').empty(); emty = 1;}
                var elements =  '<span class="one_item">'+ OneItem(myObj[i])+'" type="submit" class="DELETE">DELETE</button>    <br><br>';
                $('.list_contain').append(elements);
            }

    //CHECK ---------------------------------------
    }else if(check === -1){
        count = Number(this.response);
        total_page = count / number_item + 1;
        GetPage();

    //CHECK ---------------------------------------
    }else if(check === 2){
        if(this.responseText === 'thanh cong'){
            check = -1;
            GetCount();           
        }
    }


}else{console.log("-----");}};


function GetPage(){
    check = 1;
    xhttp.open("POST", URL_POST + "&password="+password, true);
    xhttp.send("?skip="+(current_page-1)*number_item+"&limit="+number_item);
}

function GetCount(){
    xhttp.open("GET", URL_COUNT + "&password="+password, true);
    xhttp.send();
}

window.onload = function(){
    if(check === -1){
        GetCount();
    }
}

window.addEventListener("click", function(event) {
    var x = event.target;
    if(x.parentNode.className == "list_number_page"){
        if(x.id != "touch_number_page"){
            current_page = Number(x.id);
            GetPage();
        }
    }
    if(x.className == "DELETE"){
        check = 2;
        //change
        xhttp.open("DELETE", URL_DELETE + x.id + "&password="+password, true);
        xhttp.send();
    }
});