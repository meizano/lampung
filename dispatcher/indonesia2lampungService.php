<?php
require_once("koneksidb.php");
require("fungsi.php");
// $sqlcolumn = "SELECT indonesia.kata AS idkata, indonesia.definisi AS iddef, indonesia.jenis AS idjenis, lampung.kata AS lpgkata, lampung.definisi AS lpgdef, lampung.jenis AS lpgjenis, lampung.dialek AS lpgdialek ";
$sqlcolumn = "SELECT indonesia.kata AS idkata, lampung.kata AS lpgkata, lampung.aksara AS lpgaksara, lampung.dialek AS lpgdialek ";
$sqltabel = " FROM indonesia2lampung LEFT JOIN indonesia ON  indonesia.id = indonesia2lampung.id_indonesia LEFT JOIN lampung ON lampung.id = indonesia2lampung.id_lampung";
$sql = $sqlcolumn . $sqltabel;
$hasil = fetchsql($sql);
$hasiljson = json_encode($hasil);

// Generate file indonesia2lampung.json
//$indonesia2lampungJSON = fopen("indonesia2lampung.json", "w") or die("Tidak bisa dibuka.");
//fwrite($indonesia2lampungJSON, $hasiljson);
//fclose($indonesia2lampungJSON);

// Mencetak hasil di layar
echo $hasiljson;
?>
