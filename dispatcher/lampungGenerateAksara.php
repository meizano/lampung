<?php
require_once("koneksidb.php");
require("fungsi.php");
// $sqlcolumn = "SELECT indonesia.kata AS idkata, indonesia.definisi AS iddef, indonesia.jenis AS idjenis, lampung.kata AS lpgkata, lampung.definisi AS lpgdef, lampung.jenis AS lpgjenis, lampung.dialek AS lpgdialek ";
$sqlcolumn = "SELECT id, kata ";
$sqltabel = " FROM lampung ORDER BY id ASC";
$sql = $sqlcolumn . $sqltabel;
$hasil = fetchsql($sql);

$aksltn = "Belum diproses";

for($i = 0; $i < sizeof($hasil); $i++)
{
    $j = 0;

    // while($j < strlen($hasil[$i]['kata']))
    // {
    //     if()
    //     {

    //     }
    //     else
    //     {

    //     }
    // }

    if(substr($hasil[$i]['kata'], -1) != "a" && substr($hasil[$i]['kata'], -1) != "i" && substr($hasil[$i]['kata'], -1) != "u" && substr($hasil[$i]['kata'], -1) != "e" && substr($hasil[$i]['kata'], -1) != "E" && substr($hasil[$i]['kata'], -1) != "o")
    {
        $aksltn = $hasil[$i]['kata'] . "x";
    }
    else
    {
        $aksltn = $hasil[$i]['kata'];
    }

    $sql = "UPDATE lampung SET aksara = '$aksltn' WHERE id = " . $hasil[$i]['id'] . "";
    $sukses = runsql($sql);

    echo  $hasil[$i]['id'] . ". " . $hasil[$i]['kata'] . " = " . $aksltn . " | " . $sukses ."<br/>";
}
?>
