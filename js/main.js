/*jslint browser: true*/
'use strict';
var kamusJSON = {};
var kamus = {};

var hasilTerjemah = document.getElementById('hasilTerjemah');

// Memeriksa apakah web storage tersedia
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
};

// Mengambil data JSON dari server
function fetchKamus() {
    var url = './dispatcher/indonesia2lampung.json'; // URL dari data JSON
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            // Simpan Data
            localStorage.setItem('kamusJSON', JSON.stringify(data));
            kamus = data;
            hasilTerjemah.innerHTML = 'Siap menterjemahkan';
            hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
            hasilTerjemah.classList.add("alert", "alert-info");

        })
        .catch(function (error) {
            hasilTerjemah.innerHTML = JSON.stringify(error);
            hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
            hasilTerjemah.classList.add("alert", "alert-warning");
        });
};

// Mengambil data dari web storage
function fetchKamusDariLocalStorage(data) {
    kamus = JSON.parse(data);
    hasilTerjemah.innerHTML = 'Siap menterjemahkan (tersedia offline)';
    hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
    hasilTerjemah.classList.add("alert", "alert-info");
};

if (storageAvailable('localStorage')) {
    if (localStorage.getItem('kamusJSON') === null) {
        // Pertama kali dipakai atau belum ada data tersimpan
        fetchKamus();
        console.log("Fetch dari API");
    } else {
        console.log("data: " + localStorage.getItem('kamusJSON'));
        fetchKamusDariLocalStorage(localStorage.getItem('kamusJSON'));
        console.log("Fetch dari Local Storage");
    }
} else {
    console.log("Data kamus belum tersedia..");
};

function terjemah(kataAsl, bhasa, strArray) {
    let kataA = "lpgkata",
        kataT = "idkata";


    // Menukar variabel sesuai dengan bahasa asal
    if (bhasa === "indonesia") {
        kataA = "idkata";
        kataT = "lpgkata";
    } else if (bhasa === "lampung") {
        kataA = "lpgkata";
        kataT = "idkata";
    }

    let hasils = [],
        j = 0;

    for (let i = 0; i < strArray.length; i++) {
        if (strArray[i][kataA] === kataAsl) // test / match
        {
            hasils[j] = new Array();
            hasils[j][0] = strArray[i][kataA];
            hasils[j][1] = strArray[i][kataT];
            hasils[j][2] = strArray[i]["lpgdialek"];
            hasils[j][3] = strArray[i]["lpgaksara"];
            j++;
            if (j == 3)
                break;
        }
    }

    return hasils;
};


//Fungsi untuk memudahkan buat Node
function createNode(element) {
    return document.createElement(element); // Membuat tipe elemen yang dilewatkan melalui parameter
};

//Fungsi untuk menambahkan sub node di bawah Node
function append(parent, el) {
    return parent.appendChild(el); // Append parameter kedua ke yang pertama
};

var kataAsal = document.getElementById('kataAsal');
var aksaraAsal = document.getElementById('aksaraAsal');
var petunjukAksara = document.getElementById('petunjukAksara');
aksaraAsal.classList.add("hide");
petunjukAksara.classList.add("hide");
var bahasa = document.getElementById("terjemahForm").elements["bahasa"];

bahasa[0].onchange = function () {
    aksaraAsal.classList.remove("hide", "show");
    aksaraAsal.classList.add("hide");
};
bahasa[1].onchange = function () {
    aksaraAsal.classList.remove("hide", "show");
    aksaraAsal.classList.add("show");
};

aksaraAsal.addEventListener("focusin", function () {
    petunjukAksara.classList.remove("hide", "show");
    petunjukAksara.classList.add("show");
});
aksaraAsal.addEventListener("focusout", function () {
    petunjukAksara.classList.remove("hide", "show");
    petunjukAksara.classList.add("hide");
});

kataAsal.onkeyup = function () {
    //Merubah ke huruf kecil semua agar tidak ada perbedaan huruf kecil dan besar
    let kataAsals = kataAsal.value.toLowerCase();

    // Jika spasi saja, tidak diproses
    if (!kataAsals.replace(/\s/g, '').length) {
        hasilTerjemah.innerHTML = 'Selamat menterjemahkan';
        hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
        hasilTerjemah.classList.add("alert", "alert-info");
    } else {
        // Mengubah kata/kalimat yang diketik menjadi array String
        let kataAl = kataAsals.split(/\s+/);
        // jika elemen akhir kosong, elemen akhir dibuang
        if (kataAl[kataAl.length - 1] == ('')) {
            kataAl.pop();
        }

        //Mengosongkan nilai dan menghilangkan style
        hasilTerjemah.innerHTML = '';
        hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
        let strong = createNode("strong");
        strong.innerHTML = kataAsal.value + ' (' + bahasa.value + ') : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);


        for (let i = 0; i < kataAl.length; i++) {
            //menterjemahkan
            let terjemahan = terjemah(kataAl[i], bahasa.value, kamus);

            //membuat span dan menambahkannya ke div#hasilTerjemah
            let pKata = createNode("p");
            pKata.innerHTML = kataAl[i] + ' (' + bahasa.value + ') ';
            append(hasilTerjemah, createNode("hr"));
            append(hasilTerjemah, pKata);
            append(hasilTerjemah, createNode("hr"));

            //menambahkan ke bagian strong untuk diaksarakan
            spanAksara.innerHTML += aksarakan(kataAl[i]) + ' ';

            if (bahasa.value === "indonesia") {
                terjemahan.map(function (dt) {
                    let p = createNode('p'),
                        span1 = createNode('span'),
                        span2 = createNode('span'),
                        span3 = createNode('span'); // memakai fungsi pembuat elemen
                    span1.innerHTML = dt[0] + " = ";
                    span2.innerHTML = aksarakan(dt[1]);
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
                    span1.innerHTML = aksarakan(dt[0]);
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
            console.log(terjemahan);
        }

        hasilTerjemah.classList.add("alert", "alert-info");
    }
};

aksaraAsal.onkeyup = function () {

    let aksaraAsals = aksaraAsal.value;

    // Jika spasi saja, tidak diproses
    if (!aksaraAsals.replace(/\s/g, '').length) {
        aksaraAsal.classList.remove("aksaraLampung");
        hasilTerjemah.innerHTML = 'Selamat menterjemahkan';
        hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
        hasilTerjemah.classList.add("alert", "alert-info");
    } else {
        aksaraAsal.classList.add("aksaraLampung");
        // Mengubah kata/kalimat yang diketik menjadi array String
        let aksaraAl = aksaraAsals.split(/\s+/);
        // jika elemen akhir kosong, elemen akhir dibuang
        if (aksaraAl[aksaraAl.length - 1] == ('')) {
            aksaraAl.pop();
        }

        //Mengosongkan nilai dan menghilangkan style
        hasilTerjemah.innerHTML = '';
        hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
        let strong = createNode("strong");
        strong.innerHTML = alfabetkan(aksaraAsal.value) + ' (' + bahasa.value + ') : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);


        for (let i = 0; i < aksaraAl.length; i++) {
            //menterjemahkan
            let terjemahan = terjemah(alfabetkan(aksaraAl[i]), bahasa.value, kamus);

            //membuat span dan menambahkannya ke div#hasilTerjemah
            let pKata = createNode("p");
            pKata.innerHTML = alfabetkan(aksaraAl[i]) + ' (' + bahasa.value + ') ';
            append(hasilTerjemah, createNode("hr"));
            append(hasilTerjemah, pKata);
            append(hasilTerjemah, createNode("hr"));

            //menambahkan ke bagian strong untuk diaksarakan
            spanAksara.innerHTML += aksaraAl[i] + ' ';

            if (bahasa.value === "indonesia") {
                terjemahan.map(function (dt) {
                    let p = createNode('p'),
                        span1 = createNode('span'),
                        span2 = createNode('span'),
                        span3 = createNode('span'); // memakai fungsi pembuat elemen
                    span1.innerHTML = dt[0] + " = ";
                    span2.innerHTML = aksarakan(dt[1]);
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
                    span1.innerHTML = aksarakan(dt[0]);
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
            console.log(terjemahan);
        }

        hasilTerjemah.classList.add("alert", "alert-info");
    }
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function () {
            console.log('SW terdaftar');
        });
};