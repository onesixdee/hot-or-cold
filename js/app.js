<<<<<<< HEAD
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


=======
//initialize variables
'use strict';
var secretNumber, 
userGuess, 
pastGuesses = [], 
count,
guessHtml, 
userFeedback,
alreadyGuessed,
newButton,
form ,
input,
feedback,
countElement,
guessList;

$(document).ready(pageLoad);

 function pageLoad(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	//fetch dom objects
  	newButton = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

    //page load
    newGame();
    //event handlers
    form.submit(function(event){
      event.preventDefault();
      getUserGuess();
    });
    newButton.click(newGame);
}

//new game function
function newGame(){
	form.find('input[type=submit]').css('opacity','1');
	resetVariables();
	render();
	generateNumber();
}

//get the user guess
function getUserGuess(){
	//get the user guess
	userGuess = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid input
	if(checkGuess()){return ;}
	//generate feedback
	generateFeedback();
	//track the past user guesses
	trackGuess();
	//increment the count
	guessCount();
	//render changes to the page
	render();
}

  	//check for valid input
  	function checkGuess(){
  		if(userGuess % 1 !== 0){
  			alert('please input a number');
  			return true;
  		}
  		if(userGuess < 0 || userGuess > 101){
  			alert('please choose a number between zero and 100');
  			return true;
  		}
  		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); 
		}
		if(alreadyGuessed){
			alreadyGuessed = false;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}

//generate user feedback
function generateFeedback(){
	if(secretNumber == userGuess){
		winner();
	} else if(Math.abs(secretNumber - userGuess) < 10){
		userFeedback = 'hot';
	} else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
		userFeedback = ' Kinda hot';
	} else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
		userFeedback = 'less than warm';
	} else {
		userFeedback = 'cold';
	}
}

//keep track of the users past guesses
function trackGuess(){
	pastGuesses.push(userGuess);
	guessHtml = '';
	if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

//keep track of guess count
function guessCount(){
	count++;
}

	//page render function
function render(){
	guessList.html(guessHtml);
	countElement.html(count);
	feedback.html(userFeedback);
}

function winner(){
	userFeedback = 'You Won. Click new game to play again';
	form.find('input[type=submit]').css('opacity','0');
}
  	
//generate secret number
function generateNumber(){
	secretNumber = Math.floor(Math.random()*100)+1;
}

//reset variable 
function resetVariables(){
	count = 0;
	pastGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
}
  	
  	

  


>>>>>>> 0ea735abcc4f2eab6b6eaffd2b1227a5cbddb99f


