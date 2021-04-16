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
if(location.pathname.split("/")[3] === '') sochap = -1;
else sochap = location.pathname.split("/")[3];

function handleSelect(elm){
    window.location = '/chapter/'+location.pathname.split("/")[2]+'/'+elm.value;
}

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(String(this.responseText) === "that bai") window.location.href = "/manga";
                data = JSON.parse(this.responseText);
                console.log(data)
                $('.title_manga').append(decode_utf8(data.tentruyen));
                $('title').empty();
                $('title').append(decode_utf8(data.tentruyen) + " chap " + sochap);
                $("#keywords").attr("content",decode_utf8(data.tentruyen) + " chap " + sochap +" , "+ decode_utf8(data.tentruyen) + " viet nam" +" , "+ decode_utf8(data.tentruyen) + " truyen " +" , doc truyen "+ decode_utf8(data.tentruyen) +" , "+ decode_utf8(data.tentruyen) + " chuong " + sochap);
                $("#description").attr("content", "Đọc truyện " + decode_utf8(data.tentruyen) + " chap " + sochap + " việt sub với Xem Tua "  );
                loadElementChap(data);
        }
    };

function loadChap(){
    xhttp.open("GET", URLServer+"loadManga?sochap="+sochap+"&tukhoa="+location.pathname.split("/")[2], false);
    xhttp.send();
}

function loadElementChap(data){
    var listchaps = data.chaps;
    sochap = data.sochap
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
        console.log(datachap[i].url_anh)
        if(datachap[i].anh_ngang === true){
            elements = elements + '<img class="width_manga" src="'+decode_utf8(datachap[i].url_anh)+'" alt="" srcset=""></img>'
        }else{
            elements = elements + '<img class="height_manga" src="'+decode_utf8(datachap[i].url_anh)+'" alt="" srcset=""></img>'
        } 
    }
    $('.wrap_manga').append(elements);
}

loadChap();