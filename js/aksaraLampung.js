function aksarakan(kataLampung) {
    var aksara = kataLampung;

    const regexng = /(ng)[aiueoAIUEO]/g;
    const regexny = /(ny)[aiueoAIUEOkKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHh]/g;
    const regexgh = /(gh)[aiueoAIUEOkKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHh]/g;

    const regexvocal = /^[iIuUeEoO]/;

    const regexang = /[aiueoIUEO](ng)[kKQqgpPfFvVbBmMtTdDcCjJzZyYlLsSwWGHhnr\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/g;
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

function alfabetkan(aksaraLampung) {
    var kata = aksaraLampung;

    // Induk Huruf
    const regexKa = /[KkQq]/g;
    const regexGa = /[g]/g;
    const regexNga = /[G]/g;
    const regexPa = /[PpFfvV]/g;
    const regexBa = /[Bb]/g;
    const regexMa = /[Mm]/g;
    const regexTa = /[Tt]/g;
    const regexDa = /[Dd]/g;
    const regexNa = /[n]/g;
    const regexCa = /[Cc]/g;
    const regexJa = /[JjZz]/g;
    const regexNya = /[Y]/g;
    const regexYa = /[y]/g;
    const regexA = /[a]/g;
    const regexLa = /[Ll]/g;
    const regexRa = /[Rr]/g;
    const regexSa = /[Ss]/g;
    const regexWa = /[wVv]/g;
    const regexHa = /[h]/g;
    const regexGha = /[H]/g;

    // Anak Huruf
    const regexNengen = /a[x]/g;
    const regexUlan1 = /a[i]/g;
    const regexUlan2 = /a[E]/g;
    const regexBicek = /a[e]/g;
    const regexBitan1 = /a[Oo]/g;
    const regexBitan2 = /a[u]/g;
    const regexTekelubang = /X/g;
    const regexRejunjung = /R/g;
    const regexDatasan = /N/g;
    const regexTekelungau = /U/g;
    const regexTekelungai = /I/g;
    const regexKeleniah = /A/g;

    // Kombinasi anak huruf yang perlu dipertimbangkan
    // eu, ei, ou, oi, iu, io, eo

    // Induk huruf
    kata = kata.replace(regexA, 'a');
    kata = kata.replace(regexKa, 'ka');
    kata = kata.replace(regexGa, 'ga');
    kata = kata.replace(regexPa, 'pa');
    kata = kata.replace(regexBa, 'ba');
    kata = kata.replace(regexMa, 'ma');
    kata = kata.replace(regexTa, 'ta');
    kata = kata.replace(regexDa, 'da');
    kata = kata.replace(regexNa, 'na');
    kata = kata.replace(regexCa, 'ca');
    kata = kata.replace(regexJa, 'ja');
    kata = kata.replace(regexYa, 'ya');
    kata = kata.replace(regexLa, 'la');
    kata = kata.replace(regexRa, 'ra');
    kata = kata.replace(regexSa, 'sa');
    kata = kata.replace(regexWa, 'wa');
    kata = kata.replace(regexHa, 'ha');
    kata = kata.replace(regexGha, 'gha');
    kata = kata.replace(regexNga, 'nga');
    kata = kata.replace(regexNya, 'nya');

    // Anak huruf
    kata = kata.replace(regexNengen, function (a) {
        return a.substring(0, a.length-2) + '';
        });
    kata = kata.replace(regexUlan1, function (a) {
        return a.substring(0, a.length-2) + 'i';
        });
    kata = kata.replace(regexUlan2, function (a) {
        return a.substring(0, a.length-2) + 'é';
        }); // Perlu dipertimbangkan alternatif untuk huruf é
    kata = kata.replace(regexBicek, function (a) {
        return a.substring(0, a.length-2) + 'e';
        });
    kata = kata.replace(regexBitan1, function (a) {
        return a.substring(0, a.length-2) + 'o';
        });
    kata = kata.replace(regexBitan2, function (a) {
        return a.substring(0, a.length-2) + 'u';
        });
    kata = kata.replace(regexTekelubang, 'ng');
    kata = kata.replace(regexRejunjung, 'r');
    kata = kata.replace(regexDatasan, 'n');
    kata = kata.replace(regexTekelungau, 'u');
    kata = kata.replace(regexTekelungai, 'i');
    kata = kata.replace(regexKeleniah, 'h');

    const regextandabaca = /[\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/;
    kata = kata.replace(regextandabaca, '');

    return kata;
};