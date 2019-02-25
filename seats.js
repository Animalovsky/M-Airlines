//  Setting up the variables
//  Unit price variable
var unitPrice = 29.24;
var result1 = JSON.parse(unitPrice);

//  Number of seats variable
var numSeats = 4;
var result2 = JSON.parse(numSeats);

//  Variables for count, seat prices and totals
var count = 0;
var seatprices = 0;
var total = 0;
var debittotal = 0;

//  Subtotal calculation
var subTotal = result1 * result2;
$(function(){
	//  Get flight details from the server
	$.getJSON('booking1.json',function(data){
	$('#whereFrom').text(data.whereFrom);
	$('#whereTo').text(data.whereTo);
	$('#whereToIATA').text(data.whereToIATA);
	$('#whereFromIATA').text(data.whereFromIATA);
	$('#takeOffTime').text(data.departAt);
	$('#landTime').text(data.arriveAt);	
	$('#flightId').text(data.flightId);
	$('#numSeats').text(data.numSeats);
	$('#unitPrice').text(data.unitPrice);	
	$('#seatsAlloc').text(data.seatsAlloc);	
	$('#plan td.n:contains("T")').addClass("taken");
	$('td.n').empty();
    var leave = new Date(data.departAt);
    $('#date').text(leave.toUTCString());
});
//  Disable click on "taken" seats.
$('#plan td.n').click(function(){
    if ($(this).hasClass("taken"))
        off("click");
});


//  Handling the click event
$('#plan  td.n')
	.bind('click', function(event) {

	//  Handling the click event when the class is "selected" and subtracting from the count
	if ($(this).hasClass("selected")) {
		count -= 1;
		$(this).removeClass("selected");
		// Variable "n" is transformed into a number based on the ID attribute(eg. if id = 1, variable n = 1)
		var n = parseInt($(this).attr('id').substring(1));	
		// Variable "n" can have maximum two decimal places
		var n = n.toFixed(2);
		// Determing the final value of n based on if statements
		if (n == 1) {
			n=13.99;
		}
		else if (n == 12) {
			n=13.99;
		}
		else if (n == 13) {
			n=13.99;
		} 
		else if (n > 1 && n < 7) {
			n=9.99;
		}
		else{
			n=4.99;
		}
		 // Create an empty array to store the ids
		var tempArray = [];

		// Loop through all classes
		$('.selected').each(function () {

		// Getting the id of each class
		var id = $(this).attr('id').substring(1);

		// Add to the array
		tempArray.push(id);
		});

		// Show the ids to the users
		$('.last').html(tempArray.join('   ,'))
		
		// Subtracting one seat from the total price of seats
		seatprices -= n;
		
		// Calculating total price to pay
		total = seatprices + subTotal;
		
		// Setting the total price to maximum two decimal numbers
		var total = total.toFixed(2);
		
		// Calculating total debit price
		debittotal = total * 1.02;
		
		// Setting the total debit price to maximum two decimal numbers
		var debittotal = debittotal.toFixed(2);

		}
		
		//  Handling the click event when the class is not "selected" and adding to the count
	else if ($(".selected").length < 4) {
		count += 1;
		$(this).addClass("selected");
		// Variable "n" is transformed into a number based on the ID attribute(eg. if id = 1, variable n = 1)
		var n = parseInt($(this).attr('id').substring(1));
		// Variable "n" can have maximum two decimal places
		var n = n.toFixed(2);
		// Determing the final value of n based on if statements
		if (n == 1) {
			n=13.99; 
		}
		else if (n == 12) {
			n=13.99;
		}
		else if (n == 13) {
			n=13.99;
		} 	
		else if (n > 1 && n < 7) {
			n=9.99;
		}
		else{
			n=4.99;
		}
		 // Create an empty array to store the ids
		var tempArray = [];

		// Loop through all classes
		$('.selected').each(function () {

		// Getting the id of each class
		var id = $(this).attr('id').substring(1);

		// Add to the array
		tempArray.push(id);
		});

		// Show the ids to the users
		$('.last').html(tempArray.join('   ,'));
		
		// Adding one seat to the total price of seats
		seatprices += n;	
		
		// Calculating total price to pay
		total = seatprices + subTotal;
		
		// Setting the total price to maximum two decimal numbers
		var total = total.toFixed(2);
		
		// Calculating total debit price
		debittotal = total * 1.02;
		
		// Setting the total debit price to maximum two decimal numbers
		var debittotal = debittotal.toFixed(2);
		}
	//  Connecting classes with variables so they are visible on the HTML page
    $('span.count').html(count);
    $('span.seatprices').html(seatprices.toFixed(2)*1);
	$('span.total').html(total);
	$('span.debittotal').html(debittotal);
	$('span.subTotal').html(subTotal);
	$('span.result2').html(result2);
  })
});




