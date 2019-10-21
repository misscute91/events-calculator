$( document ).ready(function() {

    $("#pay-form").validate();

    $('.dark-border').on('input change', function(e) { 
    	$(".update-prices-text").html("Please click to update your prices");
    });

});