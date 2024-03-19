<?php
    # Define global variables
    $errors = array();


    function db()
    { // Connect to the MySQL database
    $db = new mysqli('localhost', 'root', '', 'rocmemoleaderboard');

    // Checks the connection
    if($db -> connect_errno)
    {
        echo "Connection failed " . $db -> connect_error;
        array_push($errors, "The database has ran into a critical problem.");
        echo $errors;
        exit();
    }

    // Return the database
    return $db;
    }

    function getScore()
    {   // Connect to the SQL database
        $db = db();

        $data = 'SELECT * from highscores ORDER BY `playerTime` ASC, `playerClicks` ASC';
        $result = $db->query($data) or die($db->error);
        // Insert all stored data into the database
        $placement = $result->fetch_all(MYSQLI_ASSOC);
        // Check if there are any objects in the database
        if (count($placement) > 0)
        { // Loop through all the highscores and print them out into the leaderboard 
            foreach($placement as $highscores) 
            {
                echo "<span class='leaderboard-username'>" . $highscores["playerName"] . "</span>" . "<span> </span>";
                echo "<span class='leaderboard-line'> </span>";
                echo "<span class='leaderboard-time'>" . $highscores["playerTime"] . "</span>";
                echo "<span class='leaderboard-score'>" . $highscores["playerClicks"] . " moves" . "</span>" . "<hr>";

            }
        } else
        { // If there are no highscores to display in the leaderboard
            echo "No highscores yet! Be the first one by playing a match.";
        }
    }
?>
