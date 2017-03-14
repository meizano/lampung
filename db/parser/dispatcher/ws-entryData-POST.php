<?php
if($_POST){
    require_once("../../../dispatcher/koneksidb.php");
    require("../../../dispatcher/fungsi.php");

    $hasil = NULL;

    $data = json_decode(stripslashes($_POST['data']));

    // Insert multiple data
    $sqlIndonesia = "INSERT IGNORE INTO indonesia(kata,definisi,jenis) VALUES (?,?,?)";
    $sqlLampung = "INSERT IGNORE INTO lampung(kata,definisi,jenis, dialek) VALUES (?,?,?,?)";
    $sqlIndonesia2Lampung = "INSERT IGNORE INTO indonesia2lampung(id_indonesia,id_lampung,keterangan) VALUES (?,?,?)";

    // use prepare statement for insert query
    $stIndonesia = mysqli_prepare($con, $sqlIndonesia);
    $stLampung = mysqli_prepare($con, $sqlLampung);
    $stIndonesia2Lampung = mysqli_prepare($con, $sqlIndonesia2Lampung);

    // bind variables to insert query params
    mysqli_stmt_bind_param($stIndonesia, 'sss', $kataIndonesia, $definisiIndonesia, $jenisIndonesia);
    mysqli_stmt_bind_param($stLampung, 'ssss', $kataLampung, $definisiLampung, $jenisLampung, $dialekLampung);
    mysqli_stmt_bind_param($stIndonesia2Lampung, 'iis', $idIndonesia, $idLampung, $keterangan);
    // The mysqli_stmt_bind_param($query, 'is',…) means the first value is an integer (i) and the next value is a string (s). Feel free to adjust to best fit your actual data types.

    // Karena tidak ada data, variabel berikut dibuat NULL
    $definisiIndonesia = NULL;
    $jenisIndonesia = NULL;

    $definisiLampung = NULL;
    $jenisLampung = NULL;
//    $dialekLampung = NULL;

    $keterangan = NULL;

    // loop through the array
    foreach ($data as $row) {
        // get the details
        $kataIndonesia = mysqli_real_escape_string($con, $row[0]);

        // execute insert query
        $hasil = mysqli_stmt_execute($stIndonesia);

        // Harusnya minta ID untuk kata yang barusan insert
        // $idIndonesia = mysqli_insert_id($con);
        $sql = 'SELECT id FROM indonesia WHERE kata="'. $kataIndonesia .'"';
        $hasil = mysqli_fetch_array(mysqli_query($con,$sql), MYSQLI_ASSOC);
        $idIndonesia = $hasil['id'];

        // Untuk dialek Lampung
        $dialekLampung = mysqli_real_escape_string($con, $row[1]);

        for($i = 2; $i < sizeof($row); $i++)
        {

            $kataLampung = mysqli_real_escape_string($con, $row[$i]);

            $hasil = mysqli_stmt_execute($stLampung);

            // Harusnya minta ID untuk kata yang barusan insert
            // $idLampung = mysqli_insert_id($con);
            $sql = 'SELECT id FROM lampung WHERE kata="'. $kataLampung .'"';
            $hasil = mysqli_fetch_array(mysqli_query($con,$sql), MYSQLI_ASSOC);
            $idLampung = $hasil['id'];

            // Belum mempertimbangkan relasi untuk kata yang sama
            $hasil = mysqli_stmt_execute($stIndonesia2Lampung);
        }

    }

    //close connection
    mysqli_close($con);

    /* JSON */
    if($hasil)
    {
        $arr = array("berhasil" => "Data berhasil dimasukkan");

    }
    else
    {
        $arr = array("gagal" => "Data gagal dimasukkan");
    }
    echo json_encode($arr);
    /* JSON */

}
?>
