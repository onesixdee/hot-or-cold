'use strict' // strict mode

$(document).ready(function() {

    var newGameButton = $('.new')
    var count = $('#count')
    var feedbackHeader = $('#feedback')
    var userInput = $('#userGuess')
    var guessButton = $('#guessButton')
    var guessList = $('#guessList')
    var guessCount = 0
    var secretNumber = 0
    
  // Starts a new game via clicking .new and triggering newGame function
    newGameButton.click(newGame)

  // When a user submits a guess via clicking the button with #guessButton, the function validNumber will be triggered
    guessButton.click(validNumber)


  // When user submits a guess via the enter key, the function validNumber will be triggered
    $(userInput).keypress(function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which)
        if ( keycode == '13' ) {
            validNumber()  
        }
    })

  // Display information modal box 
    $('.what').click(function() {
      $('.overlay').fadeIn(1000)
    })

    // Hide information modal box 
    $('a.close').click(function() {
      $('.overlay').fadeOut(1000)
    })
    
   // A function to generate a secret number between 1 and 100
    function  generateNumber(minimum, maximum) {
      return Math.floor((Math.random() * maximum) + minimum)
    }

  // A function to start a new game
    function newGame() {
      console.log("***NEW GAME STARTED***")
      //count resets to zero
      guessCount = 0
      //the count will reflect as zero
      count.text(guessCount)
      //input will be empty
      userInput.val('')
      //the feedbackHeader will reflect text 
      feedbackHeader.text("Make your Guess!")
      // class will be removed from feedbackHeader
      feedbackHeader.removeClass()
      // all li's with .newGuess will  be removed
      $('.newGuess').remove()
      // The function generateNumber will be called and will be put in a secretNumber variable
      secretNumber = generateNumber(1,100)
      console.log("Secret number is " + secretNumber)
    }

  // Feedback will be provided to the user on a scale of Very Hot to Ice-Cold based on how close or how far out the user's guess is.
    function generateFeedback(secretNumber, userGuess) {
      var userFeedback = secretNumber - userGuess
      console.log("You are " + userFeedback + " number(s) away from the secret number")
        if (userFeedback === 0) {
            feedbackHeader.text("The Secret Number is " + secretNumber + "!")
            guessList.append('<li class="secret newGuess">' + userGuess + '</li>') 
            feedbackHeader.removeClass()
            feedbackHeader.addClass('secret') 
        } 
        else if (userFeedback <= 9 && userFeedback >= -9) { 
            // between -9 to 9
            feedbackHeader.text("Very Hot") 
            guessList.append('<li class="very-hot newGuess">' + userGuess + '</li>')
            feedbackHeader.removeClass()
            feedbackHeader.addClass('very-hot')
        } 
        else if (userFeedback >= 10 && userFeedback <= 20 || userFeedback <= -10 &&  userFeedback >= -20)  { 
            // between 10 and 20 or between -10 and -20
            feedbackHeader.text("Hot") 
            guessList.append('<li class="hot newGuess">' + userGuess + '</li>')
            feedbackHeader.removeClass()
            feedbackHeader.addClass('hot')
        } 
        else if (userFeedback >= 21 && userFeedback <= 30 || userFeedback <= -21 && userFeedback >= -30) { 
            //between 21 and 30 or between -21 and -30
            feedbackHeader.text("Warm") 
            guessList.append('<li class="warm newGuess">' + userGuess + '</li>')
            feedbackHeader.removeClass()
            feedbackHeader.addClass('warm')
        } 
        else if (userFeedback >= 31 && userFeedback <= 49 || userFeedback <= -31 && userFeedback >= -49) { 
            // between 31 and 49 or between -31 and -49
            feedbackHeader.text("Cold")
            guessList.append('<li class="cold newGuess">' + userGuess + '</li>')
            feedbackHeader.removeClass()
            feedbackHeader.addClass('cold')
        } 
        else {
            // 50/-50 or further away
            feedbackHeader.text("Ice-Cold") 
            guessList.append('<li class="ice-cold newGuess">' + userGuess + '</li>')
            feedbackHeader.removeClass()
            feedbackHeader.addClass('ice-cold')
        }
    }

//feedback will reflect in the feedbackHeader to inform user of how hot/cold the user is from the secretNumber.
    function validNumber() {
      var number = userInput.val()
      var userGuess = parseInt(number)
      console.log("You guessed " + userGuess)
        if (userGuess >= 1 && userGuess <= 100) {
            increaseCount()
            generateFeedback(secretNumber, userGuess)
            userInput.val('')
        } 
        else {
            alert("Please choose a number between 1-100.")
            userInput.val('')
        }
    }

    function increaseCount() {
      guessCount++;
      count.text(guessCount)
    }

}) // end ready function




