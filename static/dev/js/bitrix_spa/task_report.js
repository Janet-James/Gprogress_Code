var global_employee_id= ''
var global_employee_name=""
global_media_url='https://gprogress.green.com.pg/media/Task_Report/'
global_task_data = ''

$(document).ready(function() {
    $("#loading").hide();
    $('#task_detail_table').DataTable()

});

function taskData(employee_id,employee_name,task_status,download_type,callback)
{

    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: '/task/employee_task_list/',
                type: 'post',
                async: false, 
                data: { 'selectedValue': employee_id,'employee_name':employee_name,'task_status':task_status,'download_type':download_type },
                csrfmiddlewaretoken: csrf_data
            }).done(function(json_data) {
                data=JSON.parse(json_data)
                // console.log(data['data'])
                // task=data['data']
                callback(data);
            });
}
    //main task
    $("#employee_list,#task_status").change(function() {
        global_employee_id = $("#employee_list option:selected").val();
        global_employee_name=$("#employee_list option:selected").text()
        task_status=$("#task_status option:selected").val();
        download_type=''
        console.log("selected valuee",global_employee_id)
        taskData(global_employee_id, global_employee_name,task_status, download_type, function(data) {
            task_data=data['data']
            console.log(task_data); // Use the task_data inside this callback
            var tbody = $('#task_data');
            // Rest of your code here
            var tbody = $('#task_data');
                if ($.fn.DataTable.isDataTable('#task_detail_table')) {
                    $('#task_detail_table').DataTable().destroy();
                }
                $('#task_detail_table').DataTable({
                    data: task_data,
                    columns: [
                        { data: 'no' },
                        { data: 'task_id' },
                        { data: 'title' },
                        { data: 'createdDate' },
                        { data: 'dateStart' },
                        { data: 'closedDate' },
                        { data: 'responsible'},
                        { data: 'createdBy'},
                        { data: 'status' }
                    ]
                });
        });
    })
  

$('#download_excel').on("click", function () {
    download_type='excel'
    task_status=$("#task_status option:selected").val();
    taskData(global_employee_id,global_employee_name, task_status, download_type, function(data) {
        console.log(data)
        file=data['file_name']
        console.log(task_data); // Use the task_data inside this callback
        let path = global_media_url+file
				var file_name = '<a  title="Download Offer" id="task_excel_download" class="btn btn-success btn-eql-wid btn-animate" href="'
					+ path
					+ '" download="'
					+ file
					+ '"><i class="offer_report nf nf-download"></i></a>';
				$('#pdf_download').html(file_name);
				//alert_lobibox("success", "Payroll Report Generated Successfully. Please wait few seconds.");
				//setTimeout(function(){$('#payroll_report_download')[0].click(); }, 1000);
				$('#task_excel_download')[0].click();
    });
});

$('#download_pdf').on("click", function () {
    download_type='pdf'
    task_status=$("#task_status option:selected").val();
    taskData(global_employee_id,global_employee_name, task_status, download_type, function(data) {
        console.log(data)
        file=data['file_name']
        console.log(task_data); // Use the task_data inside this callback
        let path = global_media_url+file
				var file_name = '<a  title="Download Offer" id="task_excel_download" class="btn btn-success btn-eql-wid btn-animate" href="'
					+ path
					+ '" download="'
					+ file
					+ '"><i class="offer_report nf nf-download"></i></a>';
				$('#pdf_download').html(file_name);
				//alert_lobibox("success", "Payroll Report Generated Successfully. Please wait few seconds.");
				//setTimeout(function(){$('#payroll_report_download')[0].click(); }, 1000);
				$('#task_excel_download')[0].click();
    });
});




    
