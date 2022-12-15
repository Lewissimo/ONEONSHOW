<?php
$action = $_POST['action'];
$position = $_POST['position'];
$page = $_POST['page'];
$new_text = $_POST['new_text'];

if ($page == 'offer') {
    $page = 'offer/offer_text';
}

    echo $page;

$text_path = '../../contents/' . $page . '/texts.txt';

$text = file_get_contents($text_path);
$text_array = explode(PHP_EOL.'$$$next$$$'.PHP_EOL, $text);


switch ($action) {
    case 'add':
        array_splice($text_array, $position, 0, $new_text);
        break;
    case 'remove':
        unset($text_array[$position]);
        break;
        case 'edit':
            $text_array[$position] = $new_text;
        break;

    default:
        echo "adding paragraph error";
        break;
}

$text = implode(PHP_EOL.'$$$next$$$'.PHP_EOL, $text_array);
file_put_contents('../../contents/' . $page . '/texts.txt', $text);


?>