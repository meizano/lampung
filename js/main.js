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

//    if(bahasa === "indonesia")
//    {
//     // Menukar variabel sesuai dengan bahasa asal
//
//
//    }
//    else {
//
//    }
    var hasils = "";
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j]['idkata'].match(kataAsl))
            hasils += strArray[j]['idkata'] + " = " + strArray[j]['lpgkata'] + " | ";
    }

    return hasils;
}


var kataAsal = document.getElementById('kataAsal');
var bahasa = $('[name="bahasa"]').val(); // mendapatkan nilai bahasa

kataAsal.onkeyup = function() {
    $('div#hasilTerjemah').removeClass();
//    $('div#hasilTerjemah').text(kamus[1]['lpgkata']);
    $('div#hasilTerjemah').text(kataAsal.value + " || " + terjemah(kataAsal.value,bahasa,kamus));
    $('div#hasilTerjemah').addClass("alert alert-success");
}
