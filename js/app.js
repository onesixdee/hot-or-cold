
$(document).ready(function(){

  //A function to generate a secret number between 1 and 100
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


  // A new game will start when clicking .new and will reset span#count, #userGuess, #feedback, and removing .newGuess. A secret number between 1 and 100 will be generated.
    $('.new').click(function() {
        console.log("***NEW GAME STARTED***")
        count = 0;
        $('span#count').text(count)
        $('#userGuess').val('')
        $('#feedback').text("Make your Guess!")
        $('.newGuess').remove()
        secretNumber = generateNumber(1,100)
        console.log("the secret number is " + secretNumber)
    })

 // When user inputs data within input#userGuess and clicks the #guessButton, the data is first checked to be a valid number, then the data is appended to ul#guessList inside an <li>. In addition, the number of guesses will increase the count and change the text to the current count number within span#count.
    $('#guessButton').click(function() {
        var number = $('#userGuess').val()
        var userGuess = parseInt(number)
        console.log("You guessed " + userGuess)
        $('ul#guessList').append('<li class="newGuess">' + userGuess + '</li>')

        count += 1; 
        if (count > 0) {
            $('span#count').text(count)
        }
        $('#userGuess').val('')
        userGuessFeedback(secretNumber, userGuess) //user feedback
    })

  // When user inputs data within input#userGuess and presses the Enter key, the data is first checked to be a valid number, then the data is appended to ul#guessList inside an <li>. In addition, the number of guesses will increase the count and change the text to the current count number within span#count.
    $('#userGuess').keypress(function (e) {
        var number = $('#userGuess').val()
        var userGuess = parseInt(number)

        if (e.which == 13) {
          if (userGuess) {          
              console.log("You guessed " + userGuess)
              $('ul#guessList').append('<li class="newGuess">' + userGuess + '</li>')
        }
        count += 1; 
        if (count > 0) {
            $('span#count').text(count)
        }
        $('#userGuess').val('')
        userGuessFeedback(secretNumber, userGuess) //user feedback 
        }
      })

  // Feedback will be provided to the user on a scale of Very Hot to Ice-Cold based on how close or how far out the user's guess is.
  function userGuessFeedback (secretNumber, userGuess) {
    var feedback = secretNumber - userGuess;
    console.log("you are " + feedback + " number(s) away from the secret number");

    if (feedback === 0) {
       $('#feedback').text("You Guessed the Secret Number!");
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




