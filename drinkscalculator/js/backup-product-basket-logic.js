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
            basket += "<h4 class='title sup-title'><span>"+ categories[i].replace("-", " ") +"</span><span class='pull-right'>0 CTN</span></h4>";

            var sub_total = 0;
            for(var j=data['product'].length-1; j>=0; j--){
                if(categories[i] == data['product'][j]['category_name'] && data['product'][j]['name'] != ""){
                    basket += "<div class='pro-list'>";
                    basket += "<p class='name'>"+ data['product'][j]['name'] +"</p>";
                    basket += "<p class='carton'>0<small>cartons</small></p>";
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
        $('.basket .footer .title').html("N" + total);
    }

















    <?php
        $product_total = 0;
        if(isset($_SESSION['product_basket'])){

        $categories  = array(); 
        for($i=0,$j=0; $i<sizeof($_SESSION['product_basket']['product']); $i++){
            if(!in_array($_SESSION['product_basket']['product'][$i]['category_name'], $categories)){
                $categories[$j] = $_SESSION['product_basket']['product'][$i]['category_name'];
                $j++;
            }
        }

        $basket = "";
        
        for($i=0; $i<sizeof($categories); $i++){
            $basket .= "<div id='cat-id' class='pro-cat'>";
            $basket .= "<h4 class='title sup-title'><span>". str_replace("-", " ", $categories[$i]) ."</span><span class='pull-right'>0 CTN</span></h4>";

            $sub_total = 0;
            for($j=sizeof($_SESSION['product_basket']['product'])-1; $j>=0; $j--){
                if($categories[$i] == $_SESSION['product_basket']['product'][$j]['category_name'] && $_SESSION['product_basket']['product'][$j]['name'] != ""){
                    $basket .= "<div class='pro-list'>";
                    $basket .= "<p class='name'>". $_SESSION['product_basket']['product'][$j]['name'] ."</p>";
                    $basket .= "<p class='carton'>0<small>cartons</small></p>";
                    $basket .= "<p class='unit'>". $_SESSION['product_basket']['product'][$j]['bottle'] ."<small>units</small></p>";
                    $basket .= "<p class='total'>". $_SESSION['product_basket']['product'][$j]['total'] ."<small>Total</small></p>";
                    $basket .= "</div>";
                    $sub_total += (int) $_SESSION['product_basket']['product'][$j]['total'];
                    }
            }
            $basket .= "<div class='sub-total'><h4 class='title text-right'>₦ ". $sub_total ."</h4></div></div>";
            $product_total += $sub_total;
        }

        echo $basket;

        }

        ?>