<?php
function fetchsql($sql)
{
    //Mengambil data dari db (SELECT)
    require("koneksidb.php");
    $query = mysqli_query($con,$sql);
    $i=0;
    $list=NULL;
    while($result=mysqli_fetch_array($query, MYSQLI_ASSOC))
    {
        $list[$i]=$result;
        $i++;
    }
    mysqli_close($con);
    return $list;
}

function runsql($sql)
{
    //Menjalankan perintah SQL dengan nilai kembalian BOOLEAN (INSERT, UPDATE, DELETE)
    require("koneksidb.php");
    $query = mysqli_query($con,$sql);
    mysqli_close($con);
    return $query;
}
?>
