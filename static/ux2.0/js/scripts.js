/* NEXT UX2.0 | SCRIPTS.JS
// Version    0.2 | Build 2
// Released on | 22 Sep 2017
// © 2017-2018 | www.nexttechnosolutions.com=====================================================*/


//WEATHER REPORT
//EQUAL height
//BUTTON CLICK EFFECTS
//LIST BOX MULTI SELECTED
//RANGE SLIDER
//MODAL WINDOW ANIMATION EFFECTS
//DROPDOWN POPUP SCRIPT FUNCTION
//COPY TO CLIPBOARD SCRIPT FUNCTION


//********************************************************WEATHER REPORT START*******************************************************
reallySimpleWeather.weather({
	wunderkey: '', // leave blank for Yahoo
	location: 'coimbatore, OR', //your location 
	//            woeid: '', // "Where on Earth ID"
	unit: 'f', // 'c' also works
	success: function(weather) {
		html = '<h2 class="temperature">' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
		html += '<ul><li>' + weather.city + ',' + weather.region + '</li>';
		// html += '<li><span>' + weather.currently + '</span></li>';
		//html += '<li>' + weather.currently + '</li>';
		//document.getElementById('weather').innerHTML = html;
	},
	error: function(error) {
		//  document.getElementById('weather').innerHTML = '<p>' + error + '</p>';
	}
});
$(document).ready(function(){
	$('#current_temperature').html(localStorage.getItem('current_temperature')+"°F");
	$('#location').html(localStorage.getItem('location'));
	document.getElementById("location").style.color = "#ffffff";
	setInterval(weather_func, 60*60*1000); //To Get the Weather Details in Every one Hour

	$("#footerNotesdis").hide();
	$( "#footerNotes" ).mouseover(function() {
		$("#footerNotesdis").show();
	});
	$( "#footerNotes" ).mouseout(function() {
		$("#footerNotesdis").hide();
	});
})

function weather_func() {
	var lat=0
	var long =0
	$.ajax( {
		url : 'https://www.googleapis.com/geolocation/v1/geolocate?key= AIzaSyCbdCTgIORz1UtBjJQYqX_dIibSjwJNhkY',
		type : 'POST',
		async:false,
	}).done(function(json_data) {
		lat=json_data.location.lat
		long=json_data.location.lng
	});
	$.ajax( {
		url : 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=ee6b4bca50d8a168837e56899f0278cb',
		type : 'GET',
		async:false,
	}).done(function(json_data) {
		kelvin = json_data.main.temp
		Fahrenheit=((( kelvin - 273.15) * 9/5) + 32).toFixed(1);
		localStorage.setItem('location', json_data.name);
		localStorage.setItem('current_temperature', Fahrenheit);
	});
}

function renderTime() {
	// Date
	var mydate = new Date();
	var year = mydate.getYear();
	if (year < 1000) {
		year += 1900
	}
	var day = mydate.getDay();
	var month = mydate.getMonth();
	var daym = mydate.getDate();
	var dayarray = new Array("Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday");
	var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	// Date End

	//Time
	var currentTime = new Date();
	var h = currentTime.getHours();
	var m = currentTime.getMinutes();
	var s = currentTime.getSeconds();

	if (h == 24) {
		h = 0;
	} else if (h > 12) {
		h = h - 0;
	}
	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m
	}
	if (s < 10) {
		s = "0" + s;
	}

	var myClock = document.getElementById("clockDisplay");
	myClock.textContent = "" + dayarray[day] + " " + daym + " " + montharray[month] + " " + year + " | " + h + ":" + m + ":" + s;

	//DAY, DATE, MONTH, YEAR & TIME
	//myClock.innerText = "" +dayarray[day]+ " " +daym+ " " +montharray[month]+ " " +year+ " | " +h+ ":" +m+ ":" +s;

	//MONTH, YEAR & TIME
	myClock.innerText = "" + daym + " " + montharray[month] + " " + year + " | " + h + ":" + m + ":" + s;

	setTimeout("renderTime()", 1000);
}
renderTime();


//********************************************************DIV EQUAL height START*******************************************************		
var biggestHeight = 0;
$('.equhight').each(function() {
	if ($(this).height() > biggestHeight) {
		biggestHeight = $(this).height();
	}
});
$('.equhight').height(biggestHeight);

//********************************************************BUTTON CLICK EFFECTS START**************************************************
var addRippleEffect = function(e) {
	var target = e.target;
	if (target.tagName.toLowerCase() !== 'button') return false;
	var rect = target.getBoundingClientRect();
	var ripple = target.querySelector('.ripple');
	if (!ripple) {
		ripple = document.createElement('span');
		ripple.className = 'ripple';
		ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		target.appendChild(ripple);
	}
	ripple.classList.remove('show');
	var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
	var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
	ripple.style.top = top + 'px';
	ripple.style.left = left + 'px';

	ripple.classList.add('show');
	return false;
};
document.addEventListener('click', addRippleEffect, false);


//********************************************************LIST BOX MULTI SELECTED ***********************************************
//$('select.multiSelected').multi({
//search_placeholder: 'Search Countries...',
//});

//********************************************************DATE AND TIME PICKER ***********************************************
$('#fromDatepicker').datetimepicker({
	prevText: '<i class="nf nf-angle-left"></i>',
	nextText: '<i class="nf nf-angle-right"></i>',
	beforeShow: function(input, inst) {
		var newclass = 'smart-forms';
		var smartpikr = inst.dpDiv.parent();
		if (!smartpikr.hasClass('smart-forms')) {
			inst.dpDiv.wrap('<div class="' + newclass + '"></div>');
		}
	}

});
$('#toDatepicker').datetimepicker({
	prevText: '<i class="nf nf-angle-left"></i>',
	nextText: '<i class="nf nf-angle-right"></i>',
	beforeShow: function(input, inst) {
		var newclass = 'smart-forms';
		var smartpikr = inst.dpDiv.parent();
		if (!smartpikr.hasClass('smart-forms')) {
			inst.dpDiv.wrap('<div class="' + newclass + '"></div>');
		}
	}

});

//*******************************************************MODAL WINDOW ANIMATION EFFECTS START***********************************************
$(".modal").each(function(l) {
	$(this).on("show.bs.modal", function(l) {
		var o = $(this).attr("data-easein");
		"shake" == o ? $(".modal-dialog").velocity("callout." + o) : "pulse" == o ? $(".modal-dialog").velocity("callout." + o) : "tada" == o ? $(".modal-dialog").velocity("callout." + o) : "flash" == o ? $(".modal-dialog").velocity("callout." + o) : "bounce" == o ? $(".modal-dialog").velocity("callout." + o) : "swing" == o ? $(".modal-dialog").velocity("callout." + o) : $(".modal-dialog").velocity("transition." + o)
	})
});

//*******************************************************DROPDOWN POPUP SCRIPT FUNCTION***********************************************
$('[data-toggle=popover].panelRightpopup').popover({
	trigger: 'hover',
});

//*******************************************************COPY TO CLIPBOARD SCRIPT FUNCTION**********************************************
var clipboard = new Clipboard('.copytoClipbtn');


//************* USER PROFILE DROPDOWN IN TOPBAR START **************//
$(".nt-dd-toggle").click(function(){
	$(".nt-dd-menu").slideToggle();
});