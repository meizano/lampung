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
    const regexPa = /[PpFf]/g;
    const regexBa = /[Bb]/g;
    const regexMa = /[Mm]/g;
    const regexTa = /[Tt]/g;
    const regexDa = /[Dd]/g;
    const regexNa = /[n]/g;
    const regexCa = /[Cc]/g;
    const regexJa = /[JjZz]/g;
    const regexNya = /[N]/g;
    const regexYa = /[Yy]/g;
    const regexA = /[a]/g;
    const regexLa = /[Ll]/g;
    const regexRa = /[Rr]/g;
    const regexSa = /[Ss]/g;
    const regexWa = /[wVv]/g;
    const regexHa = /[h]/g;
    const regexGha = /[H]/g;

    // Anak Huruf
    const regexNengen = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]ax/g;
    const regexUlan1 = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[i]/g;
    const regexUlan2 = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[E]/g;
    const regexBicek = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[e]/g;
    const regexTekelubang = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[X]/g;
    const regexRejunjung = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[R]/g;
    const regexDatasan = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[N]/g;
    const regexBitan1 = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[Oo]/g;
    const regexBitan2 = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[u]/g;
    const regexTekelungau = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[U]/g;
    const regexTekelungai = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[I]/g;
    const regexKeleniah = /[kg(ng)pbmtdnj(ny)ylrswh(gh)]a[A]/g;

    // Kombinasi anak huruf yang perlu dipertimbangkan
    // eu, ei, ou, oi, iu, io, eo
    

    // Anak Huruf
    const regexNengen = /ax/g;
    const regexUlan1 = /a[i]/g;
    const regexUlan2 = /a[E]/g;
    const regexBicek = /a[e]/g;
    const regexTekelubang = /a[X]/g;
    const regexRejunjung = /a[R]/g;
    const regexDatasan = /a[N]/g;
    const regexBitan1 = /a[Oo]/g;
    const regexBitan2 = /a[u]/g;
    const regexTekelungau = /a[U]/g;
    const regexTekelungai = /a[I]/g;
    const regexKeleniah = /a[A]/g;

    // Induk huruf
    kata = kata.replace(regexKa, 'ka');
    kata = kata.replace(regexGa, 'ga');
    kata = kata.replace(regexNga, 'nga');
    kata = kata.replace(regexPa, 'pa');
    kata = kata.replace(regexBa, 'ba');
    kata = kata.replace(regexMa, 'ma');
    kata = kata.replace(regexTa, 'ta');
    kata = kata.replace(regexDa, 'da');
    kata = kata.replace(regexNa, 'na');
    kata = kata.replace(regexCa, 'ca');
    kata = kata.replace(regexJa, 'ja');
    kata = kata.replace(regexNya, 'nya');
    kata = kata.replace(regexYa, 'ya');
    kata = kata.replace(regexA, 'a');
    kata = kata.replace(regexLa, 'la');
    kata = kata.replace(regexRa, 'ra');
    kata = kata.replace(regexSa, 'sa');
    kata = kata.replace(regexWa, 'wa');
    kata = kata.replace(regexHa, 'ha');
    kata = kata.replace(regexGha, 'gha');

    // Anak huruf
    kata = kata.replace(regexNengen, '');
    kata = kata.replace(regexUlan1, 'i');
    kata = kata.replace(regexUlan2, 'é'); // Perlu dipertimbangkan alternatif untuk huruf é
    kata = kata.replace(regexBicek, 'e');
    kata = kata.replace(regexTekelubang, 'ang');
    kata = kata.replace(regexRejunjung, 'ar');
    kata = kata.replace(regexDatasan, 'an');
    kata = kata.replace(regexBitan1, 'o');
    kata = kata.replace(regexBitan2, 'u');
    kata = kata.replace(regexTekelungau, 'au');
    kata = kata.replace(regexTekelungai, 'ai');
    kata = kata.replace(regexKeleniah, 'ah');

    return kata;
};