// Array of card objects
let objects = ['youtube-play', 'youtube-play', 'spotify', 'spotify', 'instagram', 'instagram', 'snapchat-ghost', 'snapchat-ghost', 'paper-plane', 'paper-plane', 'whatsapp', 'whatsapp', 'facebook', 'facebook', 'twitter', 'twitter', 'steam', 'steam', 'phone', 'phone'];

// HTML selectors
let $container = $('.container');
let $scorePanel = $('.score-panel');
let $rating = $('.fa-star');
let name, time, clicks;
let $moves = $('#moves'), $timer = $('#timer'), $restart = $('.restart'), $deck = $('.deck');

// Declare variables
let nowTime, allOpen = [], match = 0, second = 0, moves = 0, wait = 1000, totalCard = objects.length / 2;

// Rating system with stars
let stars3 = 18,
    stars2 = 20,
    star1 = 22;

let buttonState = "Start";

// Shuffle the cards in a random array to prevent card repetition
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Initialize the cards when the webpage loads
function init() {
    started = true;
    // Remove this after debugging
    // $('#winnerModal').modal('toggle');

    // Shuffle the cards to randomize card placement
    let allCards = shuffle(objects);
    $deck.empty();

    // Initialize the game with no matches and no moves
    match = 0;
    moves = 0;
    $moves.text('0');

    // Loop until 20 cards are created along with the values of the card objects
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
        // $deck.append($('<li class="card"><img class="' + allCards[i] + '" src="img/' + allCards[i] + '.png"</li>'))

    }
    addCardListener(); // Call the function to bind click events to cards
    initTime();
}

// Score system with stars, the player starts with 3 stars which degrade with extra moves
function rating(moves) {
    // Store the current rating in a dynamic variable
    let rating = 3;
    // Check whether the player has gone past the move limit and add/remove stars accordingly
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    // Return the score and rating
    return { score: rating };
}

// Show a Bootstrap modal with the player's statistics after the player matches all the cards
// Show a Bootstrap modal with the player's statistics after the player matches all the cards
function gameOver(moves, score) {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(second / 3600);
    let minutes = Math.floor((second % 3600) / 60);
    let seconds = second % 60;

    // Add leading zeros if necessary
    let hoursStr = ('0' + hours).slice(-2);
    let minutesStr = ('0' + minutes).slice(-2);
    let secondsStr = ('0' + seconds).slice(-2);

    // Display the formatted time in the modal
    $('#winnerText').text(`In ${hoursStr}:${minutesStr}:${secondsStr}, you did ${moves} moves with a rating of ${score} stars. Wow!`);
    $('#moves').text(`${moves}`);
    $('#timer').text(`${hoursStr}:${minutesStr}:${secondsStr}`);
    $('#winnerModal').modal({
        backdrop: 'static', // Prevents closing the modal when clicking on the backdrop
        keyboard: false // Prevents closing the modal when pressing the escape key
    });    
    // Stop timer
    clearInterval(nowTime);
}


amountOfClicks = $(".moves").text();

// Restarts the game when the reset button is clicked, confirm the click came from the user
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
    }
});

// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
let addCardListener = function () {
    let canFlip = true; // Variable to control flipping of cards

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        if (!canFlip) return; // Check if flipping is allowed
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        // Compares cards if they matched
        if (allOpen.length > 1) {
            // Disable flipping while comparing cards
            canFlip = false;

            if (card === allOpen[0]) {
                match++;
                setTimeout(function() {
                    $deck.find('.open').addClass('match').removeClass('open show');
                }, wait);
                
            } else {
                // Cards do not match
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show notmatch'); // Remove notmatch class
                }, wait);
            }
            allOpen = []; // Clear the array for the next pair of cards
            moves++;
            rating(moves);
            $moves.html(moves);

            // Enable flipping after a delay
            setTimeout(function() {
                canFlip = true;
            }, wait);
        }

        // The game is finished once all cards have been matched, with a short delay
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}


// Initiates the timer as soon as the game is loaded
function initTime() {
    nowTime = setInterval(function () {
        // Calculate hours, minutes, and seconds
        let hours = Math.floor(second / 3600);
        let minutes = Math.floor((second % 3600) / 60);
        let seconds = second % 60;

        // Add leading zeros if necessary
        let hoursStr = ('0' + hours).slice(-2);
        let minutesStr = ('0' + minutes).slice(-2);
        let secondsStr = ('0' + seconds).slice(-2);

        // Update the timer display
        $timer.text(`${hoursStr}:${minutesStr}:${secondsStr}`);

        // Increment the second counter
        second++;
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

// AJAX POST request to save data into database
function saveScore() {
    // Get the values to save into the database
    if ($('#username-form').val() == ""){
        var playerName = "Unnamed Player";
    }else{
        var playerName = $('#username-form').val();
    }
    var playerClicks = $('#moves').text();
    var playerTime = $('#timer').text();

    $.ajax({
        type: 'POST',
        url: 'inc/saveData.php',
        data: {
            playerName: playerName,
            playerClicks: playerClicks,
            playerTime: playerTime
        },
        success: function (data) {
            console.log(data);
        }
    });

    setTimeout(function () {
        location.reload(true)
    }, 500);
}

document.getElementById("start-stop-button").onclick = function(){

    switch (buttonState) {
        case 'Start':
            buttonState = "Quit";
            init();
            break;
        case 'Quit':
            buttonState = "Start"
            location.reload(true)
            break;
    }
    $("#start-stop-button").text(buttonState)
}

document.getElementById("stop-button").onclick = function(){
    location.reload(true)
}

$("#win-button").on("click", function () {
    totalCard = match;
});


