jQuery(document).ready(

function($)
{
  var person = $('input[type=number][name=quantity]');
  person.css({"display":"none"});

  setTimeout(function(){var inStock = $('div.woocommerce-variation-availability'); inStock.css({"display":"none"});
   var inputTexts = $('input');

   inputTexts.attr('min',0);

                    }, 1);

    var variablePrice = $('p.booking_price');
    variablePrice.css({"display":"none"});
    var inputs = $('div.row.amount');
    var titles = $("h4#title");

     if($('select.select2-selector').val()!="")
     {
       console.log('test');
       inputs.css({"display":"block"});
       titles.css({"display":"block"});

     }
     else {
       inputs.css({"display":"none"});
       titles.css({"display":"none"});
     }

  $('select.select2-selector').change(

    function()
    {


      setTimeout(function(){var inStock = $('div.woocommerce-variation-availability'); inStock.css({"display":"none"});
       var inputTexts = $('input');

       inputTexts.attr('min',0);

                        }, 1);
      var dropDownList = $(this);
    //  alert("Value changed "+dropDownList.val());
      var variablePrice = $('p.booking_price');
      variablePrice.css({"display":"none"});


      if(dropDownList.val()!="")
      {


       var adultText = $('div.column#adultBike');
       var ebikeText = $('div.column#eBike');
       var childText = $('div.column#childBike');
       var familyText = $('div.column#familyTicket');

       if(dropDownList.val() == 'Self-guided tour full day')
       {
         adultText.text('Adult standard bike $49');
         ebikeText.text('E-bike $89 (minimum age 12) Electric assisted pedalling');
         childText.text('Child (5-16 years old) standard bike $39');
         familyText.text('Family ticket. (4 persons with 2-3 children. Each person gets a bike.) $149');

       }
       else if(dropDownList.val() == 'Self-guided tour 4 hours') {


                   adultText.text('Adult standard bike $39');
                   ebikeText.text('E-bike $79 (minimum age 12) Electric assisted pedalling');
                   childText.text('Child (5-16 years old) standard bike $32');
                   familyText.text('Family ticket. (4 persons with 2-3 children. Each person gets a bike.) $119');

       }

       inputs.css({"display":"block"});
       titles.css({"display":"block"});

       }
      else {
       inputs.css({"display":"none"});
       titles.css({"display":"none"});
      }

    }
  );

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
