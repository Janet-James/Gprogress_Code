global_passport_copy_list=[]
global_step1_file_list=[]
global_step2_file=[]
global_step3_file_list=[]
global_step4_file=[]
global_emp_id=''
//global_url_image='http://127.0.0.1:8000//media/visa_processing/'
//global_url_image='http://gsolve1.green.com.pg/media/visa_processing/'
//global_document_url='http://gsolve1.green.com.pg/media/Visa_Employee_Document/'
 global_document_url='http://10.1.1.13:8099/media/Visa_Employee_Document/'
global_url_image='http://10.1.1.13:8099/media/visa_processing/'

function stepper_lock()
{
    $('.tab-list').removeClass('enable');
    $('.tab-list').addClass('lock');
    $('.step_image').attr('src','/static/images/lock_green.png');

}

function step1_edit()
{
	$('#step-1').removeClass('lock');
	$('#step-1').addClass('enable');
	$('#step-1 img').attr('src','/static/images/edit_green.png');
}
function step2_shift(status)
{
    if (status == 'complete')
    {
				$('#step-1').removeClass('lock');
				$('#step-1').addClass('enable'); 
				$('#step-2').removeClass('lock');
				$('#step-2').addClass('enable ');
				$('#step-2 img').attr('src','/static/images/edit_green.png');
				$('#step-1 img').attr('src','/static/images/tick_green.png');
    }
    else if (status == 'edit')
    {
        $('#step-2').removeClass('lock');
        $('#step-2').addClass('enable ');
        $('#step-2 img').attr('src','/static/images/edit_green.png');
        $('#step-1 img').attr('src','/static/images/tick_green.png');  
    }    
    else
    {
        $('#step-2').addClass('lock');
        $('#step-2').removeClass('enable');
        $('#step-2 img').attr('src','/static/images/lock_green.png');
        $('#step-1 img').attr('src','/static/images/edit_green.png'); 
    }
}

function step3_shift(status)
{
        if(status == 'complete')
        {
        $('#step-3').removeClass('lock');
		$('#step-3').addClass('enable');
		$('#step-3 img').attr('src','/static/images/edit_green.png');
		$('#step-2 img').attr('src','/static/images/tick_green.png');
        }
        else if(status == 'edit')
        {
            
        $('#step-3').addClass('lock');
		$('#step-3').removeClass('enable');
		$('#step-3 img').attr('src','/static/images/lock_green.png');
		$('#step-2 img').attr('src','/static/images/edit_green.png');
        }
        else
        {
            $('#step-3').addClass('lock');
		$('#step-3').removeClass('enable');
		$('#step-3 img').attr('src','/static/images/lock_green.png');
		$('#step-2 img').attr('src','/static/images/lock_green.png');
        }
}

function step4_shift(status)
{
    if (status == 'complete')
    {
				$('#step-4').removeClass('lock');
				$('#step-4').addClass('enable');
				$('#step-4 img').attr('src','/static/images/edit_green.png');
				$('#step-3 img').attr('src','/static/images/tick_green.png');
    }
    else if (status == 'edit')
    {
        $('#step-4').addClass('lock');
        $('#step-4').removeClass('enable');
        $('#step-4 img').attr('src','/static/images/lock_green.png');
        $('#step-3 img').attr('src','/static/images/edit_green.png');  
    }
    else{
        $('#step-4').addClass('lock');
        $('#step-4').removeClass('enable');
        $('#step-4 img').attr('src','/static/images/lock_green.png');
        $('#step-3 img').attr('src','/static/images/edit_green.png');
    }
}

$('#step4_visa_process_upload').click(function(){
    $('#step-4 img').attr('src','/static/images/tick_green.png');
});

function shift4_complete(status)
{
    if(status=='complete')
    {
    $('#step-4 img').attr('src','/static/images/tick_green.png');
    }
    else if (status=='edit'){
    $('#step-4 img').attr('src','/static/images/edit_green.png');
    }
    else
    {
        $('#step-4 img').attr('src','/static/images/lock_green.png');       
    }
}

$("#searchInput").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#overall_candidate_div div").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});

$(document).ready(function () {
    $('#overall_candidate_div').html('');
	$('.doc').hide();
	$('.validation_correct').hide();
	$('.download_eye_view').hide();
        stepper_lock();
	$.ajax({
		url: '/GSolve/employeeInfoGetall/',
		type: 'get',
	}).done(function(json_data) {
		data = JSON.parse(json_data)
		employee_data = data.data
    	// if (data['status']==1)
    	// {
	    for(i=0; i<employee_data.length;i++)
	    {
			tr='<div class="sgl_candidate_list" id="empdata_'+employee_data[i].emp_id+'">\
			<table>\
				<tr>\
					<td>Name </td>\
					<td>: '+employee_data[i].full_name+'</td>\
				</tr>\
				<tr>\
					<td>Reg. Number </td>\
					<td>: '+employee_data[i].emp_id+'</td>\
				</tr>\
				<tr>\
					<td>Designation </td>\
					<td>: '+employee_data[i].designation+'</td>\
				</tr>\
				<tr>\
					<td>Applied Date </td>\
					<td>: '+employee_data[i].application_date+'</td>\
				</tr>\
			</table>\
		</div>'
		$('#overall_candidate_div').append(tr);
	    }
    // }
    })
 })

	$(document).on('click', '#overall_candidate_div div', function(event){
        emp_data_clear();
		$(this).addClass("select").siblings().removeClass("select");
		$('.tab-list').removeClass('active')
		$('#step-pre').addClass('enable active')
		$('#step-pre').removeClass('lock')
		$('.form-visa').removeClass('show')
		$('#tab-step-pre-form').addClass('show')
		emp_id=$(this).closest('div.sgl_candidate_list').attr('id');
		global_emp_id=emp_id.split('_')[1]
		var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
		$.ajax({
			url: '/GSolve/employee_info_getby_id/',
			type: 'POST',
			data:{
				'emp_id': global_emp_id,
				csrfmiddlewaretoken: csrf_data
			}
		}).done(function(json_data){
			json_data = JSON.parse(json_data)
			if(json_data.status == 1)
			{
			data = json_data.emp_info_data[0]
			if(json_data.document_remark[0])
			{
			remarks = JSON.parse(json_data.document_remark[0].remarks)	
			$.each( remarks, function( key, value ) {
  			$('#'+key).val(value)
			});
			}
			else
			{$('.document_remarks').val('')}
			step1_images = json_data.visa_images_step1
			step1_photocopy_images = json_data.visa_images_step1_photocopy
            step2_images = json_data.visa_images_step2
            step3_images = json_data.visa_images_step3
            step4_images = json_data.visa_images_step4
			$('#full_name').val(data.full_name)
			$('#designation').val(data.designation)
			$('#visa_gender').val(data.gender)
			$('#application_date').val(data.application_date)
			$('#location').val(data.location)
            $('#work_permit_title').text("UPLOAD "+data.full_name+"'s WORK PERMIT")
            $('#visa_process_title').text(data.full_name+"'s VISA has been issued")
			console.log(step1_images)
			console.log(step1_photocopy_images)
            
			if(step1_images!=0)
			{
				clear_step1()
                if (step1_images.length == 6 && step1_photocopy_images.length!=0)
                {
                    step2_shift('complete')
                }
                else
                {
               	    step1_edit()
                   // step2_shift('edit')
                }
				for(i=0;i<step1_images.length;i++)
				{
					file=step1_images[i].file_name
					
					// const lastIndex = file.lastIndexOf('_');
					const file_id = step1_images[i].file_source
					file_data={}
					// file_data['img_str'] = base6
					file_data['format'] = step1_images[i].file_format
					file_data['file_source'] = step1_images[i].file_source
					global_step1_file_list.push(file_data)
                    toDataURL(global_url_image+file,file_id, function(dataUrl) {
                    for (i=0;i<global_step1_file_list.length;i++)
                    {
                        if (global_step1_file_list[i].file_source == file_id)
                        {
                            global_step1_file_list[i]['img_str']=dataUrl.split(',')[1]
                        }
                    }
                    })
                    console.log(global_step1_file_list)
					$('#'+file_id+'_reason').val(step1_images[i].reason);
					$('#'+file_id+'_upload_file').hide();
				    $('#'+file_id+'_uploaded_file').show();
				    $('#'+file_id+'_file_name').append('<span>'+file+'</span><i class="fa fa-times" aria-hidden="true" onclick="delete_file('+file_id+')"></i>')
				    $('#'+file_id+'_correct').show();
					$('#'+file_id+'_eye_view').show();
					$('#'+file_id+'_eye_view').html('');
					$('#'+file_id+'_eye_view').append('<a href="'+global_url_image+file+'"  target="_blank" class="link"><i class="fa fa-eye eye_view" aria-hidden="true"></i></a>' )
				    $('#'+file_id+'_incorrect').hide()
				}
			}
			else
			{
				step1_edit()
			}
			if(step1_photocopy_images.length!=0)
            {
                $('#step1_passport_copy_file_name').html('');
				clear_passport_copy()
                for(i=0;i<step1_photocopy_images.length;i++)
                    {
                        file=step1_photocopy_images[i].file_name
					console.log(file)
					// const lastIndex = file.lastIndexOf('_');
					const file_id = step1_photocopy_images[i].file_source
                    file_count='step1_passport_copy_old_'+i
					file_data={}
					// file_data['img_str'] = base6
					file_data['file_source'] = step1_photocopy_images[i].file_source
                    file_data['file_count']=file_count
                    file_data['format'] = step1_photocopy_images[i].file_format
					global_passport_copy_list.push(file_data)
                    toDataURL(global_url_image+file,file_id, function(dataUrl) {
						for (i=0;i<global_passport_copy_list.length;i++)
						{
								global_passport_copy_list[i]['img_str']=dataUrl.split(',')[1]
						}
						})
					$('#'+file_id+'_reason').val(step1_photocopy_images[i].reason);
					$('#'+file_id+'_upload_file').hide();
				    $('#'+file_id+'_uploaded_file').show();
				    $('#'+file_id+'_file_name').append('<span id="'+file_count+'" class="file_name_span"><span>'+file+'</span><i class="fa fa-times" aria-hidden="true" onclick="delete_photocopyfile('+file_count+')"></i></span>')
				    $('#'+file_id+'_correct').show();
					$('#'+file_id+'_eye_view').show();
					$('#'+file_id+'_eye_view').html('');
					$('#'+file_id+'_eye_view').append('<a href="'+global_url_image+file+'"  target="_blank" class="link"><i class="fa fa-eye eye_view" aria-hidden="true"></i></a>' )
				    $('#'+file_id+'_incorrect').hide()
					
						console.log(global_passport_copy_list)
                    }
					
            }
            else{
                $('#step1_passport_copy_file_name').html('');
            }
            if(step2_images!=0)
			{  
                step2_file=step2_images[0].file_name
                $('#work_permit_link').attr('href', '');
    			$('#work_permit_file_show').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
    			$('#step2_work_permit_download').attr('href', '');
                $('#step2_work_permit_download').attr('href', global_url_image+step2_file);
                $('#work_permit_link').attr('href', global_url_image+step2_file);
                $('#work_permit_file_show').attr('src', global_url_image+step2_file);
                
				step3_shift('complete')

			}
            if(step3_images!=0)
            {
                step3_data_load(step3_images)
                step4_shift('complete')
            }

            if(step4_images!=0)
			{  
                step4_file=step4_images[0].file_name
                $('#step4_visa_process_download').attr('href', global_url_image+step4_file);
                $('#visa_process_link').attr('href', global_url_image+step4_file);
                $('#visa_process_file_show').attr('src', global_url_image+step4_file);
                shift4_complete('complete')
			}
            if(step4_images==0)
            {
                if(step3_images==0)
                {
                step4_shift('lock')
                }
                else{
                    if (step3_images.length != 13)
                    {
                        step3_shift('complete')
                        step4_shift('lock')
                    }
                    else{
                        step3_shift('complete')
                        step4_shift('complete')
                    }
                }
            }
            if(step3_images==0)
            {
                if(step2_images==0)
                {
                step3_shift('lock')
                }
                else{
                step3_shift('complete')
                    }
            }
            if(step2_images==0)
            {
                if(step1_images==0)
                {
                    step2_shift('lock')
                }
                else
                {
                    step2_shift('edit')
                }
            }
            if(step1_images==0)
            {
                step2_shift('lock')
            }
        }
			else
			{
				Lobibox.notify('success', {

                    position: 'top right',
                    msg: "Can't Retrieve Data",
                });
			}
		})
		})

        function step3_data_load(step3_images)
        {
			clear_step3();
            if (step3_images.length == 13)
                {
                    step4_shift('complete')
                }
                else
                {
                    step4_shift('edit')
                }
            for(i=0;i<step3_images.length;i++)
            {
                file=step3_images[i].file_name
                
                // const lastIndex = file.lastIndexOf('_');
                const file_id = step3_images[i].file_source
                file_data={}
                file_data['format'] = step3_images[i].file_format
                file_data['file_source'] = step3_images[i].file_source
                global_step3_file_list.push(file_data)
                toDataURL(global_url_image+file,file_id, function(dataUrl) {
                for (i=0;i<global_step3_file_list.length;i++)
                {
                    if (global_step3_file_list[i].file_source == file_id)
                    {
                        global_step3_file_list[i]['img_str']=dataUrl.split(',')[1]
                    }
                }
                })
                console.log(global_step3_file_list)
                $('#'+file_id+'_reason').val(step3_images[i].reason);
                $('#'+file_id+'_upload_file').hide();
                $('#'+file_id+'_uploaded_file').show();
				$('#'+file_id+'_eye_view').show();
				$('#'+file_id+'_eye_view').html('');
				$('#'+file_id+'_eye_view').append('<a href="'+global_url_image+file+'"  target="_blank" class="link"><i class="fa fa-eye eye_view" aria-hidden="true"></i></a>' )
                $('#'+file_id+'_file_name').append('<span>'+file+'</span><i class="fa fa-times" aria-hidden="true" onclick="step3_delete_file('+file_id+')"></i>')
                $('#'+file_id+'_correct').show();
                $('#'+file_id+'_incorrect').hide()
            }
        }

		

        function toDataURL(url,file_id, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
              var reader = new FileReader();
              reader.onloadend = function() {
                callback(reader.result);
              }
              reader.readAsDataURL(xhr.response);
            };
            
            xhr.open('GET', url, true);
            xhr.withCredentials = false;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.responseType = 'blob';
            xhr.send();
          }
        
          function step1_passport_copy(files) {
            file_source="step1_passport_copy"
            global_passport_copy_list = global_passport_copy_list.filter(function( obj ) {
				return obj.file_source !== file_source;
			  });
            $('#'+file_source+'_file_name').html('')
            for (let index = 0; index < files.length; index++) {                
                const reader = new FileReader();
                var img_str=''
                count=0
                reader.onload = function()  {
                    file_data={}
				img_str = reader.result
            file_data['img_str'] = img_str.split(',')[1]
            file_data['format'] = $('#'+file_source).val().replace(/C:\\fakepath\\/i, '').split('.')[1];
            file_data['file_source'] = file_source
            file_data['file_count']=file_source+'_cp_'+count
            global_passport_copy_list.push(file_data)
            
            const file_name=files[index].name
            $('#'+file_source+'_upload_file').hide();
            $('#'+file_source+'_uploaded_file').show();
            $('#'+file_source+'_file_name').append('<span class="file_name_span" id='+file_source+'_cp_'+count+'><span>'+file_name+'</span><i class="fa fa-times" aria-hidden="true" onclick="delete_photocopyfile('+file_source+'_cp_'+count+')"></i></span>')
            $('#'+file_source+'_correct').show();
            $('#'+file_source+'_incorrect').hide()
            count+=1
			}
            
        
            reader.readAsDataURL(files[index]);
           
            }

            // final_file_data['passport_copy']=file_list
            // final_file_data['file_source']=file_source
            // global_passport_copy_list.push(final_file_data)
            
          }

          function delete_photocopyfile(file_span){	
			file_span=$(file_span).attr('id')
			global_passport_copy_list = global_passport_copy_list.filter(function( obj ) {
				return obj.file_count !== file_span;
			  });	
			$('#'+file_span).remove()
            
			if(global_passport_copy_list.length==0)
			{
			$('#step1_passport_copy_uploaded_file').hide()
			$('#step1_passport_copy_upload_file').show()
			$('#step1_passport_copy_correct').hide();
			$('#step1_passport_copy_incorrect').show()
			}
            else{
			$('#step1_passport_copy_uploaded_file').show()
			$('#step1_passport_copy_upload_file').hide()
			$('#step1_passport_copy_correct').show();
			$('#step1_passport_copy_incorrect').hide()
            }
}
		function step1_file_upload(image){ 
            console.log(image)
			file_source = $(image).attr('id')
			global_step1_file_list = global_step1_file_list.filter(function( obj ) {
				return obj.file_source !== file_source;
			  });
			
			var files = image.files;
			var length = image.files.length;
			file_data={}
			const file = files[0];
			const reader = new FileReader();
            if(file_source!="step1_passport_copy"){
			reader.addEventListener("load", function () {
				var img_str = reader.result
                console.log(img_str)
				file_data['img_str'] = img_str.split(',')[1]
				file_data['format'] = $('#'+file_source).val().replace(/C:\\fakepath\\/i, '').split('.')[1];
				file_data['file_source'] = file_source
				global_step1_file_list.push(file_data)
			}, false);
        }

			console.log(global_step1_file_list)
			if (file) 
			{
				reader.readAsDataURL(file);
				file_name=$('#'+file_source).val().replace(/.*(\/|\\)/, '')
				$('#'+file_source+'_upload_file').hide();
				$('#'+file_source+'_uploaded_file').show();
				$('#'+file_source+'_file_name').append('<span>'+file_name+'</span><i class="fa fa-times" aria-hidden="true" onclick="delete_file('+file_source+')"></i>')
				$('#'+file_source+'_correct').show();
				$('#'+file_source+'_incorrect').hide()
			}
		}

		function delete_file(file_source){			
            file_source=$(file_source).attr('id')
			$('#'+file_source+'_file_name').html('')
			$('#'+file_source+'_uploaded_file').hide()
			$('#'+file_source+'_upload_file').show()
			$('#'+file_source+'_correct').hide();
			$('#'+file_source+'_incorrect').show()

			global_step1_file_list = global_step1_file_list.filter(function( obj ) {
				return obj.file_source !== file_source;
			  });
            }
        

        function step3_delete_file(file_source)
		{
			file_source=$(file_source).attr('id')
			$('#'+file_source+'_file_name').html('')
			$('#'+file_source+'_uploaded_file').hide()
			$('#'+file_source+'_upload_file').show()
			$('#'+file_source+'_correct').hide();
			$('#'+file_source+'_incorrect').show()

			global_step3_file_list = global_step3_file_list.filter(function( obj ) {
                return obj.file_source !== file_source;
              });
            }

        function step3_file_upload(image){ 
			file_source = $(image).attr('id')
			global_step3_file_list = global_step3_file_list.filter(function( obj ) {
				return obj.file_source !== file_source;
			  });
			
			var files = image.files;
			var length = image.files.length;
			file_data={}
			const file = files[0];
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				var img_str = reader.result
				file_data['img_str'] = img_str.split(',')[1]
				file_data['format'] = $('#'+file_source).val().replace(/C:\\fakepath\\/i, '').split('.')[1];
				file_data['file_source'] = file_source
				global_step3_file_list.push(file_data)
			}, false);
			if (file) 
			{
				reader.readAsDataURL(file);
				file_name=$('#'+file_source).val().replace(/.*(\/|\\)/, '')
				$('#'+file_source+'_upload_file').hide();
				$('#'+file_source+'_uploaded_file').show();
				$('#'+file_source+'_file_name').append('<span>'+file_name+'</span><i class="fa fa-times" aria-hidden="true" onclick="step3_delete_file('+file_source+')"></i>')
				$('#'+file_source+'_correct').show();
				$('#'+file_source+'_incorrect').hide()
			}
		}

		function step2_file_upload(image){ 
			file_source = $(image).attr('id')
			var files = image.files;
			var length = image.files.length;
			file_data={}
			const file = files[0];
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				var img_str = reader.result
				file_data['img_str'] = img_str.split(',')[1]
				file_data['format'] = $('#'+file_source).val().replace(/C:\\fakepath\\/i, '').split('.')[1];
				file_data['file_source'] = file_source
				global_step2_file.push(file_data)
                step2_work_permit_upload(global_step2_file)
			}, false);
			if (file) 
			{
				reader.readAsDataURL(file);				
			}
			
		}

        function step4_file_upload(image){ 
			file_source = $(image).attr('id')
			var files = image.files;
			var length = image.files.length;
			file_data={}
			const file = files[0];

			const reader = new FileReader();
			reader.addEventListener("load", function () {
				var img_str = reader.result
				file_data['img_str'] = img_str.split(',')[1]
				file_data['format'] = $('#'+file_source).val().replace(/C:\\fakepath\\/i, '').split('.')[1];
				file_data['file_source'] = file_source
				global_step4_file.push(file_data)
                step4_visa_process_upload(global_step4_file)
			}, false);
			if (file) 
			{
				reader.readAsDataURL(file);
			}
		}

function VisaDocSubmit(){
	for(i=0;i<global_step1_file_list.length;i++)
	{
		global_step1_file_list[i]['reason']=$('#'+global_step1_file_list[i].file_source+'_reason').val()
	}
	pc_file_data_reason=$('#step1_passport_copy_reason').val()
	console.log(global_passport_copy_list)
	var formData = new FormData();
	formData.append('file_data', JSON.stringify(global_step1_file_list));
	formData.append('photocopy_file_data', JSON.stringify(global_passport_copy_list));
	formData.append('pc_file_data_reason', pc_file_data_reason)
	formData.append('emp_id', global_emp_id)
	if (global_step1_file_list.length === 6 && global_passport_copy_list.length!=0)
			{
				step2_shift('complete')
			}
    else{
        step2_shift('edit')

    }

	$.ajax({
		url: '/GSolve/visa_doc_info/',
		type: 'post',
		data: formData,
		cache:false,
		contentType: false,
		processData: false,

	}).done(function(json_data){
		data = JSON.parse(json_data)
		if(data.status == 1){
			
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Visa Processing Documents Uploaded'
			});
		}
		else if(data.status == 2){
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Visa Processing Documents Updated'
			});
		}
		else{
			// Lobibox.notify('error', {

			// 	position: 'top right',
			// 	msg: 'Error'
			// });
            console.log('error')
		}        
	});
return false;
}


function step2_work_permit_upload(data)
{
    	var formData = new FormData();

    formData.append('file_data', JSON.stringify(data));
	formData.append('emp_id', global_emp_id)
    formData.append('step_no', 'Step2')
    $.ajax({
		url: '/GSolve/Work_Permit_Upload/',
		type: 'post',
		data: formData,
		cache:false,
		contentType: false,
		processData: false,

	}).done(function(json_data){
		data = JSON.parse(json_data)
		if(data.status == 1 || data.status == 2){
			step2_file=data.file_name
            step3_shift('complete')
            $('#work_permit_link').attr('href', '');
    	    $('#work_permit_file_show').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
            $('#step2_work_permit_download').attr('href', '');
            $('#work_permit_link').attr('href', global_url_image+step2_file+'?' + new Date().toJSON());
            $('#work_permit_file_show').attr('src', global_url_image+step2_file+'?' + new Date().toJSON());
            $('#step2_work_permit_download').attr('href', global_url_image+step2_file+'?' + new Date().toJSON());
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Document Uploaded'
			});
            
		}
    });
	
}

function IndiaVisaProcessSubmit(){
	for(i=0;i<global_step3_file_list.length;i++)
	{
	console.log(global_step3_file_list[i].file_source)
		global_step3_file_list[i]['reason']=$('#'+global_step3_file_list[i].file_source+'_reason').val()
	}
	var formData = new FormData();
	formData.append('file_data', JSON.stringify(global_step3_file_list));
	formData.append('emp_id', global_emp_id)
	if (global_step3_file_list.length == 13)
			{
				step4_shift('complete')
			}
    else{
        step4_shift('edit')
    }

	$.ajax({
		url: '/GSolve/india_visa_process/',
		type: 'post',
		data: formData,
		cache:false,
		contentType: false,
		processData: false,

	}).done(function(json_data){
		data = JSON.parse(json_data)
		if(data.status == 1){
			
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Visa Processing Documents Uploaded'
			});
		}
		else if(data.status == 2){
			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Visa Processing Documents Updated'
			});
		}
		else{
			// Lobibox.notify('error', {

			// 	position: 'top right',
			// 	msg: 'Error'
			// });
            console.log('error')
		}        
	});
return false;
}

function step4_visa_process_upload(data)
{
    	var formData = new FormData();

    formData.append('file_data', JSON.stringify(data));
	formData.append('emp_id', global_emp_id)
    formData.append('step_no', 'Step4')
    
    $.ajax({
		url: '/GSolve/Work_Permit_Upload/',
		type: 'post',
		data: formData,
		cache:false,
		contentType: false,
		processData: false,

	}).done(function(json_data){
		data = JSON.parse(json_data)
		if(data.status == 1 || data.status == 2){
			step4_file=data.file_name
            shift4_complete('complete')
            $('#visa_process_link').attr('href', '');
            $('#visa_process_file_show').attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==')
            $('#step4_visa_process_download').attr('href', '');
            $('#visa_process_link').attr('href', global_url_image+step4_file+'?' + new Date().toJSON());
            $('#visa_process_file_show').attr('src', global_url_image+step4_file+'?' + new Date().toJSON());
	    $('#step4_visa_process_download').attr('href', global_url_image+step4_file+'?' + new Date().toJSON());
                $('#step-4 img').attr('src','/static/images/tick_green.png');

			Lobibox.notify('success', {

				position: 'top right',
				msg: 'Documents Uploaded'
			});
            
		}
    });
	
}
function clear_passport_copy()
{
	global_passport_copy_list=[]
}
function clear_step1()
{
    global_step1_file_list=[]
    $('div#tab-step-1-form div.doc').hide()
    $('div#tab-step-1-form div.validation_correct').hide()
    $('div#tab-step-1-form div.doc_up').show()
    $('div#tab-step-1-form div.validation_incorrect').show();
    $('#tab-step-1-form .reason_input').val('');
    $('#tab-step-1-form .file_name_span').html('')
}

function clear_step2()
{
    global_step2_file=[]
    $('#work_permit_link').attr('href', '');
    $('#work_permit_file_show').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
    $('#step2_work_permit_download').attr('href', '');
}

function clear_step3()
{
    global_step3_file_list=[]
    $('div#tab-step-3-form div.doc').hide()
    $('div#tab-step-3-form div.validation_correct').hide()
    $('div#tab-step-3-form div.doc_up').show()
    $('div#tab-step-3-form div.validation_incorrect').show();
    $('#tab-step-3-form .reason_input').val('');
    $('#tab-step-3-form .file_name_span').html('')
}

function clear_step4()
{
    global_step4_file=[]
    $('#visa_process_link').attr('href', '');
    $('#visa_process_file_show').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
    $('#step4_visa_process_download').attr('href', '');
}

function emp_data_clear()
{
    global_emp_id='';
    $('.emp_data').val('');
    clear_step1();
	clear_passport_copy();
    clear_step2();
    clear_step3();
    clear_step4();
}

function employee_report_download(document_type)
{
	emp_id=global_emp_id
	var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
	$.ajax({
		url: '/GSolve/employee_documents/',
		type: 'POST',
		data:{

			'emp_id': global_emp_id,
			'document_type': document_type,
			csrfmiddlewaretoken: csrf_data
		}
	}).done(function(json_data){
		data = JSON.parse(json_data)
        if(data.status=='NTE_01' || data.status=='NTE_02')
                {

                    // alert_lobibox("success", data.message);
                    if (data.file_name !=''){
                        let path = global_document_url+data.file_name
                        var file_name = '<a  title="Download Offer" id="'+document_type+'_download" class="btn btn-success btn-eql-wid btn-animate" href="'
                            + path
                            + '" download="'
                            + data.file_name
                            + '"><i class="offer_report nf nf-download"></i></a>';
                        $('#'+document_type+'_pdf_download').html(file_name);
                        //alert_lobibox("success", "Payroll Report Generated Successfully. Please wait few seconds.");
                        //setTimeout(function(){$('#payroll_report_download')[0].click(); }, 1000);
                        $('#'+document_type+'_download')[0].click();

                    }
                }
			else if (data.status == 'NO_DATA')
			{
				Lobibox.notify('error', {
					position: 'top right',
					msg: "Employee doesn't have Related Data, So Document Can't be Generated. Fill data in Employee Detail Form"
				});
			}
            })
        }
        
        
function VisaRemarkSubmit()
{
	emp_id=global_emp_id;
	remarks={}
	remarks['entry_permit_form_reason']= $("#entry_permit_form_reason").val();
	remarks['work_permit_form_reason']= $("#work_permit_form_reason").val();
	remarks['radiology_report_reason']= $("#radiology_report_reason").val();
	remarks['self_declaration_form_reason']= $("#self_declaration_form_reason").val();
	remarks['medical_examination_form_reason']= $("#medical_examination_form_reason").val();
	var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
	$.ajax({
		url: '/GSolve/employee_documents_remarks/',
		type: 'POST',
		data:{

			'emp_id': global_emp_id,
			'remarks': JSON.stringify(remarks),
			csrfmiddlewaretoken: csrf_data
		}
	}).done(function(json_data){
		data = JSON.parse(json_data)
		console.log(data)
		if(data.status=='NTE_01' || data.status=='NTE_02')
                {
                Lobibox.notify('success', {

				position: 'top right',
				msg: data.msg
			});
                }
                else
                {
                Lobibox.notify('error', {

				position: 'top right',
				msg: data.msg
			});
                }
                
});
}
