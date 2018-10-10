jQuery(document).ready(

function($)
{


  function stringToNumber(s)
  {
    var number= Number(s);
    if(isNaN(number))
    return 0;
    else {
      return number;
    }
  }

  $('.single_add_to_cart_button').click(function(event){
      //code to add validation, if any
      var adultBike = $('input[type=number]#adultBike');
      var eBike = $('input[type=number]#eBike');
      var childBike = $('input[type=number]#childBike');
      var familyTicket = $('input[type=number]#familyTicket');
      var highPerson = $('input[type=number]#highPerson');
      var tallPerson = $('input[type=number]#tallPerson');
      var middlePerson = $('input[type=number]#middlePerson');
      var smallPerson = $('input[type=number]#smallPerson');



      var numberAdultBike= stringToNumber(adultBike.val());
      var numberEBike = stringToNumber(eBike.val());
      var numberchildBike = stringToNumber(childBike.val());
      var numberfamilyTicket = stringToNumber(familyTicket.val());
      var numberhighPerson = stringToNumber(highPerson.val());
      var numbertallPerson = stringToNumber(tallPerson.val());
      var numbermiddlePerson = stringToNumber(middlePerson.val());
      var numbersmallPerson = stringToNumber(smallPerson.val());

      var totalBikeNumber = numberAdultBike+numberEBike+numberchildBike+4*numberfamilyTicket;
      var totalPersonNumbver = numberhighPerson+numbertallPerson+numbermiddlePerson+numbersmallPerson;
      newDiv = $(document.createElement('div'));

     if(totalBikeNumber<=0)
      {

        $(newDiv).html("Please select at least one bike.");
        $(newDiv).dialog();
        event.preventDefault();
      }
      else if(totalBikeNumber!==totalPersonNumbver)
      {
        $(newDiv).html("The number of bikes and persons do not match.");
        $(newDiv).dialog();
        event.preventDefault();

      }
});
})
