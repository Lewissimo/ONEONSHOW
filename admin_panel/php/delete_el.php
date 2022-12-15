<?php
$element_position = $_POST['position'];
$text = file_get_contents("../../contents/media_movies/media_movies_links.txt");
$text_array = explode(PHP_EOL, $text);
unset($text_array[$element_position]);
$text = implode(PHP_EOL, $text_array);
file_put_contents("../../contents/media_movies/media_movies_links.txt", $text);
?>