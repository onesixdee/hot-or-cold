

$(document).ready(function() {

    newGameButton = $('.new')
    count = $('#count')
    feedbackHeader = $('#feedback')
    userInput = $('#userGuess')
    guessButton = $('#guessButton')
    guessList = $('#guessList')
    
    
    // Starts a new game
    newGameButton.click(newGame)

    guessButton.click(validNumber)

    
   //A function to generate a secret number between 1 and 100
    function  generateNumber (minimum, maximum) {
        return Math.floor((Math.random() * 100) + 1);
    }
    
  // A new game will start when clicking .new and will reset span#count, #userGuess, #feedback, and removing .newGuess. A secret number between 1 and 100 will be generated.
    function newGame () {
      console.log("***NEW GAME STARTED***")
      guessCount = 0;
      count.text(guessCount)
      userInput.val('')
      feedbackHeader.text("Make your Guess!")
      $('.newGuess').remove()
      secretNumber = generateNumber(1,100)
      console.log("Secret number is " + secretNumber)
    }

  // Feedback will be provided to the user on a scale of Very Hot to Ice-Cold based on how close or how far out the user's guess is.
    function generateFeedback (secretNumber, userGuess) {
      var userFeedback = secretNumber - userGuess;
      console.log("You are " + userFeedback + " number(s) away from the secret number");
      if (userFeedback === 0) {
           feedbackHeader.text("The Secret Number is " + secretNumber + "!");   
      } else if (userFeedback <= 9 && userFeedback >= -9) { 
           feedbackHeader.text("Very Hot") // between -9 to 9
      } else if (userFeedback >= 10 && userFeedback <= 20 || userFeedback <= -10 &&  userFeedback >= -20)  {
           feedbackHeader.text("Hot") // between 10 and 20 or between -10 and -20
      } else if (userFeedback >= 21 && userFeedback <= 30 || userFeedback <= -21 && userFeedback >= -30) {
           feedbackHeader.text("Warm") //between 21 and 30 or between -21 and -30
      } else if (userFeedback >= 31 && userFeedback <= 49 || userFeedback <= -31 && userFeedback >= -49) {
           feedbackHeader.text("Cold")// between 31 and 49 or between -31 and -49
      } else {
           feedbackHeader.text("Ice-Cold") // 50/-50 or further away
      }
    }


    function validNumber () {
      number = userInput.val()
      userGuess = parseInt(number)
      console.log("You guessed " + userGuess)
      if (userGuess >= 1 && userGuess <= 100) {
          guessList.append('<li class="newGuess">' + userGuess + '</li>')
          increaseCount()
          generateFeedback(secretNumber, userGuess)
          userInput.val('')
      } else {
          alert("Please choose a number between 1-100.")
          userInput.val('')
      }
    }

    function increaseCount(){
      guessCount++;
      count.text(guessCount)
    }

  // Display information modal box 
    $('.what').click(function() {
        $('.overlay').fadeIn(1000);
    })

    // Hide information modal box 
    $('a.close').click(function() {
        $('.overlay').fadeOut(1000);
    })
  

}) // end ready function




