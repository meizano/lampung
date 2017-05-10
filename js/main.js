var kamus = new Object();

// Mengambil data JSON dari server
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
    var $kataA = "lpgkata",
        $kataT = "idkata";

    // Menukar variabel sesuai dengan bahasa asal
    if (bhasa === "indonesia")
    {
        $kataA = "idkata";
        $kataT = "lpgkata";
    }
    else if (bhasa === "lampung")
    {
        $kataA = "lpgkata";
        $kataT = "idkata";
    }

    var hasils = new Array();
    var j = 0;
    for (var i = 0; i < strArray.length; i++) {
        if (strArray[i][$kataA].match(kataAsl)) // test / match
        {
            hasils[j] = new Array();
            hasils[j][0] = strArray[i][$kataA];
            hasils[j][1] = strArray[i][$kataT];
            hasils[j][2] = strArray[i]["lpgdialek"];
            hasils[j][3] = strArray[i]["lpgaksara"];
            j++;
            if( j == 30)
                break;
        }
    }

    return hasils;
}

function aksarakan(kataLampung) {
    var $aksara ="";
    var $indeks = 0;

    if(kataLampung.charAt($indeks) == "a")
    {
        $aksara += kataLampung.charAt($indeks);
    }

    while($indeks < kataLampung.length)
    {
        if(kataLampung.charAt($indeks) != "a")
        {
            $aksara += kataLampung.charAt($indeks);
        }
        if(kataLampung.charAt($indeks) == "a" && (kataLampung.charAt($indeks+1) == "i" || kataLampung.charAt($indeks+1) == "u" || kataLampung.charAt($indeks+1) == "a"))
        {
            $aksara += kataLampung.charAt($indeks);
        }
        $indeks++;
    }
    return $aksara;
}


var kataAsal = document.getElementById('kataAsal');
var bahasa = document.getElementById("terjemahForm").elements["bahasa"];

kataAsal.onkeyup = function() {
    kataAl = kataAsal.value.toLowerCase();
    $('div#hasilTerjemah').empty();
    $('div#hasilTerjemah').removeClass();
    var terjemahan = terjemah(kataAl,bahasa.value,kamus);
    $('div#hasilTerjemah').append('<span class="kataAsal">' + kataAsal.value + ' (' + bahasa.value + ')' + '<span>');
    $('div#hasilTerjemah').append('<br/>');
    if(bahasa.value === "indonesia")
    {
        for (var i = 0; i < terjemahan.length; i++) {
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][0] + ' = </span>');
            $('div#hasilTerjemah').append('<span class="aksaraLampung">'+ aksarakan(terjemahan[i][3]) + ' | </span>');
            //            $('div#hasilTerjemah').append(aksarakan(terjemahan[i][1]) + ' | '); // untuk debugging tampilan aksara
            $('div#hasilTerjemah').append('<span>' + terjemahan[i][1]);
            if(terjemahan[i][2] != null)
                $('div#hasilTerjemah').append('<sup>'+ terjemahan[i][2] + '</sup>');
            $('div#hasilTerjemah').append('</span>');
            $('div#hasilTerjemah').append('<br/>');
        }
    } else if(bahasa.value === "lampung")
    {
        for (var i = 0; i < terjemahan.length; i++) {
            $('div#hasilTerjemah').append('<span class="aksaraLampung">'+ aksarakan(terjemahan[i][3]) + ' | </span>');
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][0]);
            if(terjemahan[i][2] != null)
                $('div#hasilTerjemah').append('<sup>'+ terjemahan[i][2] + '</sup>');
            $('div#hasilTerjemah').append(' = </span>');
            $('div#hasilTerjemah').append('<span>'+ terjemahan[i][1] + '</span>');
            $('div#hasilTerjemah').append('<br/>');
        }
    }
    $('div#hasilTerjemah').addClass("alert alert-success");
}
