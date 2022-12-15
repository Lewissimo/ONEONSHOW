<?php
    session_start();
    require_once "connect.php";
    
    $connecting = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connecting->connect_errno != 0){
        echo " Error".$connecting->connect_errno;
    }
    else{
        $login = $_POST['login'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM user_data WHERE login='$login' AND password=md5('$password')";        
        
        if($result = @$connecting->query($sql));
            if($result->num_rows > 0){
                if(isset($_SESSION['bad_try'])){
                    unset($_SESSION['bad_try']);
                }  
                $assoc_data = $result->fetch_assoc();
                $user = $assoc_data['login'];
                $pass = $assoc_data['haslo'];
                
                $result->free_result();
                $_SESSION['logged'] = true;
                header('location: logged_panel/logged_index.php');
            }
            else{
                $_SESSION['bad_try'] = 1;
                header('location: login.php');
            }
        


        $connecting->close();
    }







?>