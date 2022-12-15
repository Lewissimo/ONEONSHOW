<?php

$path = $_POST['photo_path'];
require_once "../connect.php";
$sql = "DELETE FROM photos WHERE path = '$path'";
@$connection = new mysqli($host, $db_user, $db_password, $db_name);
$connection->query($sql);
?>