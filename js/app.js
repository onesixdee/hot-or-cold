
$(document).ready(function(){

  //Generate secret number between 1 and 100
  function  generateNumber (minimum, maximum){
      return Math.floor((Math.random() * 100) + 1);
  }
    var secretNumber = 0;
 
	
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
     console.log("start new game")


      // $("span#count").empty();
      // $("ul#guessList").closest("li").remove();
      // $("div#feedback").remove();

       secretNumber = generateNumber(1,100)
        console.log(secretNumber)

    })


    // every time #guessButton is clicked, the number of guesses are displayed in span#count
    var count = 0;
    $("#guessButton").click(function (event) {
        // count += 1; 
        // if (count > 0) {
        //     $("span#count").html(" ")
        // }
        console.log($('#userGuess').val())
        console.log(secretNumber)
        userGuessFeedback(secretNumber,$('#userGuess').val())
    }) //End click 
  


// user guesses are first checked to be a valid number, then when user keypresses the enter key /NEED:(CLICK #guessbutton), then the user's guess is appended to ul#guessList)
$("#userguess").keypress(function (e) {
        var number = $(this).val()
        var userGuess = parseInt(number)
        if (e.which == 13) {
          userGuessFeedback(secretNumber,$('#userGuess').val())
              // $(this).find("ul#guessList5'").append("<li>" + userGuess + "</li>") 
        }
      })



//providing user feedback  NEED: document.write into div#feedback)
function userGuessFeedback (secretNumber, userGuess) {
      var feedback = secretNumber - userGuess;

      if ( feedback >= 50) {
         $('#feedback').text("Ice-Cold");
      }
      else if ( feedback >= 30 && feedback <= 49) {
       $('#feedback').text("Cold");
      }
      else if (feedback >=20 && feedback <= 30) {
        $('#feedback').text("Warm");
      }
      else if (feedback >= 10 && feedback <= 20) {
       $('#feedback').text("Hot")
      }
      else if (feedback == 0) {
        $('#feedback').text("You Guessed It!");
      }
      else {
        $('#feedback').text("Very Hot");
      }
}



}) // end ready function



