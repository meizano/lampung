$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "dispatcher/ws-artikel.php", // URL dari web service JSON, dalam hal ini dilayani skrip PHP
        dataType: "json",

        // Jika web service tidak merespon/gagal
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('div#hasilArtikel').text("responseText: " + XMLHttpRequest.responseText +
                ", textStatus: " + textStatus +
                ", errorThrown: " + errorThrown);
            $('div#hasilArtikel').removeClass();
            $('div#hasilArtikel').addClass("alert alert-warning");
        }, // error

        // Jika web service merespon
        // data yang mengandung nilai JSON akan dikembalikan oleh skrip PHP
        success: function (data) {
                if (data.gagal) { // key gagal dikembalikan
                    $('div#hasilArtikel').removeAttr("style");
                    $('div#hasilArtikel').removeClass();
                    $('div#hasilArtikel').text("data.gagal: " + data.gagal);
                    $('div#hasilArtikel').addClass("alert alert-warning");
                } // if
                else { // login berhasil
                    $('div#hasilArtikel').removeAttr("style");
                    $('div#hasilArtikel').removeClass();
                    $("div#hasilArtikel").append(
                        "<div class='panel-heading'>" +
                        "<h3 class='panel-title'>" + data.judul + "</h3>" +
                        "</div>" +
                        "<div class='panel-body'>" +
                        "<p>" + data.isi + "</p>" +
                        "</div>");


                    $('div#hasilArtikel').addClass("panel panel-success");
                } //else
            } // success
    }); // ajax
});
