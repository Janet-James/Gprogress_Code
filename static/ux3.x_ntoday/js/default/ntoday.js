
/*$(".expand").click( function (){
	$(this).parent().toggleClass("active");
});

$(".expand_btn").click( function (){
	$(this).parent().toggleClass("active");
});


*/

$(document).ready(function(){
	$("#loading").hide();
})

$(".search_btn").click( function (){
	$(this).parent().toggleClass("current");
});

$(document).on("click", ".assign_btn", function (){
	if(!$(this).is('[disabled]')){
		if($(this).parent().hasClass("active")) {
			$(this).parent().removeClass("active");
		} else { 
			$(".assign_btn").parent().removeClass("active");
			$(this).parent().toggleClass("active");
		}
	}
});

$('.selection_filter_li').click(function(){
	$(this).toggleClass('active');
});


var selector = document.querySelector('.dashboard_container');
var style1 = document.querySelector('.container_piechart');
var style2 = document.querySelector('#piechart');

window.addEventListener('load', function() {
	// This code will execute when the page has fully loaded

	style1.style.bottom = '506px';
	style2.style.left = '910px'
	console.log('done')
	
  });

// normal left:910px; #piechart
// normal  left:1152px ; bottom:506px container_piechart


var chart = document.querySelector('.canvas_chart')
var toggle_position = document.querySelector('.dynamic_shrink');

function iconClick() {
    // if (selector.classList.contains('dynamic_shrink')) {
    toggle_position.style.left = '110px';
    toggle_position.classList.add('element-to-transition');
    
}

function iconClickClose() {
    toggle_position.style.left = '-143px';
    toggle_position.classList.add('element-to-transition_right ')
}

//Alert message show function
function alert_status(alert_class, alert_content){
	if ($('.lobibox-notify-wrapper').html() == undefined || $('.lobibox-notify-wrapper').html() == ''){
	Lobibox.notify(alert_class, {
		position: 'top right',
		msg: alert_content
	});
	}
}

function filter_task_function($this) {
	if($this.hasClass("active")) {
		task_status_variable_declare_function();
		plan_in_action_state_declaration();
		$this.removeClass("active");
	} else { 
		$(".filter_li_btn").removeClass("active");
		$this.toggleClass("active");
	};
}
$(document).ready(function () {
	$('.g-nav-icon-group').click(function () {
		$('.g-nav-icon-sec').toggleClass('show');
  });
  $('.nav-close a').click(function () {
    $('.g-nav-icon-sec').removeClass('show');
  });
  
 
  $('.dp-menu-grp')
  .mouseover(function () {
	$(this).find('.dp-menu:first').addClass('nshow');
	$(this).find('.fa-angle-down:first').addClass('rotate');
  })
  .mouseout(function () {
	var $hover = $(this).find('.dp-menu:first');
	if($hover.is(":hover")){
		
	}
	else{
		$(this).find('.dp-menu:first').removeClass('nshow');
		$(this).find('.fa-angle-down:first').removeClass('rotate');
	}


	
  });
//   $('.dp-menu').mouseleave(function () {
// 	$(this).removeClass('nshow');
// 	$(this).find('.fa-angle-down').addClass('rotate');
//   });

});