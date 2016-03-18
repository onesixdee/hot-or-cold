
$(document).ready(function(){

  //Generate secret number between 1 and 100
    function  generateNumber (minimum, maximum) {
        return Math.floor((Math.random() * 100) + 1);
    }
        var secretNumber = 0;
        var count = 0;
 
	// Display information modal box 
  	$('.what').click(function(){
    	  $('.overlay').fadeIn(1000);
  	})

  // Hide information modal box 
  	$('a.close').click(function(){
  		  $('.overlay').fadeOut(1000);
  	})


  // Start new game
    $('.new').click(function() {
        console.log("***NEW GAME STARTED***")
        count;
        $('span#count').text(count)
        $('#userGuess').val('')
        $('#feedback').text("Make your Guess!")
        $('.newguess').remove()
        secretNumber = generateNumber(1,100)
        console.log("the secret number is " + secretNumber)
    })


  //Every time #guessButton is clicked, the number of guesses are displayed in span#count
    $('#guessButton').click(function() {
        var number = $('#userGuess').val()
        var userGuess = parseInt(number)
        console.log("You guessed " + userGuess)

        count += 1; 
        if (count > 0) {
            $('span#count').text(count)
            $('ul#guessList').append('<li class="newguess">' + userGuess + '</li>')
        }
        $('#userGuess').val('')
        userGuessFeedback(secretNumber, userGuess) //provides user feedback
    }) 
  

  // Provide user feedback 
function userGuessFeedback (secretNumber, userGuess) {
    var feedback = secretNumber - userGuess;
    console.log("you are " + feedback + " number(s) away from the secret number");

    if (feedback === 0) {
      $('#feedback').text("You Guessed It!");
    }
     else if (feedback <= 9 && feedback >= -9) { 
       $('#feedback').text("Very Hot") // between -9 to 9
    }
    else if (feedback >= 10 && feedback <= 20 || feedback <= -10 && feedback >= -20)  {
       $('#feedback').text("Hot") // between 10 and 20 or between -10 and -20
    }
     else if (feedback >= 21 && feedback <= 30 || feedback <= -21 && feedback >= -30) {
       $('#feedback').text("Warm") //between 21 and 30 or between -21 and -30
    }
    else if (feedback >= 31 && feedback <= 49 || feedback <= -31 && feedback >= -49) {
       $('#feedback').text("Cold")// between 31 and 49 or between -31 and -49
    }
    else {
       $('#feedback').text("Ice-Cold") // 50/-50 or further away
    }
  }

}) // end ready function



