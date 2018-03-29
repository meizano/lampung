/*jslint browser: true*/
/*global $, jQuery, alert*/
'use strict';
var kamus = {};
kamus = kamusLampung;
/*
// Mengambil data JSON dari server
$.ajax({
    type: "GET",
    url: "dispatcher/indonesia2lampung.json", // URL dari data JSON
    dataType: "json",
    // Jika web service tidak merespon/gagal
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        hasilTerjemah.text("responseText: " + XMLHttpRequest.responseText +
            ", textStatus: " + textStatus +
            ", errorThrown: " + errorThrown);
        hasilTerjemah.removeClass();
        hasilTerjemah.addClass("alert alert-warning");
    }, // error

    // Jika web service merespon
    // data yang mengandung nilai JSON akan dikembalikan
    success: function (data) {
        kamus = data;
        hasilTerjemah.text("Siap menterjemahkan.");
        hasilTerjemah.removeClass();
        hasilTerjemah.addClass("alert alert-success");
    } // success
}); // ajax
*/
function terjemah(kataAsl, bhasa, strArray) {
    let $kataA = "lpgkata",
        $kataT = "idkata";


    // Menukar variabel sesuai dengan bahasa asal
    if (bhasa === "indonesia") {
        $kataA = "idkata";
        $kataT = "lpgkata";
    } else if (bhasa === "lampung") {
        $kataA = "lpgkata";
        $kataT = "idkata";
    }

    let hasils = [],
        j = 0;

    for (let i = 0; i < strArray.length; i++) {
        if (strArray[i][$kataA] === kataAsl) // test / match
        {
            hasils[j] = new Array();
            hasils[j][0] = strArray[i][$kataA];
            hasils[j][1] = strArray[i][$kataT];
            hasils[j][2] = strArray[i]["lpgdialek"];
            hasils[j][3] = strArray[i]["lpgaksara"];
            j++;
            if (j == 30)
                break;
        }
    }

    return hasils;
}

function aksarakan(kataLampung) {
    var $aksara = "";
    var $indeks = 0;


    if (kataLampung.charAt(0) === "a") {
        $aksara += kataLampung.charAt(0);
        $indeks++;
    }

    while ($indeks < kataLampung.length) //
    {
        if (kataLampung.charAt($indeks) === "a") //
        {
            if (kataLampung.charAt($indeks + 1) === "i" || kataLampung.charAt($indeks + 1) == "u" || kataLampung.charAt($indeks + 1) === "a") //
            {
                $aksara += kataLampung.charAt($indeks);
            }

        } else {
            $aksara += kataLampung.charAt($indeks);
        }
        $indeks++;
    }

    if (kataLampung.charAt(kataLampung.length - 1) === "a" || kataLampung.charAt(kataLampung.length - 1) === "u" || kataLampung.charAt(kataLampung.length - 1) === "i" || kataLampung.charAt($indeks - 1) === "e" || kataLampung.charAt($indeks - 1) === "o") {

    } else {
        $aksara += "x";
    }

    return $aksara;
}


//Fungsi untuk memudahkan buat Node
function createNode(element) {
    return document.createElement(element); // Membuat tipe elemen yang dilewatkan melalui parameter
}

//Fungsi untuk menambahkan sub node di bawah Node
function append(parent, el) {
    return parent.appendChild(el); // Append parameter kedua ke yang pertama
}

var kataAsal = document.getElementById('kataAsal');
var bahasa = document.getElementById("terjemahForm").elements["bahasa"];
//var hasilTerjemah = document.getElementById('hasilTerjemah');

kataAsal.onkeyup = function () {
    //Merubah ke huruf kecil semua agar tidak ada perbedaan huruf kecil dan besar
    var kataAl = kataAsal.value.toLowerCase();

    //Mengosongkan nilai dan menghilangkan style
    hasilTerjemah.innerHTML = '';
    hasilTerjemah.classList.remove();

    //menterjemahkan
    var terjemahan = terjemah(kataAl, bahasa.value, kamus);

    //membuat span dan menambahkannya ke div#hasilTerjemah
    var span = createNode("span");
    span.classList.add("kataAsal");
    span.innerHTML = kataAsal.value + ' (' + bahasa.value + ')';
    append(hasilTerjemah, span);
    append(hasilTerjemah, createNode("br"));

    if (bahasa.value === "indonesia") {
        terjemahan.map(function (dt) {
            let p = createNode('p'),
                span1 = createNode('span'),
                span2 = createNode('span'),
                span3 = createNode('span'); // memakai fungsi pembuat elemen
            span1.innerHTML = dt[0] + " = ";
            span2.innerHTML = dt[1];
            span2.classList.add("aksaraLampung"); //diubah menjadi aksara
            span3.innerHTML = " (" + dt[1] + ")";
            if (dt[2] != null) {
                let sup = createNode('sup');
                sup.innerHTML = dt[2];
                append(span3, sup);
            }
            append(p, span1); // memakai fungsi append ke parameter pertama
            append(p, span2);
            append(p, span3);
            append(hasilTerjemah, p);
        })
    } else if (bahasa.value === "lampung") {
                terjemahan.map(function (dt) {
            let p = createNode('p'),
                span1 = createNode('span'),
                span2 = createNode('span'),
                span3 = createNode('span'); // memakai fungsi pembuat elemen
            span1.innerHTML = dt[0];
            span1.classList.add("aksaraLampung"); //diubah menjadi aksara
            span2.innerHTML = " (" + dt[0] + ")";
            //jika ada dialek
            if (dt[2] != null) {
                let sup = createNode('sup');
                sup.innerHTML = dt[2];
                append(span2, sup);
            }
                    span3.innerHTML = " = " + dt[1];
            append(p, span1); // memakai fungsi append ke parameter pertama
            append(p, span2);
            append(p, span3);
            append(hasilTerjemah, p);
        })
    }
    hasilTerjemah.classList.add("alert", "alert-success");
}
