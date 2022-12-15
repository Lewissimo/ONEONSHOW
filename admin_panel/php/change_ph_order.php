<?php
    require_once '../connect.php';
    preg_match('/[0-9]+/',$_POST['photo1'], $photo_1_position);
    preg_match('/[0-9]+/',$_POST['photo2'], $photo_2_position);           
    @$connection = new mysqli($host, $db_user, $db_password, $db_name);
    $result = $connection->query("SELECT * FROM photos WHERE class='galery_p'");
    $res_array = [];

    while($row = mysqli_fetch_array($result)){
        array_push($res_array, $row);
    }


    $first_ph_id = $res_array[$photo_1_position[0]-1]['id'];
    $second_ph_id = $res_array[$photo_2_position[0]-1]['id'];

    $path_1 = $connection->query("SELECT path FROM photos WHERE id='$first_ph_id'");
    $path_2 = $connection->query("SELECT path FROM photos WHERE id='$second_ph_id'");

    

    $path1 = $path_1->fetch_assoc()['path'];
    $path2 = $path_2->fetch_assoc()['path'];

    
    $x = $connection->query("UPDATE photos SET path = '$path1' WHERE id='$second_ph_id'");
    echo"UPDATE photos SET path = '$path1' WHERE id='$second_ph_id'";
    $connection->query("UPDATE photos SET path = '$path2' WHERE id='$first_ph_id'");
    echo"UPDATE photos SET path = '$path2' WHERE id='$first_ph_id'";

?>