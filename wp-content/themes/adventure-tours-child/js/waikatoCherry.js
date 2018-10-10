jQuery(document).ready(

function($)
{
  var person = $('input[type=number][name=quantity]');
  person.css({"display":"none"});

  var type = $('td.label label[for=type]');
  type.text('Ticket type');

  var quantity = $('label.screen-reader-text');
  console.log(quantity);

  setTimeout(function(){var inStock = $('div.woocommerce-variation-availability'); inStock.css({"display":"none"});
   var inputTexts = $('input');

   inputTexts.attr('min',0);

                    }, 1);

    var variablePrice = $('p.booking_price');
    variablePrice.css({"display":"none"});
    var inputs = $('div.row.amount');
    var button =$('div.row.amount.button')
    var titles = $("h4#title");


  $('select.select2-selector').change(

    function()
    {


      /*setTimeout(function(){//var inStock = $('div.woocommerce-variation-availability'); inStock.css({"display":"none"});
       var inputTexts = $('input');

       inputTexts.attr('min',0);

                        }, 1);*/
      var dropDownList = $(this);
      //var variablePrice = $('p.booking_price');
      //variablePrice.css({"display":"none"});


      if(dropDownList.val()!="")
      {
            person.css({"display":"block"});
            //quantity.css({"font-weight":"block"});
            quantity.removeClass('screen-reader-text');

       }
      else {
        person.css({"display":"none"});
        quantity.addClass('screen-reader-text');

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

})
