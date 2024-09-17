//USERNAME SUBMIT FUNCTION

$('#password-field').keydown(function(e) {
	var key = e.which;
	if (key == 13) {
		$( "#password_btn" ).trigger( "click" )
	}
	});

$('#username').keydown(function(e) {
	var key = e.which;
	if (key == 13) {
		$( "#username_btn" ).trigger( "click" )
	}
	});

$(document).on("click", "#username_btn", function(){
	$this = $(this);
	var username = $("#username").val();
	console.log($('input[name="csrfmiddlewaretoken"]').val())
	if(username) {
		$('#loading').show();
		$.ajax({
			url : "/CheckUsernameView/",
			type : 'POST',
			data :{"username":username, csrfmiddlewaretoken:$('input[name="csrfmiddlewaretoken"]').val()},
			error:(function(error){
				alert_status("error", error.statusText);
			}),
			success:(function(json_data){
				var data = JSON.parse(json_data);;
				if (data.status == 'NTE-01'){
					$this.parent().hide();
					$("#password-field").attr("data-value", username);
					$this.parent().siblings("#password_panel").show();
					$("#password-field").focus();
				} else {
					alert_status("error", data.message);
				}
			}),
			complete:(function(){
				$('#loading').hide();
			})
		});
	} else {
		alert_status("warning", "Please Enter Username");
	}
});


//PASSWORD SUBMIT FUNCTION
$(document).on("click", "#password_btn", function(){
	var user_name = $('#password-field').attr("data-value");
	var password = $('#password-field').val();
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
	var actionurl = '/login/';
	if(password == '') {
		alert_status("warning", "Please Enter Password");
	} else {
		$.ajax({
			type  : 'POST',
			url   : '/login/',
			async : false,
			data: {
				'datas': JSON.stringify({"username": user_name, "password": password}),
				csrfmiddlewaretoken: csrf_data
			},
			error:(function(error){
				alert_status("error", error.statusText);
			}),
			success:(function(json_data){
				var data = JSON.parse(json_data);
				if (data.status == 'NTE_01'){
					window.location.href = '/GSolve/Dashboard/';
				} else if (data.status == 'NTE_02'){
					alert_status("error", "Password is Incorrect.");
				} else {
					alert_status("error", "Password is Incorrect.");
				}
			}),
			complete:(function(){
				$('#loading').hide();
			})
		});
	}
});
