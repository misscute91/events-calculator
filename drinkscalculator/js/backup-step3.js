$( document ).ready(function() {

    // Javascript code starts here for each function
    
    // Add button implementation for step 3
    $('.add-prod').on('click', function(e) {
        var id = this.id;
        var website = window.location;
        var category_name = $('.'+id+' #category_name').val();
        var product_name = $('.'+id+' #product_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        //alert(id);

        $('.'+id+' .remove').removeClass('hide-element');
        $('.'+id+' .add').removeClass('hide-element');
        $('.'+id+' .substract').removeClass('hide-element');
        $('.'+id+' .bottle').removeClass('hide-element');
        $('.'+id+' .pro-cost').removeClass('hide-element');
        $('.'+id+' .add-prod').removeClass('show-element');
        $('.'+id+' .add-prod').addClass('hide-element');

        if ( !$('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').addClass('active');
        }

        // code for overall category bottles
        category_name = category_name.replace(" ", "-");
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
                    action: "add"
                },
                dataType: 'json',
                
                success: function (data){
                    console.log(data);
                    updateBasket(data);

                    // var mySet = new Set(); 
                    // for(var i=0; i<data['product'].length; i++){
                    //     mySet.add(data['product'][i]['category_name']);
                    // }
                    // var categories = Array.from(mySet);

                    // var total = 0;
                    // var basket = "";
                    // basket += "<div id='cat-id' class='pro-cat'>";

                    // for(var i=0; i<categories.length; i++){
                    //     basket += "<h4 class='title sup-title'><span>"+ categories[i].replace("-", " ") +"</span><span class='pull-right'>150 CTN</span></h4>";

                    //     var sub_total = 0;
                    //     for(var j=0; j<data['product'].length; j++){
                    //         if(categories[i] == data['product'][j]['category_name']){
                    //             basket += "<div class='pro-list'>";
                    //             basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                    //             basket += "<p class='carton'>5<small>cartons</small></p>";
                    //             basket += "<p class='unit'>"+ data['product'][j]['bottle'] +"<small>units</small></p>";
                    //             basket += "<p class='total'>"+ data['product'][j]['total'] +"<small>Total</small></p>";
                    //             basket += "</div>";
                    //             sub_total += parseInt(data['product'][j]['total']);
                    //         }
                    //     }
                    //     basket += "<div class='sub-total'><h4 class='title text-right'>N "+ sub_total +"</h4></div></div>";
                    //     total += sub_total;
                    // }
                    // $('.main-content').html(basket);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    showError(XMLHttpRequest);
                }
            });
        }

        e.preventDefault();
    });


    $('.add').on('click', function(e) {
        var id = this.id;
        var website = window.location;
        var product_name = $('.'+id+' #product_name').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_input = $('.'+id+' #bottle_input').val();
        var bottle_no = parseInt(bottle_input);
        var price = $('.'+id+' #price').val();

        bottle_no++;
        $('.'+id+' #bottle_input').val(bottle_no);
        $('.'+id+' .bottle').html("<span>"+ bottle_no +"</span> bottles");
        

        var cost = parseInt(price) * parseInt(bottle_no);
        var costStr = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        $('.'+id+' .pro-cost').html("N " + costStr);
        $('.'+id+' #cost').val(cost);

        // code for overall category bottles
        category_name = category_name.replace(" ", "-");
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
                    updateBasket(data);

                    // var mySet = new Set(); 
                    // for(var i=0; i<data['product'].length; i++){
                    //     mySet.add(data['product'][i]['category_name']);
                    // }
                    // var categories = Array.from(mySet);

                    // var total = 0;
                    // var basket = "";
                    // basket += "<div id='cat-id' class='pro-cat'>";

                    // for(var i=0; i<categories.length; i++){
                    //     basket += "<h4 class='title sup-title'><span>"+ categories[i].replace("-", " ") +"</span><span class='pull-right'>150 CTN</span></h4>";

                    //     var sub_total = 0;
                    //     for(var j=0; j<data['product'].length; j++){
                    //         if(categories[i] == data['product'][j]['category_name']){
                    //             basket += "<div class='pro-list'>";
                    //             basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                    //             basket += "<p class='carton'>5<small>cartons</small></p>";
                    //             basket += "<p class='unit'>"+ data['product'][j]['bottle'] +"<small>units</small></p>";
                    //             basket += "<p class='total'>"+ data['product'][j]['total'] +"<small>Total</small></p>";
                    //             basket += "</div>";
                    //             sub_total += parseInt(data['product'][j]['total']);
                    //         }
                    //     }
                    //     basket += "<div class='sub-total'><h4 class='title text-right'>N "+ sub_total +"</h4></div></div>";
                    //     total += sub_total;
                    // }
                    // $('.main-content').html(basket);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    showError(XMLHttpRequest);
                }
            });
        }



        e.preventDefault();
    });


    $('.substract').on('click', function(e) {
        var id = this.id;
        var website = window.location;
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

            var cost = parseInt(price) * parseInt(bottle_no);
            $('.'+id+' #cost').val(cost);
            var costStr = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $('.'+id+' .pro-cost').html("N " + costStr);

            // code for overall category bottles
            category_name = category_name.replace(" ", "-");
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

                    var mySet = new Set(); 
                    for(var i=0; i<data['product'].length; i++){
                        mySet.add(data['product'][i]['category_name']);
                    }
                    var categories = Array.from(mySet);

                    var total = 0;
                    var basket = "";
                    basket += "<div id='cat-id' class='pro-cat'>";

                    for(var i=0; i<categories.length; i++){
                        basket += "<h4 class='title sup-title'><span>"+ categories[i].replace("-", " ") +"</span><span class='pull-right'>150 CTN</span></h4>";

                        var sub_total = 0;
                        for(var j=0; j<data['product'].length; j++){
                            if(categories[i] == data['product'][j]['category_name']){
                                basket += "<div class='pro-list'>";
                                basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                                basket += "<p class='carton'>5<small>cartons</small></p>";
                                basket += "<p class='unit'>"+ data['product'][j]['bottle'] +"<small>units</small></p>";
                                basket += "<p class='total'>"+ data['product'][j]['total'] +"<small>Total</small></p>";
                                basket += "</div>";
                                sub_total += parseInt(data['product'][j]['total']);
                            }
                        }
                        basket += "<div class='sub-total'><h4 class='title text-right'>N "+ sub_total +"</h4></div></div>";
                        total += sub_total;
                    }
                    $('.main-content').html(basket);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    showError(XMLHttpRequest);
                }
            });
        } 

        e.preventDefault();
    });



    // Remove button implementation for step 2
    $('.remove').on('click', function(e) {
        var id = this.id;
        var website = window.location;
        var price = $('.'+id+' #price').val();
        var category_name = $('.'+id+' #category_name').val();
        var bottle_no = $('.'+id+' #bottle_input').val();
        
        $('.'+id+' .add').addClass('hide-element');
        $('.'+id+' .substract').addClass('hide-element');
        $('.'+id+' .remove').addClass('hide-element');
        $('.'+id+' .pro-cost').addClass('hide-element');
        $('.'+id+' .bottle').addClass('hide-element');
        $('.'+id+' .add-prod').removeClass('hide-element');
        $('.'+id+' .add-prod').addClass('show-element');

        if ( $('.'+id+' .prod').hasClass( "active" ) ) {
            $('.'+id+' .prod').removeClass('active');
        }

        $('.'+id+' #bottle_input').val(1);
        $('.'+id+' .bottle').html("<span>1</span> bottle");

        $('.'+id+' #cost').val(price);
        var priceStr = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        $('.'+id+' .pro-cost').html("N " + priceStr);


        // code for overall category bottles
        category_name = category_name.replace(" ", "-");
        var cat_bottles = $('#'+category_name+'-bottles').val();
        cat_bottles = Math.abs(cat_bottles - bottle_no);
        $('.'+category_name+'-li .count-down').html(cat_bottles + " BTL");
        $('#'+category_name+'-bottles').val(cat_bottles);



        // Ajax to save the changed parameters to SESSION
        var budget = $('#budget').val();

        // Ajax to save the changed parameters to SESSION
        // if(category_name != ""){
        //     $.ajax({
        //         type: 'GET',
        //         url: website + "/ajax-categories",
        //         contentType: "application/json; charset=utf-8",
        //         data:{
        //             price: "" + price + "",
        //             category_name: "" + category_name + "",
        //             budget: "" + budget + "",
        //             action: "remove"
        //         },
        //         dataType: 'json',
        //         success: function (data){
        //             var basket = "";
        //             for(var i=data['category'].length-1; i>=0; i--){
        //                 basket += "<h4 class='basket_categories title sup-title'><span>"+ data['category'][i]['name'] +"</span><span class='pull-right'>0 CTN</span></h4>";
        //             }
        //             $('.pro-cat').html(basket);
        //         }
        //     });
        // }

        e.preventDefault();
    });


    // Empty basket link implementation
    $('#empty_basket').on('click', function(e) {
        var website = window.location;

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
                        $('.remove').removeClass('show-element');
                        $('.remove').addClass('hide-element');
                        $('.pro-cost').removeClass('show-element');
                        $('.pro-cost').addClass('hide-element');
                        $('.add-prod').removeClass('hide-element');
                        $('.add-prod').addClass('show-element');
                        if( $('.prod').hasClass( "active" ) ) {
                            $('.prod').removeClass('active');
                        }
                        alert("Basket Cleared!");
                    }
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

    function updateBasket(data){
        var mySet = new Set(); 
        for(var i=0; i<data['product'].length; i++){
            mySet.add(data['product'][i]['category_name']);
        }
        var categories = Array.from(mySet);

        var total = 0;
        var basket = "";
        basket += "<div id='cat-id' class='pro-cat'>";

        for(var i=0; i<categories.length; i++){
            basket += "<h4 class='title sup-title'><span>"+ categories[i].replace("-", " ") +"</span><span class='pull-right'>150 CTN</span></h4>";

            var sub_total = 0;
            for(var j=0; j<data['product'].length; j++){
                if(categories[i] == data['product'][j]['category_name']){
                    basket += "<div class='pro-list'>";
                    basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                    basket += "<p class='carton'>5<small>cartons</small></p>";
                    basket += "<p class='unit'>"+ data['product'][j]['bottle'] +"<small>units</small></p>";
                    basket += "<p class='total'>"+ data['product'][j]['total'] +"<small>Total</small></p>";
                    basket += "</div>";
                    sub_total += parseInt(data['product'][j]['total']);
                    }
            }
            basket += "<div class='sub-total'><h4 class='title text-right'>N "+ sub_total +"</h4></div></div>";
            total += sub_total;
        }
        $('.main-content').html(basket);

    }


});