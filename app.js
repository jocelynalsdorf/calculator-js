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
    
    // resetCalc('0');


 $(".on-button").off().on('click',function(e){
  e.preventDefault();
    resetCalc('0');

    $(".num-button").off().on('click',function(e){
    e.preventDefault();
    //has a calculation just been performed: t or f?
      if($("#display").data("fromPrevious") == true) {
        resetCalc($(this).text());
    //if calc has not just been performed and first num hasnt been locked (no fx btn click)
      } else if(($("#display").data("isPendingFunction") == true) && ($("#display").data("valueOneLocked") == false)) {
         console.log("first else if");
        //sets valueOne to what is currently in display and stores in .data()
          $("#display").data("valueOne", $("#display").val()); 
        //change boolean in .data() from f to t
          $("#display").data("valueOneLocked", true); 
          console.log($("#display").data("valueOne"));
        //set the display value to the text of the clicked num-btn
          $("#display").val($(this).text()); 
        //set valueTwo val in .data() to the new display value
          $("#display").data("valueTwo", $("#display").val()); 
          console.log($("#display").data("valueTwo"));
        // change boolean in .data from f to t
          $("#display").data("valueTwoLocked", true); 

    //click a number again after first num locked and a val exists for second num
      } else if(($("#display").data("isPendingFunction")) == true && ($("#display").data("valueOneLocked") == true)) {
        //need to add the two vals together and reassign numbertwo val
        var curValue = $("#display").val();
        //the last number btn clicked
        var toAdd = $(this).text(); 
        //concat the 2 strings
        var newValue = curValue + toAdd; 
        $("#display").val(newValue);
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

    $(".function-button").click(function(e){
       e.preventDefault();
      console.log($("#display").data("valueOne"));
    //when fx-btn clicked, lock first num so that num btns know to start second ('fromPrevious:t' means a calc just happened)
      if($("#display").data("fromPrevious") == true) {
        //if calc just happened rest calc using the current display as current input val
        resetCalc($("#display").val());
        //not sure if I need to say this since I just called a function that does it
        $("#display").data("valueOneLocked", false);
        $("#display").data("fromPrevious", false)
      }
    //grab what the function should be from the btns text and set as pendingFunction value
      var pendingFunction = $(this).text();
      //state that there is now a pending function selected by changing boolean f to t
      $("#display").data("isPendingFunction", true);
      //set the val of thePendingFx in .data()
      $("#display").data("thePendingFunction", pendingFunction);
      //visual representation of current function w/ css class changes
      //first remove the class form any other btns
      $(".function-button").removeClass(".pending-function");
      //then add the class to the current btn
      $(this).addClass("pendingFunction");  
    });

    $(".equals-button").click(function(e){
      e.preventDefault();
    //first check if we are ready to do a calc (if both nums are locked)
      if(($("#display").data("valueOneLocked")) == true &&  ($("#display").data("valueTwoLocked") == true)) {
        if($("#display").data("thePendingFunction") == "+") {
          //do addition
          var finalValue = parseFloat($("#display").data("valueOne")) + parseFloat($("#display").data("valueTwo"));
        } else if ($("#display").data("thePendingFunction") == "-") {
           //do subtraction 
           var finalValue = parseFloat($("#display").data("valueOne")) - parseFloat($("#display").data("valueTwo"));
        } else if ($("#display").data("thePendingFunction") == "x") {
          //multiply 
          var finalValue = parseFloat($("#display").data("valueOne")) * parseFloat($("#display").data("valueTwo"));
        } else if ($("#display").data("thePendingFunction") == "/") {
          //divide
          var finalValue = parseFloat($("#display").data("valueOne")) / parseFloat($("#display").data("valueTwo"));
        } else if ($("#display").data("thePendingFunction") == "%") {
          //calculate what is valueOne% of valueTwo
          var finalValue = (parseFloat($("#display").data("valueOne")) / 100) * parseFloat($("#display").data("valueTwo"));
         }
        //show results
        $('#display').val(finalValue);

        resetCalc(finalValue);

        $("#display").data("fromPrevious", true)

      //deal with sq root seperately because it only needs one input, not two
      } else if($("#display").data("thePendingFunction") == "SQ") {
        //get sq root  
        var finalValue = Math.sqrt(parseFloat($("#display").val()) );
        $('#display').val(finalValue);

        resetCalc(finalValue);

        $("#display").data("fromPrevious", true)
        
      } else {
        //both numbers are not locked so do nothing
      }

    });
  //clear all stuff
    $(".clear-button").click(function(){
       resetCalc("0"); 
    });

     //close on-btn click function

  }); //end of on-btn click event
 $(".off-button").click(function(e){
    e.preventDefault();

     resetCalc(' '); 
     console.log($("#display").data());
      
    });
  //drag functionality
  $(".calculator").draggable(); 

});//end of doc
