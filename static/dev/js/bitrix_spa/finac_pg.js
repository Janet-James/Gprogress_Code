$(document).ready(function(){
	$("#loading").hide();
})

$(document).ready(function() {
    $.ajax({
        url: '/get_spa_list/',
        type: 'get',
    }).done(function(json_data) {
        var data = JSON.parse(json_data);
        console.log(json_data.status);
        var spa_list = data.data;

        if (data['status'] == 1) {
            var Fieldwrapper = $('.list_of_spa');
            var selectHTML = '<select id="firstDropdown" class="form-control select2">' +
                '<option selected>---Select---</option>';

            for (var i = 0; i < spa_list.length; i++) {
                selectHTML += '<option value="' + spa_list[i].entitytypeid + '">' + spa_list[i].name + '</option>';
            }

            selectHTML += '</select>';
            $(Fieldwrapper).append(selectHTML);

            // $("#firstDropdown").select2({
            //     placeholder: "-Choose SPA-",
            //     width: '100%',
            //     });

            // second dropdown
            $('#firstDropdown').on('change', function() {
                var selectedValue = $(this).val();
                console.log("ssss", selectedValue);
                var csrf_data = $("input[name=csrfmiddlewaretoken]").val();

                $.ajax({
                    url: '/get_filter_pipeline/',
                    type: 'post',
                    data: { 'entitytypeid': selectedValue },
                    csrfmiddlewaretoken: csrf_data

                }).done(function(response) {
                    var data = JSON.parse(response);
                    var filter_pipeline = data.data;
                    console.log("ppppp", filter_pipeline)

                    var classappend = $('.pipeline');
                    classappend.empty();

                    var HTML = '<label>Choose Pipeline<span class="asterisk">*</span></label>'+
                        '<p style="margin-top: 3%;"><select id="secondDropdown" class="form-control select2">' +
                        '<option selected>---Select---</option></p>';

                    for (var j = 0; j < filter_pipeline.length; j++) {
                        HTML += '<option value="' + filter_pipeline[j].id + '">' + filter_pipeline[j].name + '</option>';
                    }

                    HTML += '</select>';

                    if(selectedValue == 144){
                        HTML += '<div class="col-md-12 col-sm-10 pull-right">'+
                        '<div class="pull-right group-btn-sec conform-sec">'+
                        '<button type="button" class="btn btn-success btn-eql-wid btn-animate"id="" onclick="Add_Finac_PG_Items()">insert</button></div></div>'			
                    }
                    else if(selectedValue == 163){
                        HTML += '<div class="col-md-12 col-sm-10 pull-right">'+
                        '<div class="pull-right group-btn-sec conform-sec">'+
                        '<button type="button" class="btn btn-success btn-eql-wid btn-animate"id="" onclick="Add_Finac_IN_Items()">insert</button></div></div>'
                    }
                    else if(selectedValue == 136){
                        HTML += '<div class="col-md-12 col-sm-10 pull-right">'+
                        '<div class="pull-right group-btn-sec conform-sec">'+
                        '<button type="button" class="btn btn-success btn-eql-wid btn-animate"id="" onclick="Add_Scm_PG_Items()">insert</button></div></div>'
                    }

                    classappend.append(HTML);

                    // $("#secondDropdown").select2({
                    //     placeholder: "-Choose Pipeline-",
                    //     width: '100%',
                    // });
                });
            });
        }
    });
});

function Add_Finac_PG_Items(){
    alert("Finac PG")
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: '/add_finac_pg_items/',
        type: 'post',
        csrfmiddlewaretoken: csrf_data
    }).done(function(json_data){
        data = JSON.parse(json_data)
        alert("click ok")
        console.log(data)
    })
}

function Add_Finac_IN_Items(){
    alert("Finac IN")
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: '/add_finac_in_items/',
        type: 'post',
        csrfmiddlewaretoken: csrf_data
    }).done(function(json_data){
        data = JSON.parse(json_data)
        alert("click ok")
        console.log(data)
    })
}

function Add_Scm_PG_Items(){
    alert("Scm PG")
	var	csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: '/add_scm_pg_items/',
        type: 'post',
        csrfmiddlewaretoken: csrf_data
    }).done(function(json_data){
        data = JSON.parse(json_data)
        alert("click ok")
        console.log(data)
    })
}