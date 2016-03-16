
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	})

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	})


    //  start new game
    $(".new").click(function() {
      $("span#count").empty();
      $("ul#guessList").closest("li").remove();
      $("div#feedback").remove();
      
      // Get secret number to start guessing game
      var secretNumber = function (minimum, maximum){
          return Math.floor((Math.random() * 100) + 1);
      }
        console.log(secretNumber(1,100))
    })


    // every time #guessButton is clicked, the number of guesses are displayed in span#count
    var count = 0;
    $("#guessButton").click(function (event) {
        count += 1; 
        if (count > 0) {
            $("span#count").html(" ")
        }
    }) //End click 
  


// user guesses are first checked to be a valid number, then when user keypresses the enter key /NEED:(CLICK #guessbutton), then the user's guess is appended to ul#guessList)
$("#userguess").keypress(function (e) {
        var number = $(this).val()
        var userGuess = parseInt(number)
        if (e.which == 13) {
              $(this).find("ul#guessList").append("<li>" + userGuess + "</li>") 
        }
      })

}) // end ready function


//providing user feedback  NEED: document.write into div#feedback)
function userGuessFeedback (secretNumber, userGuess) {
      var feedback = secretNumber - userGuess;
      if ( feedback > 50) {
        document.write("Ice-Cold");
      }
      else if ( feedback >= 30 && feedback <= 50) {
        document.write("Cold");
      }
      else if (feedback >=20 && feedback <= 30) {
        document.write("Warm");
      }
      else if (feedback >= 10 && feedback <= 20) {
        document.write("Hot")
      }
      else {
        document.write("Very Hot");
      }
}







