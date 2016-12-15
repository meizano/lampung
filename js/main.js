var kamus = new Object();

$.ajax({
    type: "GET",
    url: "dispatcher/indonesia2lampung.json", // URL dari data JSON
    dataType: "json",
    // Jika web service tidak merespon/gagal
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('div#hasilTerjemah').text("responseText: " + XMLHttpRequest.responseText +
                                    ", textStatus: " + textStatus +
                                    ", errorThrown: " + errorThrown);
        $('div#hasilTerjemah').removeClass();
        $('div#hasilTerjemah').addClass("alert alert-warning");
    }, // error

    // Jika web service merespon
    // data yang mengandung nilai JSON akan dikembalikan
    success: function (data) {
        kamus = data;
        $('div#hasilTerjemah').text("Siap menterjemahkan.");
        $('div#hasilTerjemah').removeClass();
        $('div#hasilTerjemah').addClass("alert alert-success");
    } // success
}); // ajax


function terjemah(kataAsl, bhasa, strArray) {

    // Menukar variabel sesuai dengan bahasa asal
    if(bhasa === "indonesia")
    {
        var $kataA = 'idkata';
        var $kataT = 'lpgkata';
    }
    else if(bhasa === "lampung")
    {
        var $kataA = 'lpgkata';
        var $kataT = 'idkata';
    }
    var hasils = new Array();
    for (var i = 0; i < strArray.length; i++) {
        hasils[i] = new Array();
        if (strArray[i][$kataA].match(kataAsl))
        {
            hasils[i][0] = strArray[i][$kataA];
            hasils[i][1] = strArray[i][$kataT];
        }
    }

    return hasils;
}


var kataAsal = document.getElementById('kataAsal');
var bahasa = document.getElementById("terjemahForm").elements["bahasa"];

kataAsal.onkeyup = function() {
    $('div#hasilTerjemah').empty();
    $('div#hasilTerjemah').removeClass();
    var terjemahan = terjemah(kataAsal.value,bahasa.value,kamus);
    $('div#hasilTerjemah').append('<span class="kataAsal">' + kataAsal.value + ' (' + bahasa.value + ')' + '<span>');
    $('div#hasilTerjemah').append('<br/>');
    if(bahasa.value === "indonesia")
    {
        for (var i = 0; i < terjemahan.length; i++) {
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][0] + ' = <span>');
            $('div#hasilTerjemah').append('<span class="aksaraLampung">'+ terjemahan[i][1] + ' | <span>');
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][1] + '<span>');
            $('div#hasilTerjemah').append('<br/>');
        }
    } else if(bahasa.value === "lampung")
    {
        for (var i = 0; i < terjemahan.length; i++) {
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][0] + ' = <span>');
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][1] + '<span>');
            $('div#hasilTerjemah').append('<br/>');
        }
    }
    $('div#hasilTerjemah').addClass("alert alert-success");
}
