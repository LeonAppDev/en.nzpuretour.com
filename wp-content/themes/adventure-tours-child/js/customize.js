jQuery(document).ready(
function($)
{

var person = $('input[type=number][name=quantity]');
var threetents = $('input[type=number]#threetents');
var twotents = $('input[type=number]#twotents');
var onetent = $('input[type=number]#onetent');
var sleepingbag = $('input[type=number]#sleepingbag');
var raingear = $('input[type=number]#raingear');

var amount = $('.woocommerce-Price-amount');

if(!person.val())
{
  person.val("1");
}

if(!threetents.val())
{
  threetents.val("0");
}

if(!twotents.val())
{
  twotents.val("0");
}

if(!onetent.val())
{
  onetent.val("0");
}

if(!sleepingbag.val())
{
  sleepingbag.val("0");
}

if(!raingear.val())
{
  raingear.val("0");
}



function stringToNumber(s)
{
  var number= Number(s);
  if(isNaN(number))
  return 0;
  else {
    return number;
  }
}

//code to add validation on "Add to Cart" button
$('.single_add_to_cart_button').click(function(event){
    //code to add validation, if any
    var numberOneTent= stringToNumber(onetent.val());
    var numberTwoTents = stringToNumber(twotents.val());
    var numberThreeTents = stringToNumber(threetents.val());
    var numberPersons = stringToNumber(person.val());
    var numberRainGear = stringToNumber(raingear.val());
    var numberSleepingbag = stringToNumber(sleepingbag.val());

    var totalNumber = numberOneTent+2*numberTwoTents+3*numberThreeTents;
    //If all values are proper, then send AJAX request

   if(totalNumber!==numberPersons)
    {
      newDiv = $(document.createElement('div'));
      $(newDiv).html("The number of people and the tent spaces do not match.");
      $(newDiv).dialog();
      event.preventDefault();
 }
else if(numberSleepingbag>numberPersons||numberRainGear>numberPersons)
{
      var warningMessage = "";
      if(numberSleepingbag>numberPersons)
      {
        warningMessage+= "You have entered "+numberPersons+" person(s) and "+numberSleepingbag+" sleeping bag(s).<br/>";
      }

      if(numberRainGear>numberPersons)
      {
        warningMessage+= "You have entered "+numberPersons+" person(s) and "+numberRainGear+" raingear.<br/>";
      }

      newDiv = $(document.createElement('div'));
      $(newDiv).html(warningMessage);
      $(newDiv).dialog(
        {
           modal:true,
           buttons:{
              'yes':function()
              {
                var form = $('form.cart');
                form.submit();
                $(this).dialog("close");

              },

               'no':function()
               {
                 $(this).dialog("close");
               }

           }

        }

      );
      event.preventDefault();

}
})


$('select.select2-selector').change(

  function()
  {

    var dropDownList = $(this);
    alert("Value changed "+dropDownList.val());
  }
);

var variablePrice = $('div.woocommerce-variation-price');

variablePrice.css("display","none");



//console.log(amount.text());
/*$(document).on('focusin', 'input #person#threetents#twotents#onetent', function(){
    console.log("Saving value " + $(this).val());
    $(this).data('val', $(this).val());
}).on('change','input  #person#threetents#twotents#onetent', function(){
    var prev = $(this).data('val');
    var current = $(this).val();
    console.log("Prev value " + prev);
    console.log("New value " + current);
});
*/
}
)
