/* NEXT UX3.0 | Lib.js ( Header hide and show)
// Version     -  0.2 
// Updated On  -  05 FEB 2018
// ----------------------------------------*/

/*Left side menu opacity Script*/
$(".icon-room").click(function () {
	$(this).css("opacity", "1");
	$(this).parent().siblings().children().css("opacity", "0.2").removeClass("open");
});
$(".icon-room").on("hover", function () {
	$(this).css("opacity", "1");
});
$(".menu-content").mouseleave(function () {
	$(".icon-room").css("opacity", "1").removeClass("open");
});
/*Left side menu opacity Script*/


/*Left side menu height Script*/
$(document).ready(function () {
	var options_height = $(".LS-menu-options").height();
	var LS_MenuHeight = $(window).height();
	var MenuHeight = LS_MenuHeight - options_height - 100;
	$(".menu-content , .menu-inner, .menu-container").css("height", MenuHeight);
	
/*Left side menu height Script*/
	
/*Menu Toggle SCRIPTS	*/
	$(".toggle-LS-Menu").click(function () {
		$(".LS-menu").addClass("LS-menu-open");
		$(".RS-data").addClass("RS-data-expand");
		$(".toggle-LS-Menu").css("display", "none");
		$(".LS-menu-options").css("display", "inline-block");
	});
	$(".LS-menu-options .collapse-menu").click(function () {
		$(".LS-menu").toggleClass("LS-menu-open");
		$(".RS-data").toggleClass("RS-data-expand");
		$(".toggle-LS-Menu").css("display", "block");
		$(".LS-menu-options").css("display", "none");
	});
	$(".LS-menu .menu-content").click(function () {
		$(".LS-menu").addClass("LS-menu-open");
		$(".RS-data").addClass("RS-data-expand");
		$(".toggle-LS-Menu").css("display", "none");
		$(".LS-menu-options").css("display", "inline-block");
	});
/*Menu Toggle SCRIPTS	*/

/*-Menu toltip SCRIPTS*/
	$(".main-title").each(function () {
		var t_height = $(this).height();
		if (t_height > 18 && t_height < 29) {
			$(this).addClass("line_2");
		} else if (t_height > 30 && t_height < 40) {
			$(this).addClass("line_3");
		} else if (t_height > 41) {
			$(this).addClass("line_4");
		} else {}
	});
});
/*<!--Menu toltip SCRIPTS-->*/

/*Pin and Un pin menu SCRIPTS*/
function open_menu() {
	document.getElementById('LS-menu').classList.add('LS-menu-open');
	document.getElementById('RS-data').classList.add('RS-data-expand');
	document.getElementById('toggle-LS-Menu').style.display = "none";
	document.getElementById('LS-menu-options').style.display = "inline-block";
}
function close_menu() {
	document.getElementById('LS-menu').classList.remove('LS-menu-open');
	document.getElementById('RS-data').classList.remove('RS-data-expand');
	document.getElementById('toggle-LS-Menu').style.display = "block";
	document.getElementById('LS-menu-options').style.display = "none";
}
$(".pin_menu").click(function () {
	$(".LS-menu").attr("onmouseover", " ");
	$(".LS-menu").attr("onmouseout", " ");
	$(".pin_menu").css("display", "none");
	$(".unpin_menu").css("display", "inline-block");
});
$(".unpin_menu").click(function () {
	$(".LS-menu").attr("onmouseover", "open_menu()");
	$(".LS-menu").attr("onmouseout", "close_menu()");
	$(".pin_menu").css("display", "inline-block");
	$(".unpin_menu").css("display", "none");
});
/*Pin and Un pin menu SCRIPTS*/