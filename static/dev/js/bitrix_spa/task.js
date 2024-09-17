$(document).ready(function(){
	$("#loading").hide();
    $('#project_list').change(function() {

        var selectedValue = $(this).val();
        var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
        console.log("-----",selectedValue);

        $('#click_task').on('click', function() {
            $.ajax({
                url: '/task/deadline/',
                type: 'post',
                data: { 'project_id': selectedValue },
                csrfmiddlewaretoken: csrf_data
    
            }).done(function(json_data) {
                var data = JSON.parse(json_data);
                console.log(data);
                if (data.Status == "ERROR")
                {
                Lobibox.notify('error', {
                    position: 'top right',
                    msg: data.Message
                });
            }
            else if(data.Status == "GD-001")
            {
                Lobibox.notify('success', {
                    position: 'top right',
                    msg: data.Message
                });
            }
            else
            {
                Lobibox.notify('error', {
                    position: 'top right',
                    msg: "Error Occured"
                });
            }
            })
    });
})
})
