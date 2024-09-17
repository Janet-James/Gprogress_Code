var global_emp_id = ''

$(document).ready(function () {

	/* ----------------------   Preloader ------------------- */
	$("#loading").hide();

	$("#gender").select2({
        placeholder: "-Select Gender-",
        width: '100%',
    	});
	$("#country_of_birth").select2({
		placeholder: "-Select Country-",
		width: '100%',
		});	
	$("#marital_status").select2({
		placeholder: "-Select Marital Status-",
		width: '100%',
		});	
	$("#sex").select2({
		placeholder: "--Select Gender--",
		width: '100%',
		});		
	$("#Marital_Status").select2({
		placeholder: "-Select Marital Status-",
		width: '100%',
		});	
	$("#country_of_issue").select2({
		placeholder: "--Select Country-",
		width: '100%',
		});	
	$("#organisational_country").select2({
		placeholder: "--Select Country-",
		width: '100%',
		});	
	$("#residental_country").select2({
		placeholder: "--Select Country-",
		width: '100%',
		});	
	$("#em_country").select2({
		placeholder: "--Select Country-",
		width: '100%',
		});	
	$("#origin_country").select2({
		placeholder: "--Select Country-",
		width: '100%',
		});					
		

	$("#gender,#country_of_birth").on("change", function () {
		$("#employee_info_validation_form").valid();
	})

	$("#marital_status").on("change", function () {
		$("#employee_info_validation_form").valid();
	})
	$("#organisational_country",).on("change", function () {
		$("#applicationforentrypermit_form_validation").valid();
	})
	$("#residental_country",).on("change", function () {
		$("#applicationforentrypermit_form_validation").valid();
	})
	$("#em_country",).on("change", function () {
		$("#applicationforentrypermit_form_validation").valid();
	})
	$("#origin_country",).on("change", function () {
		$("#work_permit_application_validation").valid();	
	})



	// // emp_basic info datepicker
	$("#date_of_birth_dtbox, #application_date_dtbox, #expiry_date_dtbox, #passport_issue_date_dtbox").DateTimePicker({
		dateFormat: "dd-MM-yyyy",
		//maxDate: new Date(),
	});

	// $('#overall_candidate_div').html('')

	/* ----------------------   Applicant Details - right Side arrow animation ------------------- */
	$('.arrow_clk').click(function(){
		$('.main_arr_arrow_part').toggleClass('show');
		$('.main_arr_content').toggleClass('arr-show');
		$('.hid-content').toggleClass('show');
		$(this).toggleClass('rotateimg180')
	});

// <<<<<<< HEAD


	/* ----------------------   Wizard Tab start ------------------- */
	$('[id^="step-"]').click(function(){
		if (!$(this).hasClass("lock")) {
			$('.form-visa').removeClass('show');
			var view = $(this).attr('id');
			if(view=='step-1'){
				$("#date_of_birth_dtbox, #application_date_dtbox, #expiry_date_dtbox, #passport_issue_date_dtbox").DateTimePicker({
					dateFormat: "dd-MM-yyyy",
					//maxDate: new Date(),
				});
			}
			else if(view=='step-2')
			{
				$('#Date_Departure_to_png_dtbox, #Date_arrival_in_png_dtbox, #previous_Date_of_Birth_dtbox, #Passport_Expiry_Date_dtbox, #pngvisitDate_dtbox').DateTimePicker({
					dateFormat: "dd-MM-yyyy",
					//maxDate: new Date(),
				});
			}
			else if(view=='step-3')
			{
				$('#arrival_date_dtbox, #date_dtbox').DateTimePicker({
					dateFormat: "dd-MM-yyyy",
					//maxDate: new Date(),
				});
			}
			else if(view=='step-5')
			{
				$('#from_duration1_dtbox, #to_duration1_dtbox, #from_duration2_dtbox, #to_duration2_dtbox, #from_duration3_dtbox, #to_duration3_dtbox, #from_duration4_dtbox, #to_duration4_dtbox, #test_date_dtbox').DateTimePicker({
					dateFormat: "dd-MM-yyyy",
					//maxDate: new Date(),
				});
			}
		
			$('#tab-'+view+'-form').addClass('show');
			$('.tab-list').removeClass('active');
			$(this).addClass('active');
		}
	});
	$('[id^="next-"]').click(function(){
		
	});

	$('.enable-ind-visa-doc').click(function(){
	});

	$('#next-1').click(function(){
		$('#step-1').removeClass('lock');
		$('#step-1').addClass('enable active');
		$('#step-pre').removeClass('active');
		$('#tab-step-pre-form').removeClass('show');
		$('#tab-step-1-form').addClass('show');
	});

	/* ----------------------   Wizard Tab end------------------- */

// =======
	$("#employee_info_table").DataTable({	
		dom:'<"top"i>rt<"bottom"flp><"clear">', 
	});	
	$("#update_candidate").hide();
	$("#delete_candidate").hide();

	get_employee_info()

})


// ==================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Insert

// employee basic information

function EmployeeCreateUpdate()
{
	form_valid=$("#employee_info_validation_form").valid();
    console.log("form validddd *******",form_valid)
    if (form_valid)
    {
	var fullname_Input = $("#full_name").val();
	var family_name_Input = $("#family_name").val();
	var designation_Input = $("#designation").val();
	var gender_Input = $("select#gender").val();
	var date_of_birth_Input = $("#date_of_birth").val();
	var newdate_of_birth = date_of_birth_Input.split("-").reverse().join("-");
	var country_of_birth_Input = $("#country_of_birth").val();
	var application_date_Input = $("#application_date").val();
	var new_application_date = application_date_Input.split("-").reverse().join("-");
	var phone_number_Input = $("#phone_number").val();
	var location_Input = $("#location").val();
	var citizenship_Input = $("#citizenship").val();
	var nationality_Input = $("#nationality").val();
	var address_Input = $("#address").val();
	var marital_status_Input = $("select#marital_status").val();
	var passport_no_Input = $("#passport_no").val();
	var expiry_date_Input = $("#expiry_date").val();
	var newexpiry_date_Input = expiry_date_Input.split("-").reverse().join("-");
	var occupation_Input = $("#occupation").val();
	var passport_issue_date_Input = $("#passport_issue_date").val();
	var newpassport_issue_date_Input = passport_issue_date_Input.split("-").reverse().join("-");
	var passport_issue_place_Input = $("#passport_issue_place").val();
	var passport_issue_authority_Input = $("#passport_issue_authority").val();
	var emp_id = global_emp_id
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();

	console.log(fullname_Input, family_name_Input,designation_Input, gender_Input, newdate_of_birth, country_of_birth_Input,new_application_date,
		phone_number_Input, location_Input,citizenship_Input,nationality_Input,address_Input,marital_status_Input,passport_no_Input,
		newexpiry_date_Input,occupation_Input,newpassport_issue_date_Input,passport_issue_place_Input,passport_issue_authority_Input)
	
		$.ajax({
		url: '/GSolve/addemployeeform/',
		type: 'post',
		data: {
			'full_name': fullname_Input,
			'family_name': family_name_Input,
			'designation': designation_Input,
			'gender': gender_Input,
			'date_of_birth': newdate_of_birth,
			'country_of_birth':country_of_birth_Input,
			'application_date': new_application_date,
			'phone_number': phone_number_Input,
			'location': location_Input,
			'citizenship': citizenship_Input,
			'nationality': nationality_Input,
			'address': address_Input,
			'marital_status': marital_status_Input,
			'passport_no': passport_no_Input,
			'expiry_date': newexpiry_date_Input,
			'occupation': occupation_Input,
			'passport_issue_date': newpassport_issue_date_Input,
			'passport_issue_place': passport_issue_place_Input,
			'passport_issue_authority': passport_issue_authority_Input,
			'emp_id': emp_id,
			csrfmiddlewaretoken: csrf_data
		},		
	}).done(function(json_data) { 
		data = JSON.parse(json_data)
		// alert("click ok")
		console.log(data)
		get_employee_info()
		if(data.status == 1){
			Lobibox.notify('success', {
				position: 'top right',
				msg: 'Employee Created'
			});
		}
		else if(data.status == 2){
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Employee Updated'
			});
		}
		else{
			Lobibox.notify('error', {

				position: 'top right',
				msg: 'Error'
			});
		}
		// MedicalExaminationFormClear()
		// AddEmployeeClear()
		// self_declaration_clear()
		// Work_Permit_SubmitClear()
		// EntryPermitClear()
	});
}
}


// Medical Examiantion Form
function MedicalExaminationForm(){
	form_valid=$("#medicalExamination_validation_form").valid();
    console.log("medicalExamination validation form @@@@@",form_valid)
    if (form_valid)
    {
	var family_illness_detail = $('#family_illness_detail').val();
	var family_illness_tb_detail = $('#family_illness_tb_detail').val();
	var family_mental_illness_detail = $('#family_mental_illness_detail').val();
	var required_medical_attention = $('#required_medical_attention').val();
	var family_physical_disability_detail = $('#family_physical_disability_detail').val();
	var emp_id = global_emp_id;
	console.log("medical on click id", emp_id)
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();

	console.log(family_illness_detail, family_illness_tb_detail, family_mental_illness_detail, required_medical_attention, family_physical_disability_detail)

		$.ajax({
			url: '/GSolve/medical_examiantion_form/',
			type: 'post',
			data: {
				'family_illness_detail': family_illness_detail,
				'family_illness_tb_detail': family_illness_tb_detail,
				'family_mental_illness_detail': family_mental_illness_detail,
				'required_medical_attention': required_medical_attention,
				'family_physical_disability_detail': family_physical_disability_detail,
				'emp_id': emp_id,
				csrfmiddlewaretoken: csrf_data
			},		
		}).done(function(json_data) { 
			data = JSON.parse(json_data)
			console.log(data)
			get_employee_info()
			if(data.status == 1){
				Lobibox.notify('success', {
					position: 'top right',
					msg: 'Form Created'
				});
			}
			else if(data.status == 2){
				Lobibox.notify('success', {
				
					position: 'top right',
					msg: 'Form Updated'
				});
			}
			else{
				Lobibox.notify('error', {
				
					position: 'top right',
					msg: 'Error'
				});
			}
			// MedicalExaminationFormClear()
			// AddEmployeeClear()
			// self_declaration_clear()
			// Work_Permit_SubmitClear()
			// EntryPermitClear()
		});
}
}


// Self Declaration Corona Virus Form
function Self_Declaration_Submit(){
	form_valid=$("#self_declaration_validation_form").valid();
    console.log("self declaration form validddd =====",form_valid)
    if (form_valid)
    {
	var arrival_date = $('#arrival_date').val();
	var newarrival_date = arrival_date.split("-").reverse().join("-");
	var date = $('#date').val();
	var newdate = date.split("-").reverse().join("-");
	var country_visit = $('input[name="visit"]:checked').val();
	var country_visit_detail = $('#country_visit_detail').val();
	var Coughing = $('input[name="Coughing"]:checked').val();
	var Running_nose = $('input[name="running_nose"]:checked').val();
	var high_fever = $('input[name="fever"]:checked').val();
	var sore_throat = $('input[name="sore_throat"]:checked').val();
	var headaches = $('input[name="headache"]:checked').val();
	var symptoms_details = $('#symptoms_details').val();
	var travelling = $('input[name="travelling"]:checked').val();
	var symptom_array = {"Coughing":Coughing, "running_nose":Running_nose, "fever":high_fever, "sore_throat":sore_throat, "headache": headaches};
	console.log(symptom_array)

	var emp_id = global_emp_id;
	console.log("self dec on click id", emp_id)
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();

		$.ajax({
		url: '/GSolve/self_declaration_form/',
		type: 'post',
		data: {
			'arrival_date': newarrival_date,
			'date': newdate,
			'country_visit': country_visit,
			'country_visit_detail': country_visit_detail,
			"symptoms": JSON.stringify(symptom_array),
			'symptoms_details': symptoms_details,
			'travelling': travelling,
			'emp_id': emp_id,
			csrfmiddlewaretoken: csrf_data
		},		
		}).done(function(json_data) { 
			data = JSON.parse(json_data)
			console.log(data)
			get_employee_info()
			if(data.status == 1){
				Lobibox.notify('success', {
					position: 'top right',
					msg: 'Self Declaration Form Created'
				});
			}
			else if(data.status == 2){
				Lobibox.notify('success', {
				
					position: 'top right',
					msg: 'Self Declaration Form Updated'
				});
			}
			else{
				Lobibox.notify('error', {
					position: 'top right',
					msg: 'Error'
				});
			}
			// MedicalExaminationFormClear()
			// AddEmployeeClear()
			// self_declaration_clear()
			// Work_Permit_SubmitClear()
			// EntryPermitClear()
		});
	}
}


// Application For Entry Permit
function applicationforentrypermitCreateUpdate(){
	form_valid=$("#applicationforentrypermit_form_validation").valid();
    console.log("applicationforentrypermit form validation ===", form_valid)
    if (form_valid)
    {
    var PurposePng =$("input[name='PurposePng']:checked").val()
	var stayPng = $('#stayPng').val();
	var stayPngtype = $('input[name="stayPngtype"]:checked').val();

	// TRAVEL ARRANGEMENTS
	var Name_of_Vessel = $('#Name_of_Vessel').val();
	var Place_Departure_to_png=$('#Place_Departure_to_png').val();
	var Date_Departure_to=$('#Date_Departure_to_png').val();
	var Date_Departure_to_png = Date_Departure_to.split("-").reverse().join("-");
	var Place_Arrival_in_png=$('#Place_Arrival_in_png').val();
	var Date_arrival_in=$('#Date_arrival_in_png').val();
	var Date_arrival_in_png = Date_arrival_in.split("-").reverse().join("-");
	var purposeemploymenttt =$("input[name='purposeemployment']:checked").map(function(_, el) {
		return $(el).val();
	}).get();
	console.log(purposeemploymenttt.join(","))
	purposeemployment=purposeemploymenttt.join(",")
	var fundstaypngg =$("input[name='fundstaypng']:checked").map(function(_, el) {
		return $(el).val();
	}).get();
	console.log(fundstaypngg.join(","))
	fundstaypng=fundstaypngg.join(",")

	// PREVIOUS NAMES/ALIAS DETAILS:
    var previous_FamilyName=$('#previous_FamilyName').val();
	var Given_Names=$('#Given_Names').val();
	var Date_of_Birt=$('#previous_Date_of_Birth').val();    
	var previous_Date_of_Birth = Date_of_Birt.split("-").reverse().join("-");
	var sex=$('select#sex').val();
	var Marital_Status=$('select#Marital_Status').val();

	// OTHER PASSPORTS
	var country_of_issue=$('#country_of_issue').val();
	var Passport_Number=$('#Passport_Number').val();
	var Passport_Expiry_Dat=$('#Passport_Expiry_Date').val();
	var Passport_Expiry_Date = Passport_Expiry_Dat.split("-").reverse().join("-");

	// ORGANISATIONAL SPONSOR
	var Organisational_Name=$('#Organisational_Name').val();
	var Agent=$('#Agent').val();
	var Contact_Address_Number_and_Street=$('#Contact_Address_Number_and_Street_organization').val();
	var Town=$('#Suburb_Town').val();
	var State_Province=$('#State_Province').val();
	var Postcode=$('#Postcode').val();
	var organisational_country=$('select#organisational_country').val();  //varalea
	var Business_Telephone=$('#Business_Telephone').val()
	var Facsimile=$('#Facsimile').val()
	var preVstPng=$('input[name="preVstPng"]:checked').val();
	var pngvisitDat=$('#pngvisitDate').val()
	var pngvisitDate = pngvisitDat.split("-").reverse().join("-");
	var Purpose_of_visit=$('#Purpose_of_visit').val()
	var duration_of_visit=$('#duration_of_visit').val()
	var adress_during_stay=$('#adress_during_stay').val()
	var criminal=$('input[name="criminal"]:checked').val();
    var nature_of_offence=$('#nature_of_offence').val();
	var refused=$('input[name="refused"]:checked').val();
	var details=$('#details').val();
	var health=$('input[name="health"]:checked').val();
	var healthdetails=$('#healthdetails').val();  //varalea

	//ADDRESS RESIDENTIAL
	var Number_and_Street=$('#Number_and_Street').val();
	var resi_Town=$('#resi_Town').val();
	var State=$('#State').val();
	var resi_Postcode=$('#resi_Postcode').val();
	var residental_country=$('select#residental_country').val(); //varalea
	var Home_Telephone=$('#Home_Telephone').val();
	var Mobile_Telephone=$('#Mobile_Telephone').val();
	var email_address=$('#email_address').val();
	var emailVe=$('input[name="emailVe"]:checked').val();

	//PNG
	var png_Number_and_Street=$('#png_Number_and_Street').val();
	var Town_Village=$('#Town_Village').val();
	var Province=$('#Province').val();
	var Postal_Address=$('#Postal_Address').val();
	var png_Home_Telephone=$('#png_Home_Telephone').val();
	var png_Mobile_Telephone=$('#png_Mobile_Telephone').val();
	
	//EMERGENCY CONTACT:
	var em_Family_Name=$('#em_Family_Name').val();
	var em_Given_Names=$('#em_Given_Names').val();
	var Relationship_to_Applicant=$('#Relationship_to_Applicant').val();
	var em_Contact_Address_Number_and_Street_organization=$('#em_Contact_Address_Number_and_Street_organization').val();
	var em_Suburb_Town=$('#em_Suburb_Town').val();
	var em_State_Province=$('#em_State_Province').val();
    var Postcode=$('#em_Postcode').val();
	var em_country=$('select#em_country').val();
	var em_Home_Telephone=$('#em_Home_Telephone').val();
	var em_Mobile_Telephone=$('#em_Mobile_Telephone').val();
	var emergencontactDat=$('#emergencontactDate').val();
	var emergencontactDate = emergencontactDat.split("-").reverse().join("-");
	var emp_id = global_emp_id;
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();

	if (emp_id){
		$.ajax({
		url: '/GSolve/application_entrypermit_form/',
		type: 'post',
		data: {
			'PurposePng': PurposePng,
			'stayPng':stayPng ,
			'stayPngtype':stayPngtype,
			'Name_of_Vessel': Name_of_Vessel,
			'Place_Departure_to_png':Place_Departure_to_png,
			'Date_Departure_to_png': Date_Departure_to_png,
			'Place_Arrival_in_png': Place_Arrival_in_png,
			'Date_arrival_in_png': Date_arrival_in_png,
	        'purposeemployment':purposeemployment ,
			'fundstaypng':fundstaypng ,
			'previous_FamilyName': previous_FamilyName,
			'Given_Names':Given_Names ,
			'previous_Date_of_Birth':previous_Date_of_Birth ,
			'sex': sex,
			'Marital_Status': Marital_Status,
			'country_of_issue': country_of_issue,
			'Passport_Number': Passport_Number,
			'Passport_Expiry_Date': Passport_Expiry_Date,
			'Organisational_Name': Organisational_Name,
			'Agent': Agent,
			'Contact_Address_Number_and_Street': Contact_Address_Number_and_Street,
			'Town': Town,
			'State_Province':State_Province ,
			'Postcode': Postcode,
			'organisational_country':organisational_country ,
			'Business_Telephone':Business_Telephone ,
			'Facsimile': Facsimile,
			'preVstPng': preVstPng,
			'pngvisitDate':pngvisitDate ,
			'Purpose_of_visit': Purpose_of_visit,
			'duration_of_visit':duration_of_visit ,
			'adress_during_stay': adress_during_stay,
			'criminal': criminal,
			'nature_of_offence': nature_of_offence,
			'refused': refused,
			'details': details,
			'health': health,
			'healthdetails': healthdetails,
			'Number_and_Street':Number_and_Street ,
			'resi_Town':resi_Town ,
			'State': State,
			'resi_Postcode':resi_Postcode ,
			'Home_Telephone':Home_Telephone ,
			'Mobile_Telephone':Mobile_Telephone ,
			'email_address':email_address ,
			'emailVe': emailVe,
			'png_Number_and_Street':png_Number_and_Street ,
			'Town_Village':Town_Village ,
			'Province': Province,
			'Postal_Address':Postal_Address ,
			'png_Home_Telephone':png_Home_Telephone ,
			'png_Mobile_Telephone':png_Mobile_Telephone ,
			'em_Family_Name':em_Family_Name ,
			'em_Given_Names': em_Given_Names,
			'Relationship_to_Applicant':Relationship_to_Applicant ,
			'em_Contact_Address_Number_and_Street_organization': em_Contact_Address_Number_and_Street_organization,
			'em_Suburb_Town':em_Suburb_Town,
			'em_State_Province':em_State_Province,
			'em_Postcode': Postcode,
			'em_country': em_country,
			'residental_country': residental_country,
			'em_Home_Telephone':em_Home_Telephone ,
			'em_Mobile_Telephone':em_Mobile_Telephone ,
			'emergencontactDate':emergencontactDate ,
			'emp_id': emp_id,
			csrfmiddlewaretoken: csrf_data
		},		
		}).done(function(json_data) { 
			data = JSON.parse(json_data)
			console.log(data)
			get_employee_info()
			if(data.status == 1){
				Lobibox.notify('success', {
					position: 'top right',
					msg: 'Form Created'
				});
			}
			else if(data.status == 2){
				Lobibox.notify('success', {
					position: 'top right',
					msg: 'Form Updated'
				});
				EntryPermitClear()
			}
			else{
				Lobibox.notify('error', {
					position: 'top right',
					msg: 'Error'
				});
			}
			// clear
			// MedicalExaminationFormClear()
			// AddEmployeeClear()
			// self_declaration_clear()
			// Work_Permit_SubmitClear()
			// EntryPermitClear()
		});
	}else{
		Lobibox.notify('warning', {		
			position: 'top right',
			msg: "Can't Get"
		});
	}
}
}



function Work_Permit_Submit(){
	form_valid=$("#work_permit_application_validation").valid();
    console.log("work permit application validation form ===", form_valid)
    if (form_valid)
    {
	var app_checklist =$("input[name='application_checklist']:checked").map(function(_, el) {
		return $(el).val();
	}).get();
	console.log(app_checklist.join(","))
	application_checklist=app_checklist.join(",")
	var work = $('input[name="work"]:checked').val();
	var volunteer = $('input[name="volunteer"]:checked').val();
	var shortTerm = $('input[name="shortTerm"]:checked').val();
	var longTerm = $('input[name="longTerm"]:checked').val();
	var Term = $('input[name="Term"]:checked').val();
	var employee_name = $('#employee_name').val();
	var employer_address = $('#employer_address').val();
	var telephone = $('#telephone').val();
	var fax = $('#fax').val();
	var email = $('#email').val();
	var division = $('#division').val();
	var sub_division = $('#sub_division').val();
	var png_employee = $('#png_employee').val();
	var non_png_employee = $('#non_png_employee').val();
	var job_title = $('#job_title').val();
	var occupation1 = $('#occupation1').val();
	var job_code = $('#job_code').val();
	var position_code = $('#position_code').val();
	var work_location = $('#work_location').val();
	var loca = $('input[name="loca"]:checked').val();
	var location_details = $('#location_details').val();
	var reserved = $('input[name="reserved"]:checked').val();
	var advertised = $('input[name="advertised"]:checked').val();
	var ad = $('input[name="ad"]:checked').map(function(_, el) {
		return $(el).val();
	}).get();
	position_ad = ad.join(",")
	var dependent_accompanied = $('input[name="dependent_accompanied"]:checked').val();
	var dependent_accompany_count = $('#dependent_accompany_count').val();
	var work_permit_holder = $('input[name="work_permit_holder"]:checked').val();
	var permit_no =  $('#permit_no').val();
	var training_institution1 = $('#training_institution1').val();
	var from_duration1 = $('#from_duration1').val();
	var new_from_duration1= from_duration1.split("-").reverse().join("-");
	var to_duration1 = $('#to_duration1').val();
	var new_to_duration1 = to_duration1.split("-").reverse().join("-");
	var qualification1 =  $('#qualification1').val();
	var training_institution2 = $('#training_institution2').val();
	var from_duration2 =$('#from_duration2').val();
	var new_from_duration2= from_duration2.split("-").reverse().join("-");
    var to_duration2 =  $('#to_duration2').val();
	var new_to_duration2 = to_duration2.split("-").reverse().join("-");
	var qualification2=$('#qualification2').val();
	var emp_location1 =  $('#emp_location1').val();
	var industry1 =  $('#industry1').val();
	var from_duration3 = $('#from_duration3').val();
	var new_from_duration3= from_duration3.split("-").reverse().join("-");
	var to_duration3 = $('#to_duration3').val();
	var new_to_duration3 = to_duration3.split("-").reverse().join("-");
	var occupation2 =  $('#occupation2').val();
	var emp_location2=  $('#emp_location2').val();
	var industry2 =  $('#industry2').val();
	var from_duration4 = $('#from_duration4').val()
	var new_from_duration4 = from_duration4.split("-").reverse().join("-");
	var to_duration4 = $('#to_duration4').val()
	var new_to_duration4 = to_duration4.split("-").reverse().join("-");
	var occupation3 =  $('#occupation3').val();
	var origin_country =  $("select#origin_country").val();
	var city =  $('#city').val();
	var english_speaking = $('input[name="english_speaking"]:checked').val();
	var language_proficiency = $('input[name="language_proficiency"]:checked').val();
	var edu_institute =  $('#edu_institute').val();
	var test_date = $('#test_date').val()
	var new_test_date = test_date.split("-").reverse().join("-");
    var result =  $('#result').val();
    var alternative_proof =  $('#alternative_proof').val();
	var salary =  $('#salary').val();
	var non_salary =  $('#non_salary').val();
    var total_salary =  $('#total_salary').val();
	var emp_id = global_emp_id;
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();

	console.log(application_checklist,work,volunteer,shortTerm,longTerm,Term,employee_name,employer_address,telephone,fax,email,division,sub_division,png_employee,non_png_employee,job_title,occupation1,
		job_code,position_code,work_location,loca,location_details,reserved,advertised,position_ad,dependent_accompanied,dependent_accompany_count,work_permit_holder,permit_no,training_institution1,new_from_duration1,
	    new_to_duration1,qualification1,training_institution2,new_from_duration2,new_to_duration2,qualification2,emp_location1,industry1,
		new_from_duration3,new_to_duration3,occupation2,emp_location2,industry2,from_duration4,new_from_duration4,occupation3,origin_country, city, english_speaking,
		language_proficiency,edu_institute,new_test_date,result,alternative_proof, salary,non_salary,total_salary,)

		$.ajax({
			url: '/GSolve/work_permit_form/',
			type: 'post',
			data: {
				'application_checklist':application_checklist,
                'work': work,
				'volunteer': volunteer,
				'shortTerm': shortTerm,
				'longTerm': longTerm,
				'Term': Term,
				'employee_name': employee_name,
				'employer_address': employer_address,
				'telephone': telephone,
				'fax': fax,
				'email': email,
				'division': division,
				'sub_division': sub_division,
				'png_employee': png_employee,
				'non_png_employee': non_png_employee,
				'job_title': job_title,
				'occupation1': occupation1,
				'job_code': job_code,
				'position_code': position_code,
				'work_location': work_location,
				'loca': loca,
				'location_details': location_details,
				'reserved': reserved,
				'advertised': advertised,
				'ad': position_ad,
				'dependent_accompanied': dependent_accompanied,
				'dependent_accompany_count':dependent_accompany_count,
				'work_permit_holder': work_permit_holder,
				'permit_no': permit_no,
				'training_institution1': training_institution1,
				'from_duration1': new_from_duration1,
				'to_duration1': new_to_duration1,
				'qualification1': qualification1,
				'training_institution2': training_institution2,
				'from_duration2': new_from_duration2,
				'to_duration2': new_to_duration2,
				'qualification2' : qualification2,
				'emp_location': emp_location1,
				'industry1': industry1,
				'from_duration3': new_from_duration3,
				'to_duration3': new_to_duration3,
				'occupation2': occupation2,
				'emp_location2': emp_location2,
				'industry2': industry2,
				'from_duration4': new_from_duration4,
				'to_duration4': new_to_duration4,
				'occupation3': occupation3,
				'origin_country': origin_country,
				'city': city,
				'english_speaking': english_speaking,
				'language_proficiency': language_proficiency,
				'edu_institute': edu_institute,
				'test_date': new_test_date,
				'result': result,
				'alternative_proof': alternative_proof,
				'salary': salary,
				'non_salary': non_salary,
				'total_salary': total_salary,
				'emp_id': emp_id,
				csrfmiddlewaretoken: csrf_data
			},		
		}).done(function(json_data) { 
			data = JSON.parse(json_data)
			console.log(data)
			get_employee_info()
			if(data.status == 1){
				Lobibox.notify('success', {
					position: 'top right',
					msg: 'work permit Form Created Successfully'
				});
			}
			else if(data.status == 2){
				Lobibox.notify('success', {
				
					position: 'top right',
					msg: 'work permit Form Updated Successfully'
				});
			}
			else{
				Lobibox.notify('error', {	
					position: 'top right',
					msg: 'Error'
				});
			}
			// clear
			// MedicalExaminationFormClear()
			// AddEmployeeClear()
			// self_declaration_clear()
			// Work_Permit_SubmitClear()
			// EntryPermitClear()
		});
}
}


function ClearValidation(){
	$('#work_permit_application_validation').validate({
		rules: {
			dependent_accompany_count : {required: true,},
		},
		messages : {
			dependent_accompany_count : { required: "",
		},
	}
})}



// ===================================>>>>>>>>>>>>>>>>>>>>      get all

function get_employee_info(){
	$("#employee_info_table > tr > td").remove()
	$.ajax({
		url: '/GSolve/employeeInfoGetall/',
		type: 'get',
	}).done(function(data) {
		data=JSON.parse(data)
		// console.log(data)
		// console.log(data.status)
		employee_data=data.data
		// console.log("dataaaaaaaaa", employee_data)
	if (data['status']==1)
	{
		dataset=[]

		for(i=0;i<employee_data.length;i++)
		{
			datas=[]
			var button = "<img src='/static/images/edit.png' onclick='EmpInfo_Edit_Button("+employee_data[i].emp_id+")'>"
			datas.push(
				employee_data[i].full_name, 
				employee_data[i].designation,
				employee_data[i].gender, 
				employee_data[i].date_of_birth,
				employee_data[i].application_date, 
				employee_data[i].phone_number,
				employee_data[i].location, 	
				button,)	
			datas.push()
			dataset.push(datas)
		}
		// console.log(dataset)
		$('#employee_info_table').DataTable().destroy()
		$('#employee_info_table').DataTable({
			data: dataset,
		});
	}
		})
	}


//  ==========================>>>>>>>>>>>>>>>>>>>>>>>>>>>    get by idddddddd

function EmpInfo_Edit_Button(edit_btn_id){
	// clear
	MedicalExaminationFormClear()
	AddEmployeeClear()
	self_declaration_clear()
	Work_Permit_SubmitClear()
	EntryPermitClear()
	ClearButton()

	$('#step-2').removeClass('lock');
	$('.tab-list').removeClass('active');
	$('#step-2').addClass('enable');
	$('#step-3').removeClass('lock');
	$('#step-3').addClass('enable');
	$('#step-4').removeClass('lock');
	$('#step-4').addClass('enable');
	$('#step-5').removeClass('lock');
	$('#step-5').addClass('enable');

	global_emp_id = parseInt(edit_btn_id);
	var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
	$.ajax({
		url: '/GSolve/employee_detail_getby_id/',
		type: 'POST',
		data:{
			'emp_id': global_emp_id,
			csrfmiddlewaretoken: csrf_data
		}
	    }).done(function(json_data){
		json_data = JSON.parse(json_data)
		if(json_data.status == 1)
		{

		Lobibox.notify('success', {
			position: 'top right',
			msg: 'Data Loaded'
		});
		data = json_data.emp_detail_data[0]
		console.log("emp_detail_data ===", data)

		datas = json_data.medical_examination_data[0]
		console.log("medical_examination_data ===", datas)

		self_data = json_data.self_declaration[0]
		console.log("self_data ===", self_data)

		ep_per_data = json_data.entrywork_permit_data[0]
		console.log("ep_per_data ===", ep_per_data)

		wp_data = json_data.work_permit_data[0]  
		console.log("work permit data ===", wp_data)

        $('#full_name').val(data.full_name)
        $('#family_name').val(data.family_name)
        $('#designation').val(data.designation)
		$("#gender").val(data.gender).trigger("change.select2")
		$('#date_of_birth').val(data.date_of_birth)
		$("#country_of_birth").val(data.country_id).trigger("change.select2")
		$('#application_date').val(data.application_date)
		$('#phone_number').val(data.phone_number)
		$('#location').val(data.location)
		$('#citizenship').val(data.citizenship)
		$('#nationality').val(data.nationality)
		$('#address').val(data.address)
		$("#marital_status").val(data.marital_status_id).trigger("change.select2")
		$('#passport_no').val(data.passport_no)
		$('#expiry_date').val(data.expiry_date)
		$('#occupation').val(data.occupation)
		$('#passport_issue_date').val(data.passport_issue_date)
		$('#passport_issue_place').val(data.passport_issue_place)
		$('#passport_issue_authority').val(data.passport_issue_authority)
		// Medical Examiantion Form
		if (datas){
		$('#family_illness_detail').val(datas.family_illness_detail)
        $('#family_illness_tb_detail').val(datas.family_illness_tb_detail)
        $('#family_mental_illness_detail').val(datas.family_mental_illness_detail)
		$('#required_medical_attention').val(datas.required_medical_attention)
		$('#family_physical_disability_detail').val(datas.family_physical_disability_detail)
		}
		// Self Declaration Corona Virus Form
		if (self_data){
		$('#arrival_date').val(self_data.arrival_date)
		$('#date').val(self_data.date)
		$("input[name='visit'][value=" + self_data.corona_case_country_visit + "]").prop('checked', true);
		$('#country_visit_detail').val(self_data.corona_case_country_visit_detail)

		var symptoms_data = self_data.symptoms

		var symptoms = JSON.parse(symptoms_data.replace(/'/g, '"'));        //conver str to dict
		console.log("dict",symptoms)

		let vals = Object.values(symptoms)
		console.log(vals)

		$("input[name='Coughing'][value=" + vals[0] + "]").prop('checked', true);
		$("input[name='running_nose'][value=" + vals[1] + "]").prop('checked', true);
		$("input[name='fever'][value=" + vals[2] + "]").prop('checked', true);
		$("input[name='sore_throat'][value=" + vals[3] + "]").prop('checked', true);
		$("input[name='headache'][value=" + vals[4] + "]").prop('checked', true);

		$('#symptoms_details').val(self_data.symptoms_detail)
		$("input[name='travelling'][value=" + self_data.future_travel_to_corona_country + "]").prop('checked', true);
		}

		if (ep_per_data){
		// ==========entrywork_permit_data
		$("input[name='PurposePng'][value=" + ep_per_data.visit_purpose + "]").prop('checked', true);
		$('#stayPng').val(ep_per_data.stay_duration)
		$("input[name='stayPngtype'][value=" + ep_per_data.stay_duration_type + "]").prop('checked', true);
		$('#Name_of_Vessel').val(ep_per_data.flight_name)
		$('#Place_Departure_to_png').val(ep_per_data.departure_place)
		$('#Date_Departure_to_png').val(ep_per_data.departure_date)
		$('#Place_Arrival_in_png').val(ep_per_data.arrival_place)
		$('#Date_arrival_in_png').val(ep_per_data.arrival_date)
		purposeemploymenttt = ep_per_data.employment_purpose
		purposeemployment= purposeemploymenttt.split(',');
			$.each(purposeemployment, function(i, val){
			$("input[value='" + val + "']").prop('checked', true);
			});
				 
		fundstaypngg = ep_per_data.stay_fund
		fundstaypng= fundstaypngg.split(',');
			$.each(fundstaypng, function(i, val){
				 $("input[value='" + val + "']").prop('checked', true);
		});
		$('#previous_FamilyName').val(ep_per_data.previous_family_name)
		$('#Given_Names').val(ep_per_data.previous_given_name)
		$('#previous_Date_of_Birth').val(ep_per_data.previous_given_dob)
		$("#sex").val(ep_per_data.previous_gender_id).trigger("change.select2")
		$("#Marital_Status").val(ep_per_data.previous_marital_status_id).trigger("change.select2")
		$("#country_of_issue").val(ep_per_data.other_passport_country_id).trigger("change.select2")
		$('#Passport_Number').val(ep_per_data.other_passport_no)
		$('#Passport_Expiry_Date').val(ep_per_data.other_passport_expiry_date)
		$('#Organisational_Name').val(ep_per_data.organization_name)
		$('#Agent').val(ep_per_data.agent)
		$('#Contact_Address_Number_and_Street_organization').val(ep_per_data.address)
		$('#Suburb_Town').val(ep_per_data.town)
		$('#State_Province').val(ep_per_data.province)
		$('#Postcode').val(ep_per_data.postcode)
		$("#organisational_country").val(ep_per_data.org_country_id).trigger("change.select2")
		$('#Business_Telephone').val(ep_per_data.business_telephone)
		$('#Facsimile').val(ep_per_data.fascsimile)
		$("input[name='preVstPng'][value=" + ep_per_data.visited_png_before + "]").prop('checked', true);
		$('#pngvisitDate').val(ep_per_data.last_visit_date)
		$('#Purpose_of_visit').val(ep_per_data.last_visit_purpose)
		$('#duration_of_visit').val(ep_per_data.last_visit_duration)
		$('#adress_during_stay').val(ep_per_data.last_visit_stay_address)
		$("input[name='criminal'][value=" + ep_per_data.criminal_offence_convicted + "]").prop('checked', true);
		$('#nature_of_offence').val(ep_per_data.criminal_offence_detail)
		$("input[name='refused'][value=" + ep_per_data.criminal_offence_refused + "]").prop('checked', true);
		$('#details').val(ep_per_data.entry_refused_detail)
		$("input[name='health'][value=" + ep_per_data.mental_issue + "]").prop('checked', true);
		$('#healthdetails').val(ep_per_data.mental_issue_detail)
		$('#Number_and_Street').val(ep_per_data.res_addr_street)
		$('#resi_Town').val(ep_per_data.res_addr_town)
		$('#State').val(ep_per_data.res_addr_province)
		$('#resi_Postcode').val(ep_per_data.res_addr_postcode)
		$("#residental_country").val(ep_per_data.res_addr_country_id).trigger("change.select2")
		$('#Home_Telephone').val(ep_per_data.res_addr_home_tel)
		$('#Mobile_Telephone').val(ep_per_data.res_addr_mobile_tel)
		$('#email_address').val(ep_per_data.res_addr_email)
		$("input[name='emailVe'][value=" + ep_per_data.criminal_offence_refused + "]").prop('checked', true);
		$('#png_Number_and_Street').val(ep_per_data.png_street)
		$('#Town_Village').val(ep_per_data.png_town)
		$('#Province').val(ep_per_data.png_provice)
		$('#Postal_Address').val(ep_per_data.png_postal_address)
		$('#png_Home_Telephone').val(ep_per_data.png_home_tel)
		$('#png_Mobile_Telephone').val(ep_per_data.png_mobile_tel)
		$('#em_Family_Name').val(ep_per_data.emergency_family_name)
		$('#em_Given_Names').val(ep_per_data.emergency_given_name)
		$('#Relationship_to_Applicant').val(ep_per_data.emergency_relationship)
		$('#em_Contact_Address_Number_and_Street_organization').val(ep_per_data.emergency_address)
		$('#em_Suburb_Town').val(ep_per_data.emergency_town)
		$('#em_State_Province').val(ep_per_data.emergency_province)
		$('#em_Postcode').val(ep_per_data.emergency_postcode)
		$("#em_country").val(ep_per_data.emergency_country_id).trigger("change.select2")
		$('#em_Home_Telephone').val(ep_per_data.emergency_home_tel)
		$('#em_Mobile_Telephone').val(ep_per_data.emergency_mobile_tel)
		$('#emergencontactDate').val(ep_per_data.emergency_date)
		}
		if (wp_data){
		///-------------get Work Permit Application---------------------------------------///////////////////
		application_check = wp_data.application_checklist
		application_checklist = application_check.split(',');
		$.each(application_checklist, function(i, val){
			$("input[value='" + val + "']").prop('checked', true);
		 });
		$("input[name='work'][value=" + wp_data.general_work_permit + "]").prop('checked', true);
		$("input[name='volunteer'][value=" + wp_data.volunteer_work_permit + "]").prop('checked', true);
		$("input[name='shortTerm'][value=" + wp_data.shortterm_work_permit + "]").prop('checked', true);
		$("input[name='longTerm'][value=" + wp_data.longterm_work_permit + "]").prop('checked', true);
		$("input[name='Term'][value=" + wp_data.workpermit_term + "]").prop('checked', true);
        $('#employee_name').val(wp_data.employer)
		$('#employer_address').val(wp_data.employer_address)
		$('#telephone').val(wp_data.telephone)
		$('#fax').val(wp_data.fax)
		$('#email').val(wp_data.email)
		$('#division').val(wp_data.industrial_division)
		$('#sub_division').val(wp_data.industrial_subdivision)
		$('#png_employee').val(wp_data.png_employees_employed)
		$('#non_png_employee').val(wp_data.non_citizen_employed)
		$('#job_title').val(wp_data.job_title)
		$('#occupation1').val(wp_data.occupation)
		$('#job_code').val(wp_data.job_code)
		$('#position_code').val(wp_data.company_position_code)
        $('#work_location').val(wp_data.primary_work_location)
		$("input[name='loca'][value=" + wp_data.other_location_travel + "]").prop('checked', true);
		$('#location_details').val(wp_data.other_location_travel_detail)
		$("input[name='reserved'][value=" + wp_data.reserved_occupation_position + "]").prop('checked', true);
		$("input[name='advertised'][value=" + wp_data.advertised_position + "]").prop('checked', true);
		ad_check = wp_data.advertised_detail
		ad = ad_check.split(',');
		$.each(ad, function(i, val){
			$("input[value='" + val + "']").prop('checked', true);
		 });
		$("input[name='dependent_accompanied'][value=" + wp_data.dependent_accompany + "]").prop('checked', true);
 		$('#dependent_accompany_count').val(wp_data.dependent_accompany_count)
		$("input[name='work_permit_holder'][value=" + wp_data.png_current_workpermit_holder + "]").prop('checked', true);
		$('#permit_no').val(wp_data.workpermit_number)
		$('#training_institution1').val(wp_data.training_institution_1)
		$('#from_duration1').val(wp_data.from_duration_1)
		$('#to_duration1').val(wp_data.to_duration_1)
		$('#qualification1').val(wp_data.field_study_1)
		$('#training_institution2').val(wp_data.training_institution_2)
		$('#from_duration2').val(wp_data.from_duration_2)
		$('#to_duration2').val(wp_data.to_duration_2)
		$('#qualification2').val(wp_data.field_study_2)
		$('#emp_location1').val(wp_data.employer_location_1)
		$('#industry1').val(wp_data.industry_1)
		$('#from_duration3').val(wp_data.employment_from_duration_1)
		$('#to_duration3').val(wp_data.employment_to_duration_1)
		$('#occupation2').val(wp_data.occupation_1)
		$('#emp_location2').val(wp_data.employer_location_2)
		$('#industry2').val(wp_data.industry_2)
		$('#from_duration4').val(wp_data.employment_from_duration_2)
		$('#to_duration4').val(wp_data.employment_to_duration_2)
		$('#occupation3').val(wp_data.occupation_2)
		$("#origin_country").val(wp_data.origin_country_id).trigger("change.select2")
		$('#city').val(wp_data.origin_city)
		$("input[name='english_speaking'][value="+wp_data.english_speaking_country+"]").prop('checked',true);
        $("input[name='language_proficiency'][value="+wp_data.passed_english_proficiency+"]").prop('checked',true);
		$('#edu_institute').val(wp_data.english_proficiency_institution)
		$('#test_date').val(wp_data.test_undertaken)
		$('#result').val(wp_data.results)
		$('#alternative_proof').val(wp_data.alternative_proof)
		$('#salary').val(wp_data.take_home_salary)
		$('#non_salary').val(wp_data.non_salary_allowance)
		$('#total_salary').val(wp_data.total_salary_package)
		}
		$("#add_candidate").hide();
		$("#delete_candidate").show();
		$("#update_candidate").show();
		}
		else
		{
			Lobibox.notify('warning', {
				position: 'top right',
				msg: "Can't Retrive"
			});
		}
	})
}


// ============================>>>>>>>>>>>>>>>     clearbutton

function ClearButton(){
	$("#add_candidate").show();
	$("#delete_candidate").hide();
	$("#update_candidate").hide();
	var self_validator = $( "#self_declaration_validation_form" ).validate();
	var emp_validator = $( "#employee_info_validation_form" ).validate();	
	var medical_validator = $( "#medicalExamination_validation_form" ).validate();
	var applicationentrypermit_validation = $("#applicationforentrypermit_form_validation").validate();
	var work_permit_application_validation = $("#work_permit_application_validation").validate();
	emp_validator.resetForm();
	self_validator.resetForm();
	medical_validator.resetForm();
	applicationentrypermit_validation.resetForm();
	work_permit_application_validation.resetForm();

	// select box reset 
	$('#gender').val('').trigger("change.select2");
	$('#country_of_birth').val('').trigger("change.select2");
	$('#marital_status').val('').trigger("change.select2");
	$('#sex').val('').trigger("change.select2");
	$('#Marital_Status').val('').trigger("change.select2");
	$('#country_of_issue').val('').trigger("change.select2");
	$('#organisational_country').val('').trigger("change.select2");
	$('#residental_country').val('').trigger("change.select2");
	$('#em_country').val('').trigger("change.select2");
	$('#origin_country').val('').trigger("change.select2");

}


// =================>>>>>>>>>>>>>>>>>>>>>>>>>>    delete functionality

function EmployeeDelete() {
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
	swal({
		  title: "Are you sure, you want to delete record?",
		  type: "warning",
			showCancelButton: true,
			confirmButtonClass: "btn-success btn-animate sa_yesbtn sabtn-eql-wid ",
			cancelButtonClass: "btn-danger btn-animate sa_nobtn sabtn-eql-wid",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {		
		  if (isConfirm) {
			//   $('#loading').show();
			  if(global_emp_id){
				// $('#loading').show();
				$.ajax({
					url: '/GSolve/delete_emp_info/',
					type: 'post',
					data: {
					'emp_id': global_emp_id,
					csrfmiddlewaretoken: csrf_data
					},
					success:(function(json_data){
						  data = JSON.parse(json_data)
						  if(data.status == 1){
							  Lobibox.notify('success', {  
								  position: 'top right',
								  msg: 'Data deleted succesfully'
							  });
						  }
						  else if(data.status == 2){
							  Lobibox.notify('success', {  
								  position: 'top right',
								  msg: 'Deletion Failed'
							  });
						  }
						  else{
							Lobibox.notify('Error', {  
							position: 'top right',
							msg: 'server error'
						});
				  	}
					console.log(json_data)
					get_employee_info()
					AddEmployeeClear()
					}	  
					)}
				 )}
			  $('#loading').hide();
		  } else {
			swal("Cancelled", "Your file is safe", "error");
		  }
		});
	}


function calculateAge(birthday) {
	var today = new Date();
	var birthDate = new Date(birthday.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));

	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}	    	    
	return age;
}

$('#date_of_birth').change(function(){
	age = calculateAge($('#date_of_birth').val())
	if(age > 18) {
		$('#valid_text').text('')
        return true;
    }
    else {
        $("#valid_text").text("Invalid DOB above 18+ only")
		$('#date_of_birth').val('')
        return false;
    }
});


function EnPer_dob_Onclick(birthday) {
	var today = new Date();
	var birthDate = new Date(birthday.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));

	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}	    	    
	return age;
}

$('#previous_Date_of_Birth').change(function(){
	age = EnPer_dob_Onclick($('#previous_Date_of_Birth').val())
	if(age > 18) {
		$('#ep_dob_validation').text('')
        return true;
    }
    else {
        $("#ep_dob_validation").text("Invalid DOB above 18+ only")
		$('#previous_Date_of_Birth').val('')
        return false;
    }
	// $("#employee_info_validation_form").valid();
});

// ===========================>>>>>>>>>>>>>>>>>>     clear function

// Work_Permit_SubmitClear
function Work_Permit_SubmitClear(){
	    $("#ckbCheckAll").prop('checked', false);
		$('input[name="application_checklist"]').prop('checked', false);
		$('input[name="work"]').prop('checked', false);
		$('input[name="volunteer"]').prop('checked', false);
		$('input[name="shortTerm"]').prop('checked', false);
		$('input[name="longTerm"]').prop('checked', false);
		$('input[name="Term"]').prop('checked', false);
        $('#employee_name').val('')
		$('#employer_address').val('')
		$('#telephone').val('')
		$('#fax').val('')
		$('#email').val('')
		$('#division').val('')
		$('#sub_division').val('')
		$('#png_employee').val('')
		$('#non_png_employee').val('')
		$('#job_title').val('')
		$('#occupation1').val('')
		$('#job_code').val('')
		$('#position_code').val('')
        $('#work_location').val('')
		$('input[name="loca"]').prop('checked', false);
        $('#location_details').val('')
		$('input[name="reserved"]').prop('checked', false);
		$('input[name="advertised"]').prop('checked', false);
		$('input[name="ad"]').prop('checked', false);
		$('input[name="dependent_accompanied"]').prop('checked', false);
        $('#dependent_accompany_count').val('')
		$('input[name="work_permit_holder"]').prop('checked', false);
        $('#permit_no').val('')
        $('#training_institution1').val('')
        $('#from_duration1').val('')
        $('#to_duration1').val('')
        $('#qualification1').val('')
        $('#training_institution2').val('')
        $('#from_duration2').val('')
        $('#to_duration2').val('')
        $('#qualification2').val('')
        $('#emp_location1').val('')
        $('#industry1').val('')
        $('#from_duration3').val('')
        $('#to_duration3').val('')
        $('#occupation2').val('')
        $('#emp_location2').val('')
        $('#industry2').val('')
        $('#from_duration4').val('')
        $('#to_duration4').val('')
        $('#occupation3').val('')
        $('#origin_country').val('')
        $('#city').val('')
		$('input[name="english_speaking"]').prop('checked', false);
		$('input[name="language_proficiency"]').prop('checked', false);
        $('#edu_institute').val('')
        $('#test_date').val('')
        $('#result').val('')
        $('#alternative_proof').val('')
        $('#salary').val('')
        $('#non_salary').val('')
        $('#total_salary').val('')
		global_emp_id=''
}

function self_declaration_clear(){
	$('#arrival_date').val('')
	$('#date').val('')
	$('input[name="visit"]').prop('checked', false);
	$('#country_visit_detail').val('')
	$('input[name="Coughing"]').prop('checked', false);
	$('input[name="running_nose"]').prop('checked', false);
	$('input[name="fever"]').prop('checked', false);
	$('input[name="sore_throat"]').prop('checked', false);
	$('input[name="headache"]').prop('checked', false);
	$('#symptoms_details').val('');
	$('input[name="travelling"]').prop('checked', false);
	global_emp_id=''
}

function AddEmployeeClear(){
		$('#full_name').val('')
		$('#family_name').val('')
		$('#designation').val('')
		$('#gender').val('').trigger("change.select2");
		$('#date_of_birth').val('')
		$('#country_of_birth').val('').trigger("change.select2");
		$('#application_date').val('')
		$('#phone_number').val('')
		$('#location').val('')
		$('#citizenship').val('')
		$('#nationality').val('')
		$('#address').val('')
		$('#marital_status').val('').trigger("change.select2");
		$('#passport_no').val('')
		$('#expiry_date').val('')
		$('#occupation').val('')
		$('#passport_issue_date').val('')
		$('#passport_issue_place').val('')
		$('#passport_issue_authority').val('')
		$("#add_candidate").show();
		$("#update_candidate").hide();
		$("#delete_candidate").hide();
		global_emp_id=''
	
}

function MedicalExaminationFormClear(){
	$('#family_illness_detail').val('')
    $('#family_illness_tb_detail').val('')
    $('#family_mental_illness_detail').val('')
	$('#required_medical_attention').val('')
	$('#family_physical_disability_detail').val('')
	global_emp_id=''
}

function EntryPermitClear()
{
	    $('input[name="PurposePng"]').prop('checked', false)
		$('#stayPng').val('')
		$('input[name="stayPngtype"]').prop('checked', false)
		$('#Name_of_Vessel').val('')
		$('#Place_Departure_to_png').val('')
		$('#Date_Departure_to_png').val('')
		$('#Place_Arrival_in_png').val('')
		$('#Date_arrival_in_png').val('')
		$('input[name="purposeemployment"]').prop('checked', false)
		$('input[name="fundstaypng"]').prop('checked', false)
		$('#Family Name').val('')
		$('#Given Names').val('')
		$('#previous_Date_of_Birth').val('')
		$('#sex').val('')
		$('#Marital_Status').val('')
		$('#country_of_issue').val('')
		$('#Passport_Number').val('')
		$('#Passport_Expiry_Date').val('')
		$('#Organisational_Name').val('')
		$('#Agent').val('')
		$('#Contact_Address_Number_and_Street_organization').val('')
		$('#Town').val('')
		$('#Given_Names').val('')
		$('#previous_FamilyName').val('')
		$('#State_Province').val('')
		$('#Postcode').val('')
		$('#organisational_country').val('')
		$('#Business_Telephone').val('')
		$('#Facsimile').val('')
		$('input[name="preVstPng"]').prop('checked', false);
		$('#pngvisitDate').val('')
		$('#Purpose_of_visit').val('')
		$('#duration_of_visit').val('')
		$('#adress_during_stay').val('')
		$('input[name="criminal"]').prop('checked', false);
		$('#nature_of_offence').val('')
		$('input[name="refused"]').prop('checked', false);
		$('#details').val('')
		$('input[name="health"]').prop('checked', false);
		$('#healthdetails').val('')
		$('#Number_and_Street').val('')
		$('#resi_Town').val('')
		$('#State').val('')
		$('#resi_Postcode').val('')
		$('#residental_country').val('')
		$('#Home_Telephone').val('')
		$('#Mobile Telephone').val('')
		$('#email_address').val('')
		$('input[name="emailVe"]').prop('checked', false);
		$('#png_Number_and_Street').val('')
		$('#Town_Village').val('')
		$('#Province').val('')
		$('#Postal_Address').val('')
		$('#png_Home_Telephone').val('')
		$('#png_Mobile_Telephone').val('')
		$('#em_Family_Name').val('')
		$('#em_Given_Names').val('')
		$('#Relationship_to_Applicant').val('')
		$('#em_Contact_Address_Number_and_Street_organization').val('')
		$('#em_Suburb_Town').val('')
		$('#em_State_Province').val('')
		$('#em_Postcode').val('')
		$('#em_country').val('')
		$('#Mobile_Telephone').val('')
		$('#em_Home_Telephone').val('')
		$('#em_Mobile_Telephone').val('')
		$('#emergencontactDate').val('')
		global_emp_id=''
}

//===========================>>>>>>>>>>>>>>>>>>>>>>>>>    form validation

$('#employee_info_validation_form').validate({
	rules : {
		full_name : {required: true},
		family_name : {required: true},
		designation : {required: true},
		gender : {required: true,},
		date_of_birth : {required: true},
		country_of_birth : {required: true},
		application_date : {required: true},
		phone_number : {required: true},
		citizenship : {required: true},
		nationality : {required: true},
		address : {required: true},
		marital_status : {required: true},
		passport_no : {required: true},
		expiry_date : {required: true},
		occupation : {required: true},
		passport_issue_date : {required: true},
		passport_issue_place : {required: true},
		passport_issue_authority : {required: true},

	},
	messages : {
		full_name : {required: "Enter Name",},
		family_name : {required: "Enter Family Name",},
		designation : {required: "Enter Designation"},
		gender : {required: "Select Gender"},
		date_of_birth : {required: "Select Date of Birth"},
		country_of_birth : {required: "Select Country"},
		application_date : {required: "Select Application Date"},
		phone_number : {required: "Enter Phone Number"},
		citizenship : {required: "Enter Citizenship"},
		nationality : {required: "Enter Nationality"},
		address : {required: "Enter Address"},
		marital_status : {required: "Select Marital Status"},
		passport_no : {required: "Enter Passport no"},
		expiry_date : {required: "Select Expiry Date"},
		occupation : {required: "Enter Occupation"},
		passport_issue_date : {required: "Select Passport Issue Date"},
		passport_issue_place : {required: "Enter Passport Issue Place"},
		passport_issue_authority : {required: "Enter Passport Issue Authority"},

	},
	errorElement: 'div',
	errorPlacement: function(error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
		var elem = $(element);
		if (elem.hasClass("select2-hidden-accessible")) {
			element = $("#select2-" + elem.attr("id") + "-container").parent(); 
			error.insertAfter(element);
		} else {
			error.insertAfter(element);
		}
	},
});


// Self Declaration Corona Virus Form
$('#self_declaration_validation_form').validate({
	rules : {
		arrival_date : {required: true},
		date : {required: true},
		visit :  {required: function(element){
			return $("input[name='visit']").click(function(){
				if($("#visityes").is(":checked")){
					$("#country_visit_detail").removeAttr("disabled");
					document.getElementById('visitdetails_val').innerHTML = "Enter Details"
					$("#visitdetails_val").show()
					$("#country_visit_detail").val("")
				}else{
					$("#country_visit_detail").attr("disabled", "disabled");
					$("#visitdetails_val").hide()
					$("#country_visit_detail").val("")
				}
			})
		}},
		country_visit_detail : {required: true},
		
		// symptoms
		Coughing : {required: function(element){
			return $("input[name='Coughing']").click(function(){
				if($("#yes").is(":checked")){
					$("#symptoms_details").removeAttr("disabled");
					document.getElementById('symptomsdet_val').innerHTML = "Enter Details"
					$("#symptomsdet_val").show()
					$("#symptoms_details").val("")
				}else{
					$("#symptoms_details").attr("disabled", "disabled");
					$("#symptomsdet_val").hide()
					$("#symptoms_details").val("")
				}
			})
		}},
		running_nose : {required: function(element){
			return $("input[name='running_nose']").click(function(){
				if($("#nyes").is(":checked")){
					$("#symptoms_details").removeAttr("disabled");
					document.getElementById('symptomsdet_val').innerHTML = "Enter Details"
					$("#symptomsdet_val").show()
					$("#symptoms_details").val("")
				}else{
					$("#symptoms_details").attr("disabled", "disabled");
					$("#symptomsdet_val").hide()
					$("#symptoms_details").val("")
				}
			})
		}},
		fever : {required: function(element){
			return $("input[name='fever']").click(function(){
				if($("#fyes").is(":checked")){
					$("#symptoms_details").removeAttr("disabled");
					document.getElementById('symptomsdet_val').innerHTML = "Enter Details"
					$("#symptomsdet_val").show()
					$("#symptoms_details").val("")
				}else{
					$("#symptoms_details").attr("disabled", "disabled");
					$("#symptomsdet_val").hide()
					$("#symptoms_details").val("")
				}
			})
		}},
		sore_throat : {required: function(element){
			return $("input[name='sore_throat']").click(function(){
				if($("#tyes").is(":checked")){
					$("#symptoms_details").removeAttr("disabled");
					document.getElementById('symptomsdet_val').innerHTML = "Enter Details"
					$("#symptomsdet_val").show()
					$("#symptoms_details").val("")
				}else{
					$("#symptoms_details").attr("disabled", "disabled");
					$("#symptomsdet_val").hide()
					$("#symptoms_details").val("")
				}
			})
		}},
		headache : {required: function(element){
			return $("input[name='headache']").click(function(){
				if($("#hyes").is(":checked")){
					$("#symptoms_details").removeAttr("disabled");
					document.getElementById('symptomsdet_val').innerHTML = "Enter Details"
					$("#symptomsdet_val").show()
					$("#symptoms_details").val("")
				}else{
					$("#symptoms_details").attr("disabled", "disabled");
					$("#symptomsdet_val").hide()
					$("#symptoms_details").val("")
				}
			})
		}},

		symptoms_details : {required: true},
		travelling : {required: true},
	},
	messages : {
		arrival_date : {required: "Select Date"},
		date : {required: "Select Date"},
		visit : {required: "Choose any one Option"},
		country_visit_detail : {required: "Enter Details"},
		// symptoms
		Coughing : {required: "Choose any one Option"},
		running_nose : {required: "Choose any one Option"},
		fever : {required: "Choose any one Option"},
		sore_throat : {required: "Choose any one Option"},
		headache : {required: "Choose any one Option"},

		symptoms_details : {required: "Enter Details"},
		travelling : {required: "Choose any one Option"},
	},
	// errorElement: 'span',
	errorPlacement: function(error, element) {
		if (element.attr("name") == "visit" || element.attr("name") == "Coughing" || element.attr("name") == "running_nose" 
			|| element.attr("name") == "fever" || element.attr("name") == "sore_throat" || element.attr("name") == "headache") {
		   error.insertAfter(".error");
		} else {
		   error.insertAfter(element);
		}
		var elem = $(element);
		if (elem.hasClass("select2-hidden-accessible")) {
			element = $("#select2-" + elem.attr("id") + "-container").parent(); 
			error.insertAfter(element);
		} else {
			error.insertAfter(element);
		}
	},
})


// Medical Examiantion Form
$('#medicalExamination_validation_form').validate({
	rules : {
		family_illness_detail : {required: true},
		family_illness_tb_detail : {required: true},
		family_mental_illness_detail : {required: true},
		family_physical_disability_detail : {required: true},
		required_medical_attention : {required: true},
	},
	messages : {
		family_illness_detail : {required: "Enter Family Illness Detail"},
		family_illness_tb_detail : {required: "Enter Family Illness tb Detail"},
		family_mental_illness_detail : {required: "Enter Family Mental Illness Detail"},
		family_physical_disability_detail : {required: "Enter Family Physical Disability Detail"},
		required_medical_attention : {required: "Enter Required Medical Attention"},
	},
	errorElement: 'div',
	errorPlacement: function(error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
		var elem = $(element);
		if (elem.hasClass("select2-hidden-accessible")) {
			element = $("#select2-" + elem.attr("id") + "-container").parent(); 
			error.insertAfter(element);
		} else {
			error.insertAfter(element);
		}
	},
})


// applicationforentrypermit
$('#applicationforentrypermit_form_validation').validate({
	rules : {
		PurposePng : {required: true,},
		stayPng : {required: true,},
		stayPngtype : {required: true,},	
		Name_of_Vessel : {required: true,},	
		Place_Departure_to_png : {required: true,},	
		Date_Departure_to_png : {required: true,},	
		Place_Arrival_in_png : {required: true,},	
		Date_arrival_in_png : {required: true,},	
		purposeemployment : {required: true,},	
		fundstaypng : {required: true, },
        Organisational_Name : {required: true,},
		Agent : {required: true,},
        Contact_Address_Number_and_Street_organization : {required: true,},
        Town : {required: true,},
		State_Province : {required: true,},
		Postcode : {required: true,},
		organisational_country : {required: true,},
		Business_Telephone : {required: true,},
		Facsimile : {required: true,},
		preVstPng : {required:function(element) {
			return $("input[name='preVstPng']").click(function(){
				if($("#preVstPng1").is(":checked")){
					$("#visitdate").show()
					$("#visit").show()
					$("#durationvisit").show()
					$("#addressduration").show()
					$("#pngvisitDate").removeAttr("disabled");
					$("#Purpose_of_visit").removeAttr("disabled");
					$("#duration_of_visit").removeAttr("disabled");
					$("#adress_during_stay").removeAttr("disabled");
					document.getElementById('visitdate').innerHTML = "Enter Nature of Offence"
					document.getElementById('visit').innerHTML = "Enter Nature of Offence"
					document.getElementById('durationvisit').innerHTML = "Enter Nature of Offence"
					document.getElementById('addressduration').innerHTML = "Enter Nature of Offence"

				}
				else{
					$("#visitdate").hide()
					$("#visit").hide()
					$("#durationvisit").hide()
					$("#addressduration").hide()
					$("#pngvisitDate").attr("disabled", "disabled");
					$("#Purpose_of_visit").attr("disabled", "disabled");
					$("#duration_of_visit").attr("disabled", "disabled");
					$("#adress_during_stay").attr("disabled", "disabled");
					$("#pngvisitDate").val("")
					$("#Purpose_of_visit").val("")
					$("#duration_of_visit").val("")
					$("#adress_during_stay").val("")				
				}
				
			})
		} },
		pngvisitDate : {required: true,},
		Purpose_of_visit : {required: true,},
		duration_of_visit : {required: true,},
		adress_during_stay : {required: true,},
		criminal :  {required:function(element) {
			return $("input[name='criminal']").click(function(){
				if($("#criminal1").is(":checked")){
					$("#nature_of_offence").removeAttr("disabled");
					document.getElementById('offence').innerHTML = "Enter Nature of Offence"
					$("#offence").show()
				}
				else{
					$("#nature_of_offence").attr("disabled", "disabled");
					$("#offence").hide()
					$("#nature_of_offence").val("")
				}
				
			})
		} },
		nature_of_offence : {required: true,},
		refused : {required:function(element) {
			return $("input[name='refused']").click(function(){
				if($("#refused1").is(":checked")){
					$("#details").removeAttr("disabled");
					document.getElementById('det').innerHTML = "Enter details"
					$("#det").show()
				}
				else{
					$("#details").attr("disabled", "disabled");
					$("#det").hide()
					$("#details").val("")
				}
				
			})
		} },	
		details : {required: true,},
		health :{required:function(element) {
			return $("input[name='health']").click(function(){
				if($("#health1").is(":checked")){
					$("#healthdetails").removeAttr("disabled");
					document.getElementById('healthdet').innerHTML = "Enter Health Details"
					$("#healthdet").show()
				}
				else{
					$("#healthdetails").attr("disabled", "disabled");
					$("#healthdet").hide()
					$("#healthdetails").val("")
				}
				
			})
		}},	
		healthdetails : {required: true,},
		Number_and_Street : {required: true,},
		resi_Town : {required: true,},
		State : {required: true,},
		resi_Postcode : {required: true,},
		residental_country : {required: true,},
		Home_Telephone : {required: true,},
		Mobile_Telephone : {required: true,},
		emailVe : {required: true,},
		png_Number_and_Street : {required: true,},
		Town_Village : {required: true,},
		Province : {required: true,},
		Postal_Address : {required: true,},
		png_Home_Telephone : {required: true,},
		png_Mobile_Telephone : {required: true,},
		em_Family_Name : {required: true,},
		em_Given_Names : {required: true,},
		Relationship_to_Applicant : {required: true,},
		em_Contact_Address_Number_and_Street_organization : {required: true,},
		em_Suburb_Town : {required: true,},
		em_State_Province : {required: true,},
		em_Postcode : {required: true,},
		em_country : {required: true,},
		em_Home_Telephone : {required: true,},
		em_Mobile_Telephone : {required: true,},
		emergencontactDate : {required: true,},
	},
	messages : {
		PurposePng : { required: "Choose any one option",},
		stayPng : { required: "Enter How Long Wish to Stay",},	
		stayPngtype : { required: "Choose any one option",},	
		Name_of_Vessel : { required: "Enter Name of the Flight",},
		Place_Departure_to_png : { required: "Enter Departure to png",},	
		Date_Departure_to_png : { required: "Select Date Departure to png",},
		Place_Arrival_in_png : { required: "Enter Place Arrival in png",},		
		Date_arrival_in_png : { required: "Select Date Arrival in png",},	
		purposeemployment : { required: "Choose any option",},	
		fundstaypng : { required: "Choose any option",},
		Organisational_Name :{required: "Enter your Organisational Name",},
		Agent :{required: "Enter Agent",},
		Contact_Address_Number_and_Street_organization :{required: "Enter your Contact Address",},
		Town :{required: "Enter your Town",},
		State_Province :{required: "Enter your State",},
		Postcode :{required: "Enter Postcode",},
		organisational_country :{ required: "Select your Organisational Country",},
		Business_Telephone :{required: "Enter your Business Telephone",},
		Facsimile : { required: "Enter Facsimile",},
		preVstPng : { required: "Choose any one option",},
		pngvisitDate : { required: "Choose any one option",},
		Purpose_of_visit : { required: "Choose any one option",},
		duration_of_visit : { required: "Enter Duration of Visit"},
		adress_during_stay : { required: "Enter Address Duration of Stay"},
		criminal : { required: "Choose any one option"},
        nature_of_offence : { required: "Enter Nature of Offence",},
		refused : { required: "Choose any one option",},
        details : { required: "Enter Details"},
        health : { required: "Choose any one option",},
        healthdetails : { required: "Enter Health Details",},
        Number_and_Street : { required: "Enter Number and Street",},
        resi_Town : { required: "Enter Suburb/Town",},
        State : { required: "Enter State/Province",},
		resi_Postcode : { required: "Enter Postcode",},
		residental_country : { required: "Select Country",},
		Home_Telephone : { required: "Enter Home Telephone",},
		Mobile_Telephone : { required: "Enter Mobile Telephone",},
		emailVe : { required: "Choose any one option",},
		png_Number_and_Street : { required: "Enter Number and Street",},
		Town_Village : { required: "Enter Town/Village",},
		Province : { required: "Enter Province",},
		Postal_Address : { required: "Enter Postal Address",},
		png_Home_Telephone : { required: "Enter Home Telephone",},
		png_Mobile_Telephone : { required: "Enter Mobile Telephone",},
		em_Family_Name : { required: "Enter Family Name",},
		em_Given_Names : { required: "Enter Given Names",},
		Relationship_to_Applicant : { required: "Enter Relationship to Applicant",},
		em_Contact_Address_Number_and_Street_organization : { required: "Enter Contact Address ",},
		em_Suburb_Town : { required: "Enter Suburb town",},
		em_State_Province : { required: "Enter State Province",},
		em_Postcode : { required: "Enter Postcode",},
		em_country : { required: "Select Country",},
		em_Home_Telephone : { required: "Enter Home Telephone",},
		em_Mobile_Telephone : { required: "Enter Mobile Telephone",},
		emergencontactDate : { required: "Select Emergency Contact Date",},
	},
	errorPlacement: function(error, element) {
		if (element.attr("name") == "PurposePng" || element.attr("name") == "stayPngtype" || element.attr("name") == "purposeemployment" ||
		element.attr("name") == "preVstPng" || element.attr("name") == "criminal" || element.attr("name") == "refused" || element.attr("name") == "emailVe"){
		   error.insertAfter(".error");
		} else {
		   error.insertAfter(element);
		}
		var elem = $(element);
		if (elem.hasClass("select2-hidden-accessible")) {
			element = $("#select2-" + elem.attr("id") + "-container").parent(); 
			error.insertAfter(element);
		} else {
			error.insertAfter(element);
		}
	},
})


// work permit
$('#work_permit_application_validation').validate({
	rules: {
		application_checklist: {required:function(element) {
			return	$("#ckbCheckAll").click(function () {
						if(this.checked){
							$("input[name='application_checklist']").each(function(){
								$("input[name='application_checklist']").prop('checked', true);
								$("#application_err").hide();
							})
						}else{
							$("input[name='application_checklist']").each(function(){
								$("input[name='application_checklist']").prop('checked', false);
								$("#application_err").show();
							})
						}
				});
		}},
		work: {required: true,},
		volunteer: {required: true,},
		shortTerm: {required:true,},	 
		longTerm:{required:true,},	 
		Term:{required:true,},	 
		employee_name:{required:true,},	 
		employee_address:{required:true, },	
		telephone:{required : true,},	
		fax:{required:true,},   
		email:{required:true,},   
		division:{required:true, },
		sub_division:{required:true,},
		png_employee:{required:true},
		non_png_employee:{required:true, },
		job_title:{required:true,},
		occupation1: {required:true,},
		job_code:{required:true,},
		position_code:{required:true,},
		work_location:{required:true,},
		loca:{required:true,},
		location_details:{required:function(element) {
			return $($("input[name='loca']").click(function(){
				if($("#loca1").is(":checked")){
					$("input[name='location_details']").removeAttr("disabled")
					document.getElementById('loca_details').innerHTML = "Enter Primary Work Location Details"
					$("#loca_details").show();
				}
				else{
					$("input[name='location_details']").attr("disabled", "disabled")
					$("#loca_details").hide();
					$("input[name='location_details']").val("")
				}
			})
			)},	
		},

		reserved:{required:true,},
		advertised:{required:true,},
		ad:{required:true,},
		dependent_accompanied:{required:true,},	
		dependent_accompany_count:{ required: function(element) {
			return $($("input[name='dependent_accompanied']").click(function(){
				if($("#accompanied1").is(":checked")){
					$("#dependent_accompany_count").removeAttr("disabled");
					document.getElementById('input_box1').innerHTML = "Enter Employee be Accompanied by Dependents"
					$("#input_box1").show();
				}
				else{
					$("#dependent_accompany_count").attr("disabled", "disabled")
					$("#input_box1").hide();
					$("#dependent_accompany_count").val("")
				}
				
			})
			)},	
		},
		work_permit_holder:{required:true,},
		permit_no:{required:function(element) {
			return	$("input[name='work_permit_holder']").click(function(){
					if($("#employeede1").is(":checked")){
						$("#permit_no").removeAttr("disabled");
						document.getElementById('workpermitno').innerHTML = "Enter Permit Number"
						$("#workpermitno").show();
					}
					else{
						$("#permit_no").attr("disabled", "disabled")
						$("#workpermitno").hide();
						$("#permit_no").val("") 

					}

				})
		} },
		training_institution1:{required:true, },
		from_duration1:{required:true,},
		to_duration1:{required: true,},
		qualification1:{required:true,},
		training_institution2:{required:true,},
		from_duration2:{required:true, },
		to_duration2:{required:true, },
		qualification2:{required:true,},
		emp_location1:{required:true,},
		industry1:{required:true, },
		from_duration3:{required:true,},
		to_duration3:{required:true,},
		occupation2:{required:true,},
		emp_location2:{required:true,},
		industry2:{required:true,},
		from_duration4:{required:true,},
		to_duration4:{required:true,},
		occupation3:{required:true,},
		origin_country:{required: true},
		city:{required:true,},
		english_speaking:{required:function(element) {
			$("input[name='english_speaking']").click(function(){
				if($("#designated2").is(":checked")){
					$("input[name='language_proficiency']").removeAttr("disabled");
					$("#langprofi").show();
				}
				else{
					$("input[name='language_proficiency']").attr("disabled", "disabled")
					$("input[name='edu_institute']").attr("disabled", "disabled")
					$("input[name='test_date']").attr("disabled", "disabled")
					$("input[name='result']").attr("disabled", "disabled")
					$("input[name='alternative_proof']").attr("disabled", "disabled")
					$("#edu_institute").val("")
					$("#test_date").val("")
					$("#result").val("")
					$("#alternative_proof").val("")
					$("#langprofi").hide()
					$("#institute").hide()
					$("#test_date_input").hide()
					$("#res").hide()
					$("#alternative_proof_textbox").hide()
				}
				
			})
		} },	

		language_proficiency:{required:function(element) {
			$("input[name='language_proficiency']").click(function(){
				if($("#English").is(":checked")){
					$("#edu_institute").removeAttr("disabled");
					$("#test_date").removeAttr("disabled");
					$("#result").removeAttr("disabled");
					$("#alternative_proof").attr("disabled", "disabled")
					$("#institute").show();
					$("#res").show();
					$("#test_date_input").show()
					$("#alternative_proof").val("")
				}
				else{
					$("#edu_institute").attr("disabled", "disabled")
					$("#test_date").attr("disabled", "disabled")
					$("#result").attr("disabled", "disabled")
					$("#alternative_proof").removeAttr("disabled")
					$("#alternative_proof_textbox").show()
					$("#institute").hide();
					$("#res").hide();
					$("#test_date_input").hide()
					$("#edu_institute").val("")
					$("#test_date").val("")
					$("#result").val("")
				}
				
			})
		} },				

		edu_institute:{required:true,},
		test_date:{required:true, },
		result:{required:true, },
		alternative_proof: {  required:true,  },
		salary: {required:true,},
		non_salary:{required:true,},
		total_salary:{required:true,},   	   
	 },
	//For custom messages
	messages: {
		 application_checklist:{required:"Choose all Application Checklist",},
		 work: {required: "Choose any one Option",},
		 volunteer: {required: "Choose any one Option",},
		 shortTerm: {required: "Choose any one Option", },
		 longTerm: {required: "Choose any one Option",},
		 Term:  {required: "Choose any one Option",},
		 employee_name: {required: "Enter Employee Name",},
		 employee_address: {required: "Enter Employee Address",},
		 telephone: {required: "Enter Telephone Number",},
		 fax: {required: "Enter Valid Fax Number", },
		 email: {required: "Enter Valid Email Id", },
		 division: {required: "Enter Industrial Division", },
		 sub_division: {required: "Enter Industrial Subdivision"},
		 png_employee: {required: "No of png Employee Should be in Number",},
		 non_png_employee: {required: "No of non-png Employee Should be in Number",},
		 job_title: {required: "Enter the Job Title",},
		 occupation1: {required: "Enter Occupation",},
		 job_code: {required: "Enter Job Code ",},
		 position_code: {required: "Enter Position Code",},
		 work_location: {required: "Enter Work Location", },
		 loca: {required: "Choose any one Option",},
		 location_details: {required: "Enter Primary Work Location Details",},
		 reserved: {required: "Choose any one Option",},
		 advertised: {required: "Choose any one Option",},
		 ad: {required: "Choose any Option"},
		 dependent_accompanied: {required: "Choose any one Option",},
		 dependent_accompany_count: {required: "Enter Employee be Accompanied by Dependents", },
		 work_permit_holder: {required: "Choose any one Option",},
		 permit_no: {required: "Enter Permit Number",},
		 training_institution1: {required: "Enter Training Institution",},
		 from_duration1: {required: "Select From Duration",},
		 to_duration1: {required: "Select to Duration",},
		 qualification1: {required: "Enter Qualification", },
		 training_institution2: {required: "Enter Training Institution",},
		 from_duration2: {required: "Select From Duration",},
		 to_duration2: {required: "Select to Duration",},
		 qualification2: {required: "Enter Qualification",},
		 emp_location1: {required: "Enter Employee Location", },
		 industry1: {required: "Entry Industry",},
		 from_duration3: {required: "Select From Duration",},
		 to_duration3: {required: "Select to Duration"},
		 occupation2: {required: "Enter Occupation",},
		 emp_location2: {required: "Enter Employee Location",},
		 industry2: {required: "Entry Industry", },
		 from_duration4: {required: "Select From Duration",},
		 to_duration4: {required: "Select to Duration",},
		 occupation3: {required: "Enter Occupation", },
		 origin_country: {required: "Select Origin Country", },
		 city: {required: "Enter City", },
		 english_speaking: {required: "Choose any one Option",},
		 language_proficiency: {required: "Choose any one Option",},
		 edu_institute: {required: "Enter Education Institute",},
		 test_date: {required: "Select Test Date",},
		 result: {required: "Enter Result",},
		 alternative_proof: {required: "Enter Alternative Proof",},
		 salary: {required: "Enter Salary",},
		 non_salary: {required: "Enter Non Salary",},
		 total_salary: {required: "Enter Total Salary",},
	 },
	 errorPlacement: function(error, element) {
		if (element.attr("name") == "work" || element.attr("name") == "volunteer" || element.attr("name") == "shortTerm" 
			|| element.attr("name") == "longTerm" || element.attr("name") == "loca" || element.attr("name") == "reserved" 
			|| element.attr("name") == "advertised" || element.attr("name") == "ad" || element.attr("name") == "dependent_accompanied"
			|| element.attr("name") == "work_permit_holder" || element.attr("name") == "english_speaking" || element.attr("name") == "language_proficiency"
			|| element.attr("name") == "test_date"){
		   error.insertAfter(".error");
		} else {
		   error.insertAfter(element);
		}
		var elem = $(element);
		if (elem.hasClass("select2-hidden-accessible")) {
			element = $("#select2-" + elem.attr("id") + "-container").parent(); 
			error.insertAfter(element);
		} else {
			error.insertAfter(element);
		}
	},
});
 

	  
// }

$('#from_duration1,#to_duration1').change(function(){
  	var StartDate = $("#from_duration1").val();
  	var EndDate= $("#to_duration1").val();
  	if(StartDate > EndDate){
		console.log("entered")
  		$("#date_validation1").text("From date must greater than two date")
		$('#to_duration1').val('')
  	}else{
		$("#date_validation1").text('')
		return false;
	}
});

$('#to_duration1').change(function(){
	var StartDate = $("#from_duration1").val();
	if(!StartDate){
		$('#to_duration1').val("");
		$('#date_validation1').text('Select From Date First');	
		
	}
})


$('#from_duration2,#to_duration2').change(function(){
	var StartDate = $("#from_duration2").val();
	var EndDate= $("#to_duration2").val();
	if(StartDate > EndDate){
		$("#date_validation2").text("From date must greater than two date")
	  $('#to_duration2').val('')
	  }else{
		$("#date_validation2").text('')
		return false;
	}
});
$('#to_duration2').change(function(){
	var StartDate = $("#from_duration2").val();
	if(!StartDate){
		$('#to_duration2').val("");
		$('#date_validation2').text('Select From Date First');	
		
	}
})


$('#from_duration3,#to_duration3').change(function(){
	var StartDate = $("#from_duration3").val();
	var EndDate= $("#to_duration3").val();
	if(StartDate > EndDate){
		$("#date_validation3").text("From date must greater than two date")
	  	$('#to_duration3').val('')
		
	  }else{
		$("#date_validation3").text('')
		return false;
	}
});

$('#to_duration3').change(function(){
	var StartDate = $("#from_duration3").val();
	if(!StartDate){
		$('#to_duration3').val("");
		$('#date_validation3').text('Select From Date First');	
		
	}
})


$('#from_duration4,#to_duration4').change(function(){
	var StartDate = $("#from_duration4").val();
	var EndDate= $("#to_duration4").val();
	if(StartDate > EndDate){
		$("#date_validation4").text("From date must greater than two date")
	  	$('#to_duration4').val('')
		
	  }else{
		$("#date_validation4").text('')
		return false;
	}
});
$('#to_duration4').change(function(){
	var StartDate = $("#from_duration4").val();
	if(!StartDate){
		$('#to_duration4').val("");
		$('#date_validation4').text('Select From Date First');	
		
	}
})


