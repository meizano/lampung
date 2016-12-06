function terjemah(asal, tujuan, kata) {
    $.ajax({
        type: "GET",
        url: "data/lampungIndonesia.json", // URL dari data JSON
        dataType: "json",
        data: "asal=" + asal + "&tujuan=" + tujuan + "&kata=" + kata,

        // Jika web service tidak merespon/gagal
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('div#hasil').text("responseText: " + XMLHttpRequest.responseText +
                ", textStatus: " + textStatus +
                ", errorThrown: " + errorThrown);
            $('div#hasil').removeClass();
            $('div#hasil').addClass("alert alert-warning");
        }, // error

        // Jika web service merespon
        // data yang mengandung nilai JSON akan dikembalikan
        success: function (data) {
                $('div#hasil').text(data.kata[0][1]);
            } // success
    }); // ajax
}
