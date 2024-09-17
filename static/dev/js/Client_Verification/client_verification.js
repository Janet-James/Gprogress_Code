var globalRatingValue;
var entityTypeId;
var id;


$(document).ready(function(){
    $("#loading").hide();
    var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    entityTypeId= urlParts[5];
    id = urlParts[6];
    Get_Service_Desk()
    $('#status').val('');
    $('#priority').val('');
    $("#customer_feedback").click(function() {
        var valarea = $(this);
        valarea.focus(); // Set focus on the valarea
        valarea[0].setSelectionRange(0, 0); // Set the selection range at the beginning
    });
})

function Get_Service_Desk(){
    console.log("Dynamic ID:",entityTypeId);
    console.log("ID:", id);

    $.ajax({
        url: "/service_desk/client_verification_get/" + entityTypeId + "/" + id + "/",
        method: "get",
        data: { format: 'json' },  // Include the format=json query parameter
        dataType: 'json',
        success: function (data) {
            var client_verification_list = data.client_verification_list
            console.log("service get by id",client_verification_list)
            Object.keys(client_verification_list).forEach(function (values,index) {
                var client_verification_data = client_verification_list[values]
                var item_id = client_verification_data.item_id
                var title = client_verification_data.title
                var client_representative = client_verification_data.client_representative
                if(client_representative == ''){
                    $('#client_representative').remove()
                }
                else{
                    $('#client_representative').val(client_representative)
                }
                var reported_on = client_verification_data.reported_on
                var dateTimeParts = reported_on.split("T");
                var datePart = dateTimeParts[0];
                var timeAndTimeZonePart = dateTimeParts[1].split("+");
                var timePart = timeAndTimeZonePart[0];
                var date = new Date(datePart + "T" + timePart);
                var dd = String(date.getDate()).padStart(2, '0'); 
                var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                var yyyy = date.getFullYear();
                var hh = date.getHours();
                var min = String(date.getMinutes()).padStart(2, '0');
                var ampm = hh >= 12 ? 'pm' : 'am';
                hh = hh % 12;
                hh = hh ? hh : 12;
                var formatted_reported_on_DateTime = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + min + ' ' + ampm;
                var answered_on = client_verification_data.answered_on
                var dateTimeParts = answered_on.split("T");
                var datePart = dateTimeParts[0];
                var timeAndTimeZonePart = dateTimeParts[1].split("+");
                var timePart = timeAndTimeZonePart[0];
                var date = new Date(datePart + "T" + timePart);
                var dd = String(date.getDate()).padStart(2, '0'); 
                var mm = String(date.getMonth() + 1).padStart(2, '0'); // Get the month with leading zero
                var yyyy = date.getFullYear();
                var hh = date.getHours();
                var min = String(date.getMinutes()).padStart(2, '0');
                var ampm = hh >= 12 ? 'pm' : 'am';
                hh = hh % 12;
                hh = hh ? hh : 12; // 12-hour time format 
                var formatted_answered_on_DateTime = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + min + ' ' + ampm;             
                var resolved_on = client_verification_data.resolved_on
                var dateTimeParts = resolved_on.split("T");
                var datePart = dateTimeParts[0];
                var timeAndTimeZonePart = dateTimeParts[1].split("+");
                var timePart = timeAndTimeZonePart[0];
                var date = new Date(datePart + "T" + timePart);
                var dd = String(date.getDate()).padStart(2, '0'); 
                var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                var yyyy = date.getFullYear();
                var hh = date.getHours();
                var min = String(date.getMinutes()).padStart(2, '0');
                var ampm = hh >= 12 ? 'pm' : 'am';
                hh = hh % 12;
                hh = hh ? hh : 12; 
                var formatted_resolved_on_DateTime = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + min + ' ' + ampm;        
                var issue_title = client_verification_data.issue_title
                var issue_description = client_verification_data.issue_description
                var status_map={
                    "1850": "Open",
                    "1852": "Answered",
                    "1854": "Resolved",
                    "1856": "Verified",
                    "1858": "Closed",
                    "1860": "Reopen",
                }
                var status = client_verification_data.status
                var priority_map = {
                    "1862": "Critical",
                    "1836": "High",
                    "1838": "Medium",
                    "1840": "Low",               
                }
                var priority = client_verification_data.priority
                var project = client_verification_data.project_site
                var client_name=client_verification_data.client_name 
                var company_list = client_verification_data.company_name_list
                var project_list = client_verification_data.project_list
                var company = false;
                company_list.forEach(function(company_data){
                    var company_id = company_data.company_id
                    var company_name = company_data.company_name
                    if(company_id == client_name){
                        company=true;
                        $('#client_name').val(company_name)
                        return false;
                        }                   
                })
                if (!company) {
                    $("#client_name").val("Not Found")
                }
                var found = false;
                project_list.forEach(function (values) {
                    var project_id = values.project_id;
                    var project_name = values.project_name;
                    var project_code = values.project_code;
                    if(project_id == project){ 
                        found = true;                   
                        $('#project_site').val(project_name)
                        $('#project_code').val(project_code)
                        return false;
                        }  
                })
                if (!found) {
                    $('#project_site_div').remove();
                    $('#project_code_div').remove();
                }                            
                $('#service_call_no').val(title)
                $("#reported_on").val(formatted_reported_on_DateTime)
                $('#answered_on').val(formatted_answered_on_DateTime)
                $('#resolved_on').val(formatted_resolved_on_DateTime)
                $('#issue_title').val(issue_title)
                $('#issue_description').val(issue_description)
                $("#status").val((status_map[status] || "Unknown"));
                $("#priority").val((priority_map[priority] || "Unknown"));
        
    }
    )}
})
}
    
    
$('.customer_rating').on('click', function() {
    globalRatingValue = $(this).data('value');
})


function ClientVerificationSubmit() {
    var currentDate = new Date();
    var isoDateString = currentDate.toISOString();
    var timezoneOffset = currentDate.getTimezoneOffset();
    var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var verified_person_name = $('#verified_person_name').val();
    var customer_issue = $('select#customer_issue').val();
    var customer_feedback = $('#customer_feedback').val();
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    var submitBtn = $('#submitBtn');
    if (!verified_person_name || !customer_issue) {
        Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Please filled the manditory fields.'
        });
        return;
    }
    submitBtn.prop('disabled', true);
    submitBtn.css('cursor', 'not-allowed');
    $.ajax({
        url: '/service_desk/submit_client_verification/',
        type: 'post',
        data: {
            "date": isoDateString,
            "timezoneOffset": timezoneOffset,
            "browserTimezone": browserTimezone,
            "verified_person_name": verified_person_name,
            "customer_issue": customer_issue,
            "customer_feedback": customer_feedback,
            "customer_ratings": globalRatingValue,
            "entityTypeId": entityTypeId,
            "item_id": id,
            "verified_source": "1904",
            csrfmiddlewaretoken: csrf_data
        },
    }).done(function (json_data) {
        data = JSON.parse(json_data);
        if (data.Code === "001") {
            Lobibox.notify('success', {
                position: 'top right',
                msg: 'Updated Successfully'
            });
            ClientVerificationReset();
        } else if (data.Code === "002") {
            Lobibox.notify('warning', {
                position: 'top right',
                msg: 'Already Verified'
            });
        }
    });
}

function ClientVerificationReset(){
    $('#verified_person_name').val('');
    $('#customer_feedback').val('');
    $('#customer_ratings').val('');
    $('select#customer_issue').val('');
    $('#submitBtn').prop('disabled', false);
    $('#submitBtn').css('cursor', 'pointer');
}