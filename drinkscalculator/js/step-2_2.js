$( document ).ready(function() {

    // Javascript code starts here for each function
    
    // Add button implementation for step 2
    $('.add-prod').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var budget = $('#budget').val();
        var total_amount_incured = $('#total_amount_incured').val();
        var minprice = $('.'+id+' #price').val();
        var allowed_qty = $('.'+id+' .allowed_qty').val();

        var qtyAmt = (parseInt(minprice) * parseInt(allowed_qty));
        total_amount_incured = parseInt(total_amount_incured);
        qtyAmt += total_amount_incured;

        var budget = budget.replace(/,/g, ""); 
        budget = parseInt(budget);  
        if(qtyAmt > budget){  
            $('#budget-modal').modal('show');
            e.preventDefault();
            exit();
        }  


        $('.'+id+' .remove').removeClass('hide-element');
        $('.'+id+' .remove').addClass('show-element');
        $('.'+id+' .pro-cost').removeClass('hide-element');
        $('.'+id+' .add-prod').removeClass('show-element');
        $('.'+id+' .add-prod').addClass('hide-element');

        $('.'+id+' .substract').removeClass('hide-element');
        $('.'+id+' .substract').addClass('show-element');
        $('.'+id+' .addplus').removeClass('hide-element');
        $('.'+id+' .addplus').addClass('show-element');
        $('.'+id+' .allowed_qty').removeClass('hide-element');
        $('.'+id+' .allowed_qty').addClass('show-element');


        if ( !$('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').addClass('active');
        }

        // Ajax to save the changed parameters to SESSION
        var category_name = $('.'+id+' #category_name').val();
  
        if(category_name != ""){ 
            

            $.ajax({
                type: 'GET',
                url: website + "/ajax-categories",
                contentType: "application/json; charset=utf-8",
                data:{
                    minprice: "" + minprice + "",
                    category_name: "" + category_name + "",
                    budget: "" + budget + "",
                    qty: "" + allowed_qty + "",
                    action: "add"
                },
                dataType: 'json',
                success: function (data){
                    //console.log(data);
                    var basket = "";
                    for(var i=data['category'].length-1; i>=0; i--){
                        basket += "<div id='cat-id' class='pro-cat'><h4 class='basket_categories title sup-title'><span>"+ data['category'][i]['name'].replace("-", " ") +"</span><span class='pull-right'>0 CTN</span></h4></div>";
                    }
                    $('.main-content').html(basket);

                    var total_incur = data['totalincur'];
                    $('#total_amount_incured').val(total_incur);

                    var str = category_name.replace("-", " ");
                    itemUpdate("You added " + str + " to basket!");
                },
                error: function (request, status, error) {
                    //alert(formatErrorMessage(status, error));
                }
            });
        }

        e.preventDefault();
    });

    // Remove button implementation for step 2
    $('.remove').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        $('.'+id+' .remove').removeClass('show-element');
        $('.'+id+' .remove').addClass('hide-element');
        $('.'+id+' .pro-cost').removeClass('show-element');
        $('.'+id+' .pro-cost').addClass('hide-element');
        $('.'+id+' .add-prod').removeClass('hide-element');
        $('.'+id+' .add-prod').addClass('show-element');

        $('.'+id+' .substract').removeClass('show-element');
        $('.'+id+' .substract').addClass('hide-element');
        $('.'+id+' .addplus').removeClass('show-element');
        $('.'+id+' .addplus').addClass('hide-element');
        $('.'+id+' .allowed_qty').removeClass('show-element');
        $('.'+id+' .allowed_qty').addClass('hide-element');

        if ( $('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').removeClass('active');
        }

        // Ajax to save the changed parameters to SESSION
        var minprice = $('.'+id+' #price').val();
        var category_name = $('.'+id+' #category_name').val();
        var budget = $('#budget').val();

        // Ajax to save the changed parameters to SESSION
        if(category_name != ""){ 
            

            $.ajax({
                type: 'GET',
                url: website + "/ajax-categories",
                contentType: "application/json; charset=utf-8",
                data:{
                    minprice: "" + minprice + "",
                    category_name: "" + category_name + "",
                    budget: "" + budget + "",
                    action: "remove"
                },
                dataType: 'json',
                success: function (data){
                    var basket = "";
                    for(var i=data['category'].length-1; i>=0; i--){
                        basket += "<div id='cat-id' class='pro-cat'><h4 class='basket_categories title sup-title'><span>"+ data['category'][i]['name'].replace("-", " ") +"</span><span class='pull-right'>0 CTN</span></h4></div>";
                    }
                    $('.main-content').html(basket);

                    var total_incur = data['totalincur'];
                    $('#total_amount_incured').val(total_incur);

                    var str = category_name.replace(/-/g, " ");
                    itemUpdate("You removed " + str + " from basket!");
                },
                error: function (request, status, error) {
                    //alert(formatErrorMessage(status, error));
                }
            });
        }

        e.preventDefault();
    });


    $('.addplus').on('click', function(e) {

        var id = this.id;
        var website = $('#website').val();
        var budget = $('#budget').val();
        var total_amount_incured = $('#total_amount_incured').val();
        var minprice = $('.'+id+' #price').val();
        var allowed_qty = $('.'+id+' .allowed_qty').val();

        var qtyAmt = (parseInt(minprice) * parseInt(allowed_qty));
        total_amount_incured = parseInt(total_amount_incured);
        qtyAmt += total_amount_incured;

        var budget = budget.replace(/,/g, ""); 
        budget = parseInt(budget);  
        if(qtyAmt > budget){  
            $('#budget-modal').modal('show');
            e.preventDefault();
            exit();
        }


        // Ajax to save the changed parameters to SESSION
        var category_name = $('.'+id+' #category_name').val();

        var allowed_qty = 0;
        var num = $('.'+id+' .allowed_qty').val();
        if (!isNaN(num)) {
             allowed_qty = parseInt(num);
        } 
        allowed_qty += 1; 

        if(allowed_qty > 0){
            if(category_name != ""){ 
                

                $.ajax({
                    type: 'GET',
                    url: website + "/ajax-categories",
                    contentType: "application/json; charset=utf-8",
                    data:{
                        minprice: "" + minprice + "",
                        category_name: "" + category_name + "",
                        budget: "" + budget + "",
                        qty: "" + allowed_qty + "",
                        action: "addplus"
                    },
                    dataType: 'json',
                    success: function (data){
                        //console.log(data);
                        $('.'+id+' .allowed_qty').val(allowed_qty);

                        var total_incur = data['totalincur'];
                        $('#total_amount_incured').val(total_incur);

                        var str = category_name.replace(/-/g, " ");
                        itemUpdate(str + " quantity updated!");
                    },
                    error: function (request, status, error) {
                        //alert(formatErrorMessage(status, error));
                    }
                });
            }
        }

        e.preventDefault();
    });

    $('.substract').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();


        // Ajax to save the changed parameters to SESSION
        var minprice = $('.'+id+' #price').val();
        var category_name = $('.'+id+' #category_name').val();
        var budget = $('#budget').val();
        var allowed_qty = 0;
        var num = $('.'+id+' .allowed_qty').val();
        if (!isNaN(num)) {
             allowed_qty = parseInt(num);
        } 
        allowed_qty -= 1; 

        if(allowed_qty >= 0){
            if(category_name != ""){ 

                $.ajax({
                    type: 'GET',
                    url: website + "/ajax-categories",
                    contentType: "application/json; charset=utf-8",
                    data:{
                        minprice: "" + minprice + "",
                        category_name: "" + category_name + "",
                        budget: "" + budget + "",
                        qty: "" + allowed_qty + "",
                        action: "substract"
                    },
                    dataType: 'json',
                    success: function (data){
                        //console.log(data);
                        $('.'+id+' .allowed_qty').val(allowed_qty);

                        var total_incur = data['totalincur'];
                        $('#total_amount_incured').val(total_incur);


                        var str = category_name.replace(/-/g, " ");
                        itemUpdate(str + " quantity updated!");
                    },
                    error: function (request, status, error) {
                        //alert(formatErrorMessage(status, error));
                    }
                });
            }
        }

        e.preventDefault();
    });


    $("input").on('keyup', function() { 

        var myClass = this.className;
        var id = this.id;
        var website = $('#website').val();


        if(id.indexOf("qtyinput") != -1){  

            // Ajax to save the changed parameters to SESSION
            var budget = $('#budget').val();
            var total_amount_incured = $('#total_amount_incured').val();
            var minprice = $('.'+id+' #price').val();
            var allowed_qty = $('.'+id+' .allowed_qty').val();

            var qtyAmt = (parseInt(minprice) * parseInt(allowed_qty));
            total_amount_incured = parseInt(total_amount_incured);
            qtyAmt += total_amount_incured;

            var budget = budget.replace(/,/g, ""); 
            budget = parseInt(budget);  
            if(qtyAmt > budget){  
                $('#budget-modal').modal('show');
                e.preventDefault();
                exit();
            }

            var category_name = $('.'+id+' #category_name').val();

            var allowed_qty = 0;
        var num = $('.'+id+' .allowed_qty').val();
        if (!isNaN(num)) {
             allowed_qty = parseInt(num);
        } 

            if(allowed_qty >= 0){
                if(category_name != ""){ 
                    
                    $.ajax({
                        type: 'GET',
                        url: website + "/ajax-categories",
                        contentType: "application/json; charset=utf-8",
                        data:{
                            minprice: "" + minprice + "",
                            category_name: "" + category_name + "",
                            budget: "" + budget + "",
                            qty: "" + allowed_qty + "",
                            action: "add_subtract"
                        },
                        dataType: 'json',
                        success: function (data){
                            //console.log(data);
                            var total_incur = data['totalincur'];
                            $('#total_amount_incured').val(total_incur);

                            var str = category_name.replace(/-/g, " ");
                            itemUpdate(str + " quantity updated!");
                        },
                        error: function (request, status, error) {
                            //alert(formatErrorMessage(status, error));
                        }
                    });
                }
            }
        }

    });


    // Empty basket link implementation
    $('#empty_basket').on('click', function(e) {
        var website = $('#website').val();

        // Ajax to unset basket session
        $.ajax({
                type: 'GET',
                url: website + "/ajax-empty-basket",
                contentType: "application/json; charset=utf-8",
                async: false,
                data:{
                    unset: "1"
                },
                success: function (data){ 
                    var str = $.trim((data));
                    if(str == ""){

                        $('.substract').removeClass('show-element');
                        $('.substract').addClass('hide-element');
                        $('.addplus').removeClass('show-element');
                        $('.addplus').addClass('hide-element');
                        $('.allowed_qty').removeClass('show-element');
                        $('.allowed_qty').addClass('hide-element');

                        $('.pro-cat').html(data);
                        $('.remove').removeClass('show-element');
                        $('.remove').addClass('hide-element');
                        $('.pro-cost').removeClass('show-element');
                        $('.pro-cost').addClass('hide-element');
                        $('.add-prod').removeClass('hide-element');
                        $('.add-prod').addClass('show-element');
                        $('.allowed_qty').val("0");

                        if( $('.prod').hasClass( "active" ) ) {
                            $('.prod').removeClass('active');
                        }
                        $('.main-content').html("");
                        $('.basket .footer .title').html("₦0");

                        $('#total_amount_incured').val("0");

                        alert("Basket Cleared!");
                    } 
                },
                error: function (request, status, error) {
                    //alert(formatErrorMessage(status, error));
                }
            });

        e.preventDefault();
    });

    $('#change_budget').keyup(function(event) {
          // skip for arrow keys
          if(event.which >= 37 && event.which <= 40) return;

          // format number
          $(this).val(function(index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
    });

    $(".allow_numbers_only").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#change_budget').keyup(function(event) {
          // skip for arrow keys
          if(event.which >= 37 && event.which <= 40) return;

          // format number
          $(this).val(function(index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
    });

    function itemUpdate(update){
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = "&nbsp;&nbsp; " + update;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $('#x-change-budget').click(function(e) {
        $('#budget-modal').modal('show'); 
    });

    function setLoader(){
        
    }

    function formatErrorMessage(jqXHR, exception) {
        if (jqXHR.status === 0) {
            return ('Network Error, Please check your internet connection');
        } else {
            return ('Error occured, please try again\n');
        }
    }

});