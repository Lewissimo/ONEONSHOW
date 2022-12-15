<?php
$element_1 = $_POST['photo1'];
$element_2 = $_POST['photo2'];
preg_match('/[0-9]+/',$element_1, $position1);
preg_match('/[0-9]+/',$element_2, $position2);

$position1 = $position1[0];
$position2 = $position2[0];

$path = "../../contents/media_movies/media_movies_links.txt";

$file = fopen($path, "rwb") or die("Nie można otworzyć pliku");
$file_tab = [];
$file_index = 0;
$text;
while(!feof($file)){
    $file_tab[$file_index] = fgets($file);
    $file_index++;
}
$x = $file_tab[$position1];
$file_tab[$position1] = $file_tab[$position2];
$file_tab[$position2] = $x;

$text = implode($file_tab);
echo $position1;

file_put_contents("../../contents/media_movies/media_movies_links.txt", $text);
fclose($file);


?>