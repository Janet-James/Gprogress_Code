var global_parent_task_sequence = ''

$(document).ready(function() {
    $("#loading").hide();

    //main task
    $("#project_list").change(function() {
        clearData()
        var parent_task_id = $("#project_list").val();
        console.log("selected valuee",parent_task_id)
        var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: '/task/main_project_list/',
                type: 'post',
                data: { 'selectedValue': parent_task_id },
                csrfmiddlewaretoken: csrf_data
            }).done(function(json_data) {
                var data = JSON.parse(json_data);
                console.log("dataaaaaaaa",data)
                var parent_id = data.data;
                console.log("---------", parent_id)

                var classappend = $('.pipeline');
                classappend.empty();

                var PARENT_HTML = `<div class="col-md-4">
                <div class="form-group">
                <label>Choose Task<span class="asterisk">*</span></label>
                <select id="secondDropdown" class="form-control select2">
                <option selected>---Select---</option>`
                for (var i = 0; i < parent_id.length; i++) {          
                    PARENT_HTML += '<option value="' + parent_id[i].id + '" data-info="'+parent_id[i].ufAuto568791689340+'">' + parent_id[i].title + '</option>'
                }
                PARENT_HTML += `</select>
                </div>
                </div>
                <div class="col-md-4">
                <div class="form-group">
                <label>Sort By<span class="asterisk">*</span></label>
                <select id="task_sort" class="form-control select2">
                <option value="title" selected>Task Title</option>
                <option value="createdDate">Created Date</option>
                </select>
                </div>
                </div>`

                classappend.append(PARENT_HTML);   


            // child task

            $('#secondDropdown,#task_sort').on('change', function() {
                clearData()
                var child_dropdown = $("#secondDropdown").val();
                var sort_type=$("#task_sort").val()
                global_parent_task_sequence =$("#secondDropdown").find(':selected').data('info')
                console.log("child_dropdown", child_dropdown);
                var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
                $.ajax({
                    url: '/task/child_project_list/',
                    type: 'post',
                    data: { 'child_dropdown': child_dropdown, 'sort_type':sort_type },
                    csrfmiddlewaretoken: csrf_data
                }).done(function(json_data) {
                    var data = JSON.parse(json_data);
                    console.log("dataaaaaaaa",data)
                    var child_id = data.data;
                    console.log("---------", child_id)

                    var classappend = $('.child_list');

                    var HTML = 
                    '<style>'+
                    '.container {'+
                    '    margin: 10px;'+
                    '    padding: 10px;'+
                    '    border: 1px solid #ddd;'+
                    '}'+
                    '.item {'+
                    '    margin: 0 0 3px;'+
                    '    padding: 10px;'+
                    '    border: 1px solid #ddd;'+
                    '    background-color: #f9f9f9;'+
                    '    cursor: move;'+
                    '}'+
                    '.subitem {'+
                    '    border: 1px solid #ddd;'+
                    '    margin-bottom: 10px;'+
                    '}'+

                    '.subitem .index{'+
                    '    padding: 10px 20px;'+
                    '    display: inline-block;'+
                    '    background: #37b152;'+
                    '    color: #fff;'+
                    '    font-size: 12px;'+
                    '    font-weight: bold;'+
                    '    letter-spacing: 1px;'+
                    '}'+

                    'span.task_title{'+
                    '    margin-left: 10px;'+
                    '}'+

                    '.dragging-over {'+
                    '    border: 1px solid #ddd;'+
                    '    background: #ebebeb;'+
                    '}'+
                    '</style>'+
                    '</head>'+
                    '<body>'+
                    '<p>'+
                    '<div class="container" id="sortable-container" ondrop="drop(event)" ondragover="allowDrop(event)">'

                    var parentIndex = global_parent_task_sequence;
                    for (var j = 0; j < child_id.length; j++) {  
                    seq=j+1
                    var formattedNumber = seq < 10 ? '0' + seq : seq;
                    var subIndex = (formattedNumber).toString();
                    console.log("INDEX_----",formattedNumber)
                    var sequence = parentIndex + '.' + subIndex;
                        HTML += '<div class="subitem" draggable="true" ondragstart="drag(event)" id="'+child_id[j]['id']+'"><span class="index">'+sequence+'</span>                            <span class="task_title">'+child_id[j].title+'</span></div>'
                    }
                    HTML += '</div>';
                    HTML += '</div>';
                    HTML += '</p>';

                    classappend.append(HTML);   

                    // $("#sortable-container").sortable();
                    $("#sortable-container").disableSelection();   

                });
            });

            })
        });    
    });

    let draggedItem = null;

    function allowDrop(event) {
        event.preventDefault();
        event.target.classList.add('dragging-over');
    }

    function drag(event) {
        draggedItem = event.target;
        event.dataTransfer.setData('text/plain', 'dragged'); // Use a constant value
    }

    function getInsertionIndex(container, clientY) {
        const items = container.querySelectorAll('.draggedItem, .subitem');
        for (let i = 0; i < items.length; i++) {
            const rect = items[i].getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (clientY < midY) {
                return i;
            }
        }
        return items.length;
    }
    
    function drop(event) {
        event.preventDefault();
        const dropZone = event.target.closest('.container');
        dropZone.classList.remove('dragging-over');
    
        if (draggedItem !== event.target) {
            const parentItem = event.target.closest('.item');
            const newIndex = getInsertionIndex(dropZone, event.clientY);
    
            if (parentItem) {
                // Append the dragged item to the parent item
                parentItem.appendChild(draggedItem);
            } else {
                // Append the dragged item to the container at the correct position
                const items = dropZone.querySelectorAll('.draggedItem, .subitem');
                if (newIndex < items.length) {
                    dropZone.insertBefore(draggedItem, items[newIndex]);
                } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    dropZone.appendChild(draggedItem);
                }
            }
        }
        // Reinitiate the index numbers
        var parentIndex = global_parent_task_sequence;
        $("#sortable-container .subitem span.index").each(function(index) {
            console.log(index)
            console.log("THIOSSSSSSSSSSS",this)
            if ($(this).hasClass("index")) {
                seq=index + 1
                    var formattedNumber = seq < 10 ? '0' + seq : seq;
                    var subIndex = (formattedNumber).toString();
                    console.log("INDEX_----",index)
                    var sequence = parentIndex + '.' + subIndex;
                console.log($(this).text(sequence));
              } else {
                console.log($(this).text());
              }
          });
    
        // generateIndex(dropZone);
    }

function clearData()
{
    global_parent_task_sequence=''
    $('.child_list').empty()
}
    
$('#update_sequence').on('click', function() {
    var dataList = []
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $("#sortable-container .subitem").each(function(index) {
        var dataDict = {};
        dataDict['task_id']=$(this).attr("id")
        dataDict['task_title']=$(this).find(".task_title").text()
        dataDict['sequence']=$(this).find(".index").text();
        dataList.push(dataDict)
    });
    console.log(dataList);
    $.ajax({
        url: '/task/sequence_update/',
        type: 'post',
        data: {'task_detail':JSON.stringify(dataList)},
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
    clearData()
    })
})
