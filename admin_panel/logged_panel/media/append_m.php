<?php
    
    $fp = fopen('../../../contents/media_movies/media_movies_links.txt', 'a');
    fwrite($fp, $_POST['addr'].PHP_EOL);
echo $fp;
    fclose($fp);  
?>