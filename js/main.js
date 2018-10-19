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
    }
    catch(e) {
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
        var kamus = JSON.parse(data);
        hasilTerjemah.innerHTML = 'Siap menterjemahkan (Offline)';
        hasilTerjemah.classList.remove("alert", "alert-info", "alert-warning");
        hasilTerjemah.classList.add("alert", "alert-info");
};

if (storageAvailable('localStorage')) {
    if (localStorage.getItem('kamusJSON') === null) {
    // Pertama kali dipakai atau belum ada data tersimpan
    fetchKamus();
    console.log("Fetch dari API");
    } else {
        fetchKamusDariLocalStorage(localStorage.getItem('kamusJSON'));
    console.log("Fetch dari Local Storage");
    }
    }
    else {
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

function aksarakan(kataLampung) {
    var aksara = kataLampung;

    const regexng = /ng[aiueoAIUEO]/g;
    const regexny = /ny[aiueoAIUEOkKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHh]/g;
    const regexgh = /gh[aiueoAIUEOkKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHh]/g;

    const regexvocal = /^[iIuUeEoO]/;

    const regexang = /[aiueoIUEO]ng[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
    const regexan = /[aiueoIUEO]n[kKQqpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
    const regexah = /[aiueoIUEO]h[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
    const regexar = /[aiueoIUEO]r[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
    const regexai = /[aiueoIUEO]i[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
    const regexau = /[aiueoIUEO]u[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;

    const regextandabaca = /[\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/;
    const regexxawal = /[aiueoIUEO][kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWH][kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWH][aiueoIUEO]/g; 
    const regexx = /[aiueoIUEO]([kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWHnhriu]|ng)[\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]?$/g; 

    const regexangx = /[aiueoIUEO]ngx/g;
    const regexanx = /[aiueoIUEO]nx/g;
    const regexahx = /[aiueoIUEO]hx/g;
    const regexarx = /[aiueoIUEO]rx/g;
    const regexaix = /[aiueoIUEO]ix/g;
    const regexaux = /[aiueoIUEO]ux/g;

    const regexa = /[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr][a]/g;

    const regexawal = /^[iIuUeEoOXNAR]/g; 

    aksara = aksara.replace(regexng, function (a) {
        return 'G' + (a[2] ? a[2]  : '');
        });
    console.log('G ' + aksara);
    aksara = aksara.replace(regexny, function (a) {
        return 'Y' + (a[2] ? a[2]  : '');
        });
    console.log('Y ' + aksara);
    aksara = aksara.replace(regexgh, function (a) {
        return 'H' + (a[2] ? a[2]  : '');
        });
    console.log('H ' + aksara);
    
    aksara = aksara.replace(regexang, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'X' + (a[2] ? a[2]  : '');
    });
    console.log('X ' + aksara);
    aksara = aksara.replace(regexan, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'N' + (a[2] ? a[2]  : '');
    });
    console.log('N ' + aksara);
    aksara = aksara.replace(regexah, function (a) {
        return (a[0].search(regexvocal) != -1 ? a[0]  : '') + 'A' + (a[2] ? a[2]  : '');
    });
    console.log('A ' + aksara);
    aksara = aksara.replace(regexar, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'R' + (a[2] ? a[2]  : '');
    });
    console.log('R ' + aksara);
    aksara = aksara.replace(regexai, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'I' + (a[2] ? a[2]  : '');
    });
    console.log('I ' + aksara);
    aksara = aksara.replace(regexau, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'U' + (a[2] ? a[2]  : '');
    });
    console.log('U ' + aksara);

    aksara = aksara.replace(regexxawal, function (a) {
        return a[0] + a[1] + "x" + a[2] + a[3];
    }); // karakter 1 dan 2 tidak dihapus, harusnya ditambahkan karakter 3 yaitu x
    console.log('/ awal ' + aksara);

    aksara = aksara.replace(regexx, function (a) {
        return (a.search(regextandabaca) != -1  ? a.substring(0, a.length-1) + "x" + a.substring(a.length-1) : a + "x") ;
    }); // karakter 1 dan 2 tidak dihapus, harusnya ditambahkan karakter 3 yaitu x
    console.log('/ ' + aksara);

    aksara = aksara.replace(regexangx, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'X';
    });
    console.log('X ' + aksara);
    aksara = aksara.replace(regexanx, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'N';
    });
    console.log('N ' + aksara);
    aksara = aksara.replace(regexahx, function (a) {
        return (a[0].search(regexvocal) != -1 ? a[0]  : '') + 'A';
    });
    console.log('A ' + aksara);
    aksara = aksara.replace(regexarx, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'R';
    });
    console.log('R ' + aksara);
    aksara = aksara.replace(regexaix, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'I';
    });
    console.log('I ' + aksara);
    aksara = aksara.replace(regexaux, function (a) {
        return (a[0].search(regexvocal) != -1  ? a[0]  : '') + 'U';
    });
    console.log('U ' + aksara);
   
    aksara = aksara.replace(regexa, function (a) {
        return a[0] + (a[2] ? a[2]  : '');
    }); //karakter 1 dan 3 harusnya tidak dihapus
    console.log('a ' + aksara);
    aksara = aksara.replace(regexawal, function (a) {
        return "a" + a;
    }); // Ditambahkan karakter a di depan
    console.log('awal ' + aksara);
    
    return aksara;
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
var bahasa = document.getElementById("terjemahForm").elements["bahasa"];

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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(function() {
        console.log('SW terdaftar');
    });
};