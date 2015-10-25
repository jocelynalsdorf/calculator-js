  $(document).ready(function(){

//use .data() to avoid global vars, takes (key(string),value) or (object)

//set up main reset function
  function resetCalc(curValue) {
    $("#display").val(curValue);
    $(".function-button").removeClass("pendingFunction");
    $("#display").data("isPendingFunction", false);
    $("#display").data("thePendingFunction", "");
    $("#display").data("valueOneLocked", false);
    $("#display").data("valueTwoLocked", false);
    $("#display").data("valueOne", curValue);
    $("#display").data("valueTwo", 0);
    $("#display").data("fromPrevious", false);
  }
    

    $(".on-button").click(function(){ });//close on-btn click function
    $(".off-button").click(function(){});



    $(".num-button").click(function(){
    //has a calculation just been performed: t or f?
      if($("#display").data("fromPrevious") == true) {
        resetCalc($(this).text());
    //if calc has not just been performed and first num hasnt been locked (no fx btn click)
      } else if(($("#display").data("isPendingFunction") == true) && ($("#display").data("valueOneLocked") == false)) {
        //sets valueOne to what is currently in display and stores in .data()
          $("#display").data("valueOne", $("#display").val()); 
        //change boolean in .data() from f to t
          $("#display").data("valueOneLocked", true); 
        //set the display value to the text of the clicked num-btn
          $("#display").data($(this).text()); 
        //set valueTwo val in .data() to the new display value
          $("#display").data("valueTwo", $("#display").val()); 
        // change boolean in .data from f to t
          $("#display").data("valueTwoLocked", true); 
    //click a number again after first num locked and a val exists for second num
      } else if(($("#display").data("isPendingFunction") == true && ($("#display").data("valueOneLocked") == true)) {
        //need to add the two vals together and reassign numbertwo val
        var curValue = $("#display").val();
        //the last number btn clicked
        var toAdd = $(this).text(); 
        //concat the 2 strings
        var newValue = curValue + toAdd; 
        //assign the newValue to valueTwo in .data() so a fx can be done on it
        $("#display").data("valueTwo", $("#display").val());
        //lock the 2nd num changing from f to t
        $("#display").data("valueTwoLocked", true);
    //clicking on a number without any prior behaviors
      } else {
        //set curVal to whatever is in display
        var curValue = $("#display").val();
        //if no num by user yet, prevent 0 from staying in display when  new num clicked
        if(curValue == "0") {
          curValue = "";
        }
        //allow multiple nums to be shown on display
        var toAdd = $(this).text();
        //concat the vals so displayed properly 
        var newValue = curValue + toAdd;
        //set display to show newVal
        $("#display").val(newValue);
      }

    });

    $(".clear-button").click(function(){});

    $(".function-button").click(function(){});

    $(".equals-button").click(function(){});






//drag functionality
    $("#calculator").draggable(); 


});//end of doc
