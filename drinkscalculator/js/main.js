if(jQuery("#wizard").length > 0){    

$('.current .cate .custom-control img').live('click',function(){
    if($(this).parent('.custom-control').find('input').attr('checked') == "checked"){
        $(this).parent('.custom-control').find('input').removeAttr('checked')
    }else{
       $(this).parent('.custom-control').find('input').attr('checked','checked')
    }
})
    
    
var form = $("#wizard");
    
form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "fade",
    transitionEffectSpeed: 200,
    onStepChanging: function (event, currentIndex, newIndex)
    {   
        if(currentIndex == 1){
            $('section.pursection h2.title span').text($(' input[name=propuse]:checked').val());
        }
        
        if(currentIndex == 2){
          $('section.prop-type .comp').css('display','none')
            $('section.prop-type h2.title span').text($(' input[name=catproptype]:checked').val());
            
            
            if($('input[name=catproptype]:checked').val()=="Commercial"){
               
                if($(' input[name=propuse]:checked').val()=="Rent"){
                    $('section.prop-type .rent.commercial').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Sales"){
                    $('section.prop-type .sales.commercial').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Land"){
                    $('section.prop-type .land.commercial').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Shortlet"){
                    $('section.prop-type .shortlet.commercial').css('display','block');
                    
                }
                  
            }
            else if($('input[name=catproptype]:checked').val()=="Residential"){
                
                if($(' input[name=propuse]:checked').val()=="Rent"){
                    $('section.prop-type .rent.residential').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Sales"){
                    $('section.prop-type .sales.residential').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Land"){
                    $('section.prop-type .land.residential').css('display','block');
                }
                else if($(' input[name=propuse]:checked').val()=="Shortlet"){
                    $('section.prop-type .shortlet.residential').css('display','block');
                }
                
            }
            
        }
        
       return true;
        
    },
});
    
    
}

if(jQuery('.selectpicker').length > 0){
   $( ".selectpicker" ).selectmenu();
}

$( ".selectpicker" ).on( "selectmenuselect", function( event, ui ) {
    selectIndex=ui.item.index+1;
    $("#wizard").validate().element(this);
   jQuery(this).find("option[selected=selected]").removeAttr('selected');
   jQuery(this).find("option:nth-child("+selectIndex+")").attr('selected','selected');
} );

if(jQuery('input.numb').length > 0){
    jQuery('input.numb').bootstrapNumber();
}

jQuery(window).load(function(){
       
    if(jQuery('#newsletter-modal').length > 0){
        jQuery('#newsletter-modal').modal({'show':true,'backdrop':false});
    }
    
    if(jQuery('#request-prop-modal').length > 0){
        jQuery('#request-prop-modal').modal({'show':true,'backdrop':false});
    }
    
    if(jQuery('#simmi-prop-in').length > 0){
        jQuery('#simmi-prop-in').modal({'show':true,'backdrop':false});
    }
    
    if(jQuery('#expired-prop').length > 0){
        jQuery('#expired-prop').modal({'show':true});
    }
    
    getScrollLocation();
    getScrollLocation_filter();
    
});

if(jQuery('#newsletter-modal').length > 0){
     jQuery('#newsletter-modal, #simmi-prop-in').on('show.bs.modal', function (e) {
          jQuery('body').addClass('no-fix'); 
        })
}

if(jQuery('#agent-form').length > 0){
jQuery('#agent-form').on('show.bs.collapse', function () {
    jQuery('.cont-btn').css('display','none')
})
    
jQuery('#agent-form').on('hidden.bs.collapse', function () {
    jQuery('.cont-btn').css('display','block');
    jQuery('#agent-contact-form').reset();
})
}



if(jQuery('.sup-categories-carousel').length > 0){  
    jQuery('.sup-categories-carousel').owlCarousel({
    loop:true,
    margin:10,
    navText:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:true
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        }
    }
})
}

if(jQuery('.testimonies').length > 0){
    jQuery('.testimony-carousel').owlCarousel({
    loop:true,
    margin:30,
    navText:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        
        600:{
            items:2,
            nav:true
        },
        750:{
            items:2,
            nav:true
        },
        
        1200:{
           items:3,
            nav:true,
            loop:false 
        },
        1000:{
            items:3,
            nav:true,
            loop:false
        }
    }
})

}

if(jQuery('.proj-property-carousel').length > 0){
    jQuery('.proj-property-carousel').owlCarousel({
    loop:true,
    margin:15,
    navText:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:true
        },
        1000:{
            items:3,
            nav:true,
            loop:false
        },
        1200:{
            items:4,
            nav:true,
            loop:false
        }
    }
})

}

if(jQuery('.shortlet-thumbs').length > 0){
   
    jQuery('.shortlet-thumbs').owlCarousel({
    loop:true,
    margin:5,
    navText:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true,
            loop:false,
            autoWidth:false,
        },
        600:{
            items:2,
            nav:true,
            loop:false,
            autoWidth:false,
        },
        1000:{
            nav:true,
            loop:true,
            autoWidth:true,
        }
    }
})

}

if(jQuery('.testimonial-carousel').length > 0){
   
    jQuery('.testimonial-carousel').owlCarousel({
    loop:true,
    margin:10,
    navText:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:false
        }
    }
})

}

jQuery('document').ready(function(){
    homeActiveTab();
    getScrollLocation();
    getScrollLocation_filter();
    
    
    if(jQuery('article.readmore').length > 0){
        jQuery('article.readmore').readmore({
            collapsedHeight:140
        });
    }
    
     if(jQuery('.iconSelectpicker').length > 0){
    
     jQuery.widget( "custom.iconselectmenu", $.ui.selectmenu, {
    _renderItem: function( ul, item ) {
      var li = jQuery( "<li>" ),
          wrapper = jQuery( "<div>", { text: item.label } );

      if ( item.disabled ) {
        li.addClass( "ui-state-disabled" );
      }

      jQuery( "<span>", {
        style: item.element.attr( "data-style" ),
        "class": "ui-icon " + item.element.attr( "data-class" )
      }).removeClass('ui-icon').appendTo( wrapper );

      return li.append( wrapper ).appendTo( ul );
    }
  });

        jQuery(".iconSelectpicker").iconselectmenu().iconselectmenu( "menuWidget").addClass( "ui-menu-icons avatar" );
    }
    
})

jQuery(window).resize(function(){
    homeActiveTab();
})


function getScrollLocation_filter(){
    if(jQuery('.filter.sticky').length > 0){
    
    var navElem=$('header.primary').height();
     $(window).scroll(function(){

        if($(window).scrollTop() > navElem){
            
            $('.filter').addClass('fixed-to-top');     
                
        } else{
            $('.filter').removeClass('fixed-to-top');
        }
         
    });
    }
}


function homeActiveTab(){
/*if(jQuery('.banner').length > 0){

//offsetTop = $('.banner .nav-tabs li label.active').offset().top - $('.nav').offset().top;
offsetTop = $('.banner .nav-tabs li label.active').offset().top;
//offsetLeft = $('.banner .nav-tabs li label.active').offset().left - $('.nav').offset().left;
offsetLeft = $('.banner .nav-tabs li label.active').offset().left ;

$('.banner .nav-background').css({
    top: offsetTop,
    left: offsetLeft,
   // right: $('.banner ul.nav-tabs').width() - $('.banner .nav-tabs li label.active').width() - offsetLeft+14,
    right: $('.banner ul.nav-tabs').width() - $('.banner .nav-tabs li label.active').width(),
   // bottom: $('.banner ul.nav-tabs').height() - $('.banner .nav-tabs li label.active').height() - offsetTop, 
    bottom: $('.banner ul.nav-tabs').height() - $('.banner .nav-tabs li label.active').height() 
});

$('.banner .nav-tabs li label').click(function() {
    if ( ! $(this).hasClass('active')) {
        $('li label.active').removeClass('active');
        $(this).addClass('active');
        
        offsetTop = $(this).offset().top - $('.banner ul.nav-tabs').offset().top;
        offsetLeft = $(this).offset().left - $('.banner ul.nav-tabs').offset().left;
        $('.banner .nav-background').animate({
            top: offsetTop,
            left: offsetLeft,
            right: $('.banner ul.nav-tabs').width() - $(this).width() - offsetLeft+14,
            bottom: $('.banner ul.nav-tabs').height() - $(this).height() - offsetTop 
        }, 'fast', 'linear');
    }
});
    
}
 */  
    
    $('.banner .nav-tabs li label').click(function() {
    if ( ! $(this).hasClass('active')) {
        $('li label.active').removeClass('active');
        $(this).addClass('active');
        offsetTop = $(this).offset().top - $('.banner ul.nav-tabs').offset().top;
        offsetLeft = $(this).offset().left - $('.banner ul.nav-tabs').offset().left;
    }
});
    
}


function getScrollLocation(){
    if(jQuery('#stickynav').length > 0){
    
    $('nav').localScroll({
        target:'body',offset:{top:0,left:0,duration:800}
    });
                              
    
    var navElem=$('.navigation-main-cont').offset().top+$('.navigation-main-cont').height();
     $(window).scroll(function(){
         
      //  var navElem=( navOff)
        
        if($(window).scrollTop() > navElem){
            
            $('.navigation').addClass('fixed-top');     
            $('#stickynav').addClass('container');     
        } else{
            $('.navigation').removeClass('fixed-top');
             $('#stickynav').removeClass('container');  
        }
         
    });
    }
}



/*****************maplace********************/
  if(jQuery('#gmap-mixed').length > 0){
        var data = [{
    "title": "Group E",
    "type": "circle",
    "locations": [{
        "lat": 52.1,
        "lon": 11.3,
        "title": "Title A2",
        "html": "<h3>Content A2</h3><p>Lorem Ipsum..</p>",
        "zoom": 8,
        "circle_options": {
            "radius": 30000
        }
    }]
}, {
    "title": "Group D",
    "type": "polygon",
    "locations": [{
        "lat": 52.1,
        "lon": 11.3,
        "title": "Title A2",
        "html": "<h3>Content A2</h3><p>Lorem Ipsum..</p>",
        "zoom": 8
    }, {
        "lat": 51.2,
        "lon": 22.2,
        "title": "Title B2",
        "html": "<h3>Content B2</h3><p>Lorem Ipsum..</p>",
        "zoom": 8
    }, {
        "lat": 49.4,
        "lon": 35.9,
        "title": "Title C2",
        "html": "<h3>Content C2</h3><p>Lorem Ipsum..</p>",
        "zoom": 4
    }, /*{
        "lat": 47.8,
        "lon": 15.6,
        "title": "Title D2",
        "html": "<h3>Content D2</h3><p>Lorem Ipsum..</p>",
        "zoom": 6
    }*/]
}, {
    "title": "Group C",
    "type": "directions",
    "locations": [{
        "lat": 45.9,
        "lon": 10.9,
        "title": "Title A1",
        "html": "<h3>Content A1</h3>",
        "icon": "https://maps.google.com/mapfiles/markerA.png"
    }, {
        "lat": 44.8,
        "lon": 1.7,
        "title": "Title B1",
        "html": "<h3>Content B1</h3>",
        "icon": "https://maps.google.com/mapfiles/markerB.png",
        "show_infowindow": false
    }, {
        "lat": 51.5,
        "lon": -1.1,
        "title": "Title C1",
        "html": "<h3>Content C1</h3><p>Lorem Ipsum..</p>",
        "zoom": 8,
        "icon": "https://maps.google.com/mapfiles/markerC.png"
    }]
}, {
    "title": "Group B",
    "type": "marker",
    "locations": [{
        "lat": 52.1,
        "lon": 11.3,
        "title": "Title A2",
        "html": "<h3>Content A2</h3><p>Lorem Ipsum..</p>",
        "zoom": 8
    }, {
        "lat": 51.2,
        "lon": 22.2,
        "title": "Title B2",
        "html": "<h3>Content B2</h3><p>Lorem Ipsum..</p>",
        "zoom": 8
    }, {
        "lat": 49.4,
        "lon": 35.9,
        "title": "Title C2",
        "html": "<h3>Content C2</h3><p>Lorem Ipsum..</p>",
        "zoom": 4
    }, {
        "lat": 47.8,
        "lon": 15.6,
        "title": "Title D2",
        "html": "<h3>Content D2</h3><p>Lorem Ipsum..</p>",
        "zoom": 6
    }]
}, {
    "title": "Group A",
    "type": "marker",
    "locations": [{
        "lat": 45.9,
        "lon": 10.9,
        "title": "Title A1",
        "html": "<h3>Content A1</h3>",
        "icon": "https://maps.google.com/mapfiles/markerA.png"
    }, {
        "lat": 44.8,
        "lon": 1.7,
        "title": "Title B1",
        "html": "<h3>Content B1</h3>",
        "icon": "https://maps.google.com/mapfiles/markerB.png",
        "show_infowindow": false
    }, {
        "lat": 51.5,
        "lon": -1.1,
        "title": "Title C1",
        "html": "<h3>Content C1</h3><p>Lorem Ipsum..</p>",
        "zoom": 8,
        "icon": "https://maps.google.com/mapfiles/markerC.png"
    }]
}]
        
        /*function showGroup(index) {
    var el = $('#g'+index);
    $('#tabs li').removeClass('active');
    $(el).parent().addClass('active');
    $.getJSON('data/ajax.php', { type: index }, function(data) {
        //loads data into the map
        maplace.Load({
            locations: data.locations,
            view_all_text: data.title,
            type: data.type,
            force_generate_controls: true
        });
    });
}*/
        
    
var maplace=new Maplace({
    map_div: '#gmap-mixed',
    controls_div: '#controls-mixed',
    controls_type: 'list',
    controls_on_map: false,
}).Load();

$('#map-dropdown .dropdown-menu a').click(function(e) {
    e.preventDefault();
    var index = $(this).attr('data-load');
    showGroup(index);
});

function showGroup(index) {
      var el = $('#g'+index);
      //$('#tabs li').removeClass('active');
      //$(el).parent().addClass('active');
      maplace.Load({
        locations: data[index].locations,
        view_all_text: data[index].title,
        type: data[index].type,
        force_generate_controls: true
      });
  }
    
showGroup(0);
      
  }
if(jQuery('#prop-details .carousel').length > 0){

/*************slick carousel***************/

 $('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  variableWidth:false,
  arrows: false,
  asNavFor: '.slider-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
    responsive: [{
       breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }}
    ]
});
}

/*****************chart.js*********************/
    
if(jQuery('#canvas').length > 0){
var lineChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'My First dataset',
				borderColor: ['rgba(136,92,198,1)'],
				backgroundColor: [
                'rgba(255, 255, 255, 1)',
                ],
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-1',
                pointRadius: 8,
			},
                       
                       {
				label: 'My Second dataset',
				borderColor: ['rgba(223,226,238,1)'],
				backgroundColor: [
                'rgba(255, 255, 255, 1)',
                ],
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-2',
                pointRadius: 8,
			},
                       {
				label: 'My Third dataset',
				borderColor: [
                'rgba(97, 78, 172, 1)'
                ],
				backgroundColor:  [
                'rgba(255, 255, 255, 1)',
                ],
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
                radius:10,
				yAxisID: 'y-axis-3',
                pointRadius: 8,
			}]
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = Chart.Line(ctx, {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: true,
						text: 'Chart.js Line Chart - Multi Axis'
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},
                                {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'left',
							id: 'y-axis-2',
						},
                                {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'right',
							id: 'y-axis-3',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
				}
			});
		};
/*
		document.getElementById('randomizeData').addEventListener('click', function() {
			lineChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return randomScalingFactor();
				});
			});

			window.myLine.update();
		});*/ 
    
}

if($('.mobile-sticker').length > 0){
    
    $('.mobile-sticker').localScroll({
        target:'body',offset:{top:0,left:0,duration:800}
    });
    
    $('.mobile-sticker').click(function(){
        $('#agent-form').collapse('show');
    })
    
}