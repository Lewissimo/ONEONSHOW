<?php
session_start();

?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oneonshow</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        #log_box{
            width: 400px;
            height: 400px;
            background-color: black;
            border-radius: 25px;
            box-shadow: 0 0 100px 10px rgb(185, 16, 168),
            0 0 0px 20px rgb(19, 19, 0);
        }

        form{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 40px;
            justify-content: center;
            align-items: center;
        }

        #page{
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }

        input{
            border-radius: 20px;
            padding: 7px;
        }

        button{
            font-size: 23px;
            padding: 7px;
            border-radius: 20px;
            cursor: pointer;
            width: 150px;
            border: 2px solid black;
            transition: all .2s;
            
        }

        button:hover{
            color: white;
            background-color: black;
            border-color: white;
        }
    </style>
</head>
<body>
    <div id="page">
        <div id="log_box">
            <form action="log_in.php" method="post">
                <input type="text" placeholder="login" required maxlength="10" name="login" id="login">
                <input type="password"  placeholder="hasło" required name="password" id="password">
                <button>zaloguj</button>
                <p>
                    <?php
                        if(isset($_SESSION['bad_try'])){
                            echo"Zły login lub hasło";
                        }                 
                    ?>
                </p>
            </form>
        </div>
    </div>
</body>
</html>