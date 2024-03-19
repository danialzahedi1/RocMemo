<?php require ('inc/functions.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ROC Memory Match</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <!-- Winner modal, displays only when the game has finished -->
    <div class="modal fade" id="winnerModal" tabindex="-1" role="dialog" aria-labelledby="winnerModal-label"><br><br>
        <h1 class="modal-title" id="winnerModal-label">You won!</h1><br>
        <!-- Form returns itself as the page to run actions on -->
        <div class="modal-body">
            <p id="winnerText"></p>
        </div>
        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <input type="text" name="username" id="username-form" placeholder="Username" maxlength="20">
            <input type="submit" onclick="saveScore(), $rating.removeClass('fa-star-o').addClass('fa-star');" data-dismiss="modal" name="submit" id="submit-form" value="Submit & Replay"><span><button class="stop-button" id="stop-button">Restart</button></span>

        </form>
    </div>
    <div class="container">
        <div class="deck-container">
            <h1>ROC Memory Match</h1>
            <div class="score-panel">
                <ul class="stars">
                    <li>
                        <i class="fa fa-star"></i>
                    </li>
                    <li>
                        <i class="fa fa-star"></i>
                    </li>
                    <li>
                        <i class="fa fa-star"></i>
                    </li>
                </ul>
                <span id="moves">0</span> <span>Moves | Time:</span>
                <span id="timer">00:00:00</span>
                <span><button class="start-stop-button" id="start-stop-button">Start</button></span>
                <span><button class="start-stop-button" id="win-button">win</button></span>
            </div>
            <ul class="deck"></ul>
        </div>
        <div id="leaderboard-container">
            <div class="leaderboard">
                <h1>Leaderboard</h1>
                <?php getScore(); ?>
            </div>
        </div>
    </div>
    <div class="button-container">
    </div>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js'></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="inc/game.js"></script>
</body>

</html>
