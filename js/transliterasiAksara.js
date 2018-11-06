/*jslint browser: true*/
'use strict';
//Fungsi untuk memudahkan buat Node
function createNode(element) {
    return document.createElement(element); // Membuat tipe elemen yang dilewatkan melalui parameter
};

//Fungsi untuk menambahkan sub node di bawah Node
function append(parent, el) {
    return parent.appendChild(el); // Append parameter kedua ke yang pertama
};

var aksaraAsal = document.getElementById('aksaraAsal');
var petunjukAksara = document.getElementById('petunjukAksara');

kataAsal.onkeyup = function () {
    //Merubah ke huruf kecil semua agar tidak ada perbedaan huruf kecil dan besar
    let kataAsals = kataAsal.value.toLowerCase();

    // Jika spasi saja, tidak diproses
    if (!kataAsals.replace(/\s/g, '').length) {
        hasilTerjemah.innerHTML = 'Silakan mengaksarakan';
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
        strong.innerHTML = kataAsal.value + ' : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);

        for (let i = 0; i < kataAl.length; i++) {
            //menambahkan ke bagian strong untuk diaksarakan
            spanAksara.innerHTML += aksarakan(kataAl[i]) + ' ';
        }

        hasilTerjemah.classList.add("alert", "alert-info");
    }
};

aksaraAsal.onkeyup = function () {

    let aksaraAsals = aksaraAsal.value;

    // Jika spasi saja, tidak diproses
    if (!aksaraAsals.replace(/\s/g, '').length) {
        aksaraAsal.classList.remove("aksaraLampung");
        hasilTerjemah.innerHTML = 'Silakan mengaksarakan';
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
        strong.innerHTML = alfabetkan(aksaraAsal.value) + ' : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);

        for (let i = 0; i < aksaraAl.length; i++) {
            //menambahkan ke bagian strong untuk diaksarakan
            spanAksara.innerHTML += aksaraAl[i] + ' ';
        }

        hasilTerjemah.classList.add("alert", "alert-info");
    }
};