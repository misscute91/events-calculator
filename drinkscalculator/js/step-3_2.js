$( document ).ready(function() {

    // Javascript code starts here for each function
    
    // Add button implementation for step 3
    $('.add-prod').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var category_name = $('.'+id+' #category_name').val();
        var product_name = $('.'+id+' #product_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var carton = $('.'+id+' #carton').val();
        //alert(id);

        $('.'+id+' .remove').removeClass('hide-element');
        $('.'+id+' .add').removeClass('hide-element');
        $('.'+id+' .substract').removeClass('hide-element');
        $('.'+id+' .bottle').removeClass('hide-element');
        $('.'+id+' .pro-cost').removeClass('hide-element');
        $('.'+id+' .add-prod').removeClass('show-element');
        $('.'+id+' .add-prod').addClass('hide-element');
        $('.'+id+' .carton').removeClass('hide-element');
        $('.'+id+' .add-input').removeClass('hide-element');
        $('.'+id+' .add-input').val(1);

        if ( !$('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').addClass('active');
        }

        // code for overall category bottles
        var cat_bottles = $('#'+category_name+'-bottles').val();
        cat_bottles++;
        $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
        $('#'+category_name+'-bottles').val(cat_bottles);
        $('.'+category_name+'-li .count-down').addClass('show-element');

        // Ajax to save the changed parameters to SESSION
        var price = $('.'+id+' #price').val();
        var budget = $('#budget').val();

        if(category_name != "" && product_name != ""){ 

            $.ajax({ 
                type: 'GET',
                url: website + "/ajax-products",
                contentType: "application/json; charset=utf-8",
                data:{
                    price: "" + price + "",
                    category_name: "" + category_name + "",
                    product_name: "" + product_name + "",
                    budget: "" + budget + "",
                    qty: "" + bottle_input + "",
                    carton: "" + carton + "",
                    action: "add"
                },
                dataType: 'json',
                
                success: function (data){
                    console.log(data);
                    updateBasket(data, product_name, id);
                    total_incur();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //showError(XMLHttpRequest);
                }
            });
        }

        e.preventDefault();
    });


    $('.add').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var product_name = $('.'+id+' #product_name').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var price = $('.'+id+' #price').val();

        bottle_no++;
        $('.'+id+' #bottle_input').val(bottle_no);
        $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottles");
        $('.'+id+' .add-input').val(bottle_no);
        

        var cost = parseInt(price) * parseInt(bottle_no);
        var costStr = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        $('.'+id+' .pro-cost').html("N " + costStr);
        $('.'+id+' #cost').val(cost);

        // code for overall category bottles
        //category_name = category_name.replace(" ", "-");
        var cat_bottles = $('#'+category_name+'-bottles').val();
        cat_bottles++;
        $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
        $('#'+category_name+'-bottles').val(cat_bottles);

        // Ajax to add quantity & calculate price
        var budget = $('#budget').val();

        if(category_name != "" && product_name != ""){ 

            $.ajax({ 
                type: 'GET',
                url: website + "/ajax-products",
                contentType: "application/json; charset=utf-8",
                data:{
                    price: "" + price + "",
                    category_name: "" + category_name + "",
                    product_name: "" + product_name + "",
                    budget: "" + budget + "",
                    qty: "" + bottle_no + "",
                    action: "add"
                },
                dataType: 'json',
                success: function (data){
                    console.log(data);
                    updateBasket(data, product_name, id);
                    total_incur();
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //showError(XMLHttpRequest);
                }
            });
        }



        e.preventDefault();
    });


    $('.substract').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var product_name = $('.'+id+' #product_name').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var price = $('.'+id+' #price').val();

        if(bottle_no > 1){
            bottle_no--;
            $('.'+id+' #bottle_input').val(bottle_no);
            if(bottle_no == 1){
                $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottle");
            } else {
                $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottles");
            }
            $('.'+id+' .add-input').val(bottle_no);

            var cost = parseInt(price) * parseInt(bottle_no);
            $('.'+id+' #cost').val(cost);
            var costStr = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $('.'+id+' .pro-cost').html("N " + costStr);

            // code for overall category bottles
            //category_name = category_name.replace(" ", "-");
            var cat_bottles = $('#'+category_name+'-bottles').val();
            cat_bottles--;
            $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
            $('#'+category_name+'-bottles').val(cat_bottles);
        }

        // Ajax to add quantity & calculate price
        var budget = $('#budget').val();

        if(category_name != "" && product_name != ""){ 

            $.ajax({ 
                type: 'GET',
                url: website + "/ajax-products",
                contentType: "application/json; charset=utf-8",
                data:{
                    price: "" + price + "",
                    category_name: "" + category_name + "",
                    product_name: "" + product_name + "",
                    budget: "" + budget + "",
                    qty: "" + bottle_no + "",
                    action: "add"
                },
                dataType: 'json',
                success: function (data){
                    console.log(data);
                    updateBasket(data, product_name, id);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //showError(XMLHttpRequest);
                }
            });
        } 

        e.preventDefault();
    });


    $('.add-input').on('input change', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var product_name = $('.'+id+' #product_name').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var price = $('.'+id+' #price').val();
        var cinput = $(this).val();
        var current_input = parseInt(cinput);

        if(current_input > 0){

            // code for overall category bottles
            // check if new value is greater than old
            // Minus the old value first

            //category_name = category_name.replace(" ", "-");
            var cat_bottles = $('#'+category_name+'-bottles').val();
            if(current_input != bottle_no){
                cat_bottles = cat_bottles - bottle_no;
                cat_bottles = cat_bottles + current_input;
            }
            $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
            $('#'+category_name+'-bottles').val(cat_bottles);


            bottle_no = current_input;
            $('.'+id+' #bottle_input').val(bottle_no);
            if(bottle_no == 1){
                $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottle");
            } else {
                $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottles");
            }

            var cost = parseInt(price) * parseInt(bottle_no);
            $('.'+id+' #cost').val(cost);
            var costStr = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $('.'+id+' .pro-cost').html("N " + costStr);

            
            // category_name = category_name.replace(" ", "-");
            // $('.'+category_name+'-li .count-down').html(bottle_no + " BTL");
            // $('#'+category_name+'-bottles').val(bottle_no);

            // category_name = category_name.replace(" ", "-");
            // var cat_bottles = $('#'+category_name+'-bottles').val();
            // cat_bottles--;
            // $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
            // $('#'+category_name+'-bottles').val(cat_bottles);

            // Ajax to add quantity & calculate price
            var budget = $('#budget').val();

            if(category_name != "" && product_name != ""){ 

                $.ajax({ 
                    type: 'GET',
                    url: website + "/ajax-products",
                    contentType: "application/json; charset=utf-8",
                    data:{
                        price: "" + price + "",
                        category_name: "" + category_name + "",
                        product_name: "" + product_name + "",
                        budget: "" + budget + "",
                        qty: "" + bottle_no + "",
                        action: "add"
                    },
                    dataType: 'json',
                    success: function (data){
                        console.log(data);
                        updateBasket(data, product_name, id);

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //showError(XMLHttpRequest);
                    }
                });
            } 
        } else {
            //$(this).val(bottle_no);
        }

        e.preventDefault();
    });



    // Remove button implementation for step 2
    $('.remove').on('click', function(e) {
        var id = this.id;
        var website = $('#website').val();
        var product_name = $('.'+id+' #product_name').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var price = $('.'+id+' #price').val();
        
        $('.'+id+' .add').addClass('hide-element');
        $('.'+id+' .add').removeClass('show-element');
        $('.'+id+' .substract').addClass('hide-element');
        $('.'+id+' .substract').removeClass('show-element');
        $('.'+id+' .remove').addClass('hide-element');
        $('.'+id+' .remove').removeClass('show-element');
        $('.'+id+' .pro-cost').addClass('hide-element');
        $('.'+id+' .pro-cost').removeClass('show-element');
        $('.'+id+' .bottle').removeClass('hide-element');
        $('.'+id+' .bottle').addClass('hide-element');
        $('.'+id+' .add-prod').removeClass('hide-element');
        $('.'+id+' .add-prod').addClass('show-element');
        $('.'+id+' .carton').addClass('hide-element');
        $('.'+id+' .carton').removeClass('show-element');
        $('.'+id+' .add-input').addClass('hide-element');
        $('.'+id+' .add-input').removeClass('show-element');

        if ( $('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').removeClass('active');
        }

        $('.'+id+' #bottle_input').val(1);
        $('.'+id+' .bottle').html("<span>1</span> bottle");

        $('.'+id+' #cost').val(price);
        var priceStr = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        $('.'+id+' .pro-cost').html("N " + priceStr);


        // code for overall category bottles
        //category_name = category_name.replace(" ", "-");
        var cat_bottles = $('#'+category_name+'-bottles').val();
        cat_bottles = Math.abs(cat_bottles - bottle_no);
        $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
        $('#'+category_name+'-bottles').val(cat_bottles);

        if(cat_bottles == 0){
            $('.'+category_name+'-li .count-down').removeClass('show-element');
            $('.'+category_name+'-li .count-down').addClass('hide-element');
        }

        var budget = $('#budget').val();

        // Ajax to save the changed parameters to SESSION
        if(category_name != ""){
            
            $.ajax({
                type: 'GET',
                url: website + "/ajax-products",
                contentType: "application/json; charset=utf-8",
                data:{
                    price: "" + price + "",
                    category_name: "" + category_name + "",
                    product_name: "" + product_name + "",
                    budget: "" + budget + "",
                    qty: "" + bottle_no + "",
                    action: "remove"
                },
                dataType: 'json',
                success: function (data){
                    console.log(data);
                    updateBasket(data, product_name, id);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //showError(XMLHttpRequest);
                }
            });
        }

        e.preventDefault();
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
                        $('.pro-cat').html(data);
                        $('.add').addClass('hide-element');
                        $('.add').removeClass('show-element');
                        $('.substract').addClass('hide-element');
                        $('.substract').removeClass('show-element');
                        $('.remove').removeClass('show-element');
                        $('.remove').addClass('hide-element');
                        $('.pro-cost').removeClass('show-element');
                        $('.pro-cost').addClass('hide-element');
                        $('.add-prod').removeClass('hide-element');
                        $('.add-prod').addClass('show-element');

                        $('.add-input').addClass('hide-element');
                        $('.add-input').removeClass('show-element');

                        $('.bottle').removeClass('hide-element');
                        $('.bottle').addClass('hide-element');
                        $('.carton').addClass('hide-element');
                        $('.carton').removeClass('show-element');

                        if( $('.prod').hasClass( "active" ) ) {
                            $('.prod').removeClass('active');
                        }
                        
                        $('.count-down').removeClass('show-element');
                        $('.count-down').addClass('hide-element');
                        $('.main-content').html("");
                        $('.basket .footer .title').html("₦0");
                        alert("Basket Cleared!");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //showError(XMLHttpRequest);
                }
            });

        e.preventDefault();
    });

    function showError(XMLHttpRequest){
        if (XMLHttpRequest.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
            alert("HTTP Error, please try again");
        } 
        else if (XMLHttpRequest.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            alert("Network Error, Please check your internet connection");
        }
        else {
            // something weird is happening
            alert("Error Occurred, please try again");
        }
    }

    function updateBasket(data, product_name, id){
        var mySet = new Set(); 
        for(var i=0; i<data['product'].length; i++){
            mySet.add(data['product'][i]['category_name']);
        }
        var categories = Array.from(mySet);

        var total = 0;
        var basket = "";
        basket += "<div id='cat-id' class='pro-cat'>";

        for(var i=0; i<categories.length; i++){
           
            var sub_total = 0;
            var carton_total = 0;
            var match = false;
            var inner_basket = "";

            for(var j=0; j<data['product'].length; j++){
                if(categories[i] == data['product'][j]['category_name'] && data['product'][j]['name'] != ""){

                    match = true;
                    var carton = 0;

                    var btl = parseInt(data['product'][j]['bottle']); 
                    var carton_ = parseInt(data['product'][j]['carton']); 
                    
                    if(carton_ != null && btl != null){
                        if(isNaN(data['product'][j]['bottle']) == true){ btl = 0; }
                        if(isNaN(data['product'][j]['carton']) == true){ carton_ = 0; }

                        if(carton_ != 0){
                            carton = parseInt(btl / carton_);
                            carton_total += carton;
                        }
                    }

                    inner_basket += "<div class='pro-list'>";
                    inner_basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                    // inner_basket += "<p class='carton'>"+ carton +"<small>cartons</small></p>";
                    inner_basket += "<p class='carton'>&nbsp;<small>&nbsp;</small></p>";
                    inner_basket += "<p class='unit'>"+ data['product'][j]['bottle'] +"<small>units</small></p>";
                    inner_basket += "<p class='total'>"+ data['product'][j]['total'] +"<small>Total</small></p>";
                    inner_basket += "</div>";
                    sub_total += parseInt(data['product'][j]['total']);


                    if(data['product'][j]['name'] == product_name){
                        // $('.'+id+' .carton').html("<span>" + carton + "</span> Cartons");
                        // $('.'+id+' #carton').val(carton);
                    } 

                }
            }

            basket += "<h4 class='title sup-title'><span>"+ categories[i].replace(/-/g, ' ') +"</span><span class='pull-right'>" + carton_total + " CTN</span></h4>";
            if(match == true) basket += inner_basket;

            basket += "<div class='sub-total'><h4 class='title text-right'>N "+ sub_total +"</h4></div></div>";
            total += sub_total;
        }
        $('.main-content').html(basket);
        $('.basket .footer .title').html("₦" + format_num(total));
        $('#total_incur_product').val(total);

    }


    function total_incur(){
        var budget = $('#budget').val();
        budget = budget.replace(/,/g, "");
        budget = parseInt(budget);

        var tot = $('#total_incur_product').val();
        tot = parseInt(tot);
        if(tot > budget){
            $('#budget-modal').modal('show'); 
        }
    }

    function format_num(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $('#x-change-budget').click(function(e) {
        $('#budget-modal').modal('show'); 
    });

    function setLoader(){
         
    }

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

    $("#apply_budget").click(function(e){
        var budget = $('#change_budget').val();
        if(budget.length != 0){
            budget = budget.replace(/,/g, '');
            if(budget < 499999){
                alert("Budget cannot be less than 500,000 Naira, Please increase your budget");
                return false;
            }
        }
    });



});


