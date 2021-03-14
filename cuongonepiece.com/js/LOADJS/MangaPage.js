var sochap;
var URLServer = "/api/";

var changebackground;

    if(getCookie("changebackground") === "true"){
        changebackground = true;
    }else if(getCookie("changebackground") === "false"){
        changebackground = false;
    }else{
        setCookie("changebackground", "true", 3);
        changebackground = true;
    }

if(typeof GetUrlParameter('sochap') !== "undefined"){
    sochap = GetUrlParameter('sochap');
}else{
    sochap = -1;
}

var check;

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(String(this.responseText) === "that bai") {
                window.location.href = "/nofound";
            }
            if(check == 1){
                loadElementChap(JSON.parse(this.responseText));
            }
        }
    };

function loadChap(){
    check = 1;
    xhttp.open("GET", URLServer+"loadManga?sochap="+sochap, false);
    xhttp.send();
}

function loadElementChap(data){
    var listchaps = data.chaps;
    if((typeof sochap === "undefined") || sochap == -1){
        sochap = listchaps[0].so_chap;
    }
    var elements = '';
    $('.switch_tray').empty();
    for(var i = 0; i < listchaps.length ; i++){
        if(Number(listchaps[i].so_chap) === Number(sochap)) elements = elements + '<option selected value="'+listchaps[i].so_chap+'">Chap '+listchaps[i].so_chap+'</option>';
        else elements = elements + '<option value="'+listchaps[i].so_chap+'">Chap '+listchaps[i].so_chap+'</option>';
    }
    $('.switch_tray').append(elements);

    if(Number(listchaps[0].so_chap) == Number(sochap)){
        document.getElementsByClassName("next_button").item(0).style.display = "none";
    }
    if(Number(listchaps[listchaps.length - 1].so_chap) == Number(sochap)){
        document.getElementsByClassName("return_button").item(0).style.display = "none";
    }
    $('.wrap_manga').empty();

    var datachap = data.datachap;
    elements = '';
    for(var i = 0; i < datachap.length ; i++){
        if(datachap[i].anh_ngang === "true"){
            elements = elements + '<img class="width_manga" src="'+decode_utf8(datachap[i].anh)+'" alt="" srcset=""></img>'
        }else{
            elements = elements + '<img class="height_manga" src="'+decode_utf8(datachap[i].anh)+'" alt="" srcset=""></img>'
        } 
    }
    $('.wrap_manga').append(elements);
    $('.number_chapter').append("CHƯƠNG " + sochap);
}

loadChap();

function handleSelect(elm){
   window.location = '/manga?sochap='+elm.value;
}