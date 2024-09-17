var global_shipment_item_id=''
var table=''
var productselectedCheckboxIds = [];

$(document).ready(function() {
    $("#loading").hide();
    var shipment_packing_table = $('#shipment_packing_table').DataTable();
    // Enable inline editing for specific columns

    global_shipment_item_id=$('#shipment_item_id').val();
    shipment_data_load()



});

function pagination_setup()
{
     // Function to update the data table based on selected entries per page
function updateTable() {
    var entriesPerPage = parseInt($('#entriesPerPage').val());
    var totalEntries = $('.dataItem').length;
    var totalPages = Math.ceil(totalEntries / entriesPerPage);

    // Remove existing pagination links
    $('#pagination').empty();

    for (var i = 1; i <= totalPages; i++) {
     $('#pagination').append('<li><a href="#" data-page="' + i + '">' + i + '</a></li>');
    }

    // Show the first page by default
    showPage(1, entriesPerPage);
}

// Function to show a specific page of data
function showPage(pageNumber, entriesPerPage) {
    $('.dataItem').hide();
    var startIndex = (pageNumber - 1) * entriesPerPage + 1; // Adjusted for 1-based indexing
    var endIndex = startIndex + entriesPerPage - 1; // Adjusted for 1-based indexing
    for (var i = startIndex; i <= endIndex; i++) {
     $('#dataItem_' + i).show();
    }
}

// Initial setup
updateTable();

// Event listener for changing entries per page
$('#entriesPerPage').change(function () {
    updateTable();
});

// Event listener for pagination links
$('#pagination').on('click', 'a', function (e) {
    e.preventDefault();
    var pageNumber = parseInt($(this).data('page'));
    var entriesPerPage = parseInt($('#entriesPerPage').val());
    showPage(pageNumber, entriesPerPage);
});
}
function shipment_data_load(){
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: '/Shipment_Product_Detail_Retrieval/',
                type: 'POST',
                async: false,
                data: { 'shipment_item_id': global_shipment_item_id},
                csrfmiddlewaretoken: csrf_data
            }).done(function(json_data) {
                data=JSON.parse(json_data)
                alert(1)
                console.log(data)
                shipment_product_data=data.product_row_data
                shipment_data = data.shipment_data
                $('#shipment_no').val(shipment_data.title)
                $('#freight').val(shipment_data.freight)
                $('#po_no').val(shipment_data.po_name)
                // Destroy existing DataTable instance, if any
        if ($.fn.DataTable.isDataTable('#shipment_packing_table')) {
            $('#shipment_packing_table').DataTable().destroy();
        }

        // Initialize DataTable
        var table = $('#shipment_packing_table').DataTable({
            data: shipment_product_data,
            columns: [
                { data: 'no' },
                { data: 'product_id' },
                { data: 'product_name'},
                { data: 'quantity' },
                { data: 'box_no', render: function (data, type, row) {
                    return '<input type="text" class="edit-input" style="width: 100px;" value="' + data + '">';
                }},
            ]
        });

        $('#shipment_packing_table tbody').on('click', 'td input.edit-input', function () {
            var cell = table.cell(this.closest('td'));
            var columnIndex = cell.index().column;
    
            if (columnIndex >= 5 && columnIndex <= 10) { // Columns for editing
                $(this).prop('readonly', false);
            }
        });
    
        $('#shipment_packing_table tbody').on('blur', 'input.edit-input', function () {
            var cell = table.cell(this.closest('td'));
            cell.data($(this).val()).draw();
            $(this).prop('readonly', true);
        });

    function getTableData() {
        var data = table.rows().data().toArray();
        var result = [];

        for (var i = 0; i < data.length; i++) {
            result.push({
                no: data[i].no,
                product_id: data[i].product_id,
                product_name: data[i].product_name,
                quantity: data[i].quantity,
                box_no: data[i].box_no,
             });
        }

        return result;
    }

    // Bind the function to the button click event
    $('#generate_packing_label').on('click', function () {
        var tableData = getTableData();
        console.log(tableData);
        boxdata=GetBoxItemData()
            console.log(boxdata)
        var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: '/Shipment_Packing_Label_Generation/',
                type: 'POST',
                async: false,
                data: { 'shipment_item_id': global_shipment_item_id,'packing_data':JSON.stringify(tableData),"box_item_data":JSON.stringify(boxdata)},
                csrfmiddlewaretoken: csrf_data
            }).done(function(json_data) {
                data=JSON.parse(json_data)
                console.log(data)
                downloadFile(data.file_url,data.file_name);
                
            });
            
    });

    $('#generate_packing_list').on('click', function () {
        var tableData = getTableData();
        console.log(tableData);
        boxdata=GetBoxItemData()
        var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
            $.ajax({
                url: '/Shipment_Packing_List_Generation/',
                type: 'POST',
                async: false,
                data: { 'shipment_item_id': global_shipment_item_id,'packing_data':JSON.stringify(tableData),"box_item_data":JSON.stringify(boxdata)},
                csrfmiddlewaretoken: csrf_data
            }).done(function(json_data) {
                data=JSON.parse(json_data)
                console.log(data)
                downloadFile(data.file_url,data.file_name);
            });
    
    });

    $('.switchToggle input[type="checkbox"]').click(function() {
        if ($(this).is(':checked')) {

            var packing_data = getTableData();
            var combined_boxes_data = {};

            $.each(packing_data, function(index, product) {
                console.log("PRODUCTTTTTT",product)
                var box_no = product.box_no;
                var product_name = product.product_name;
                var quantity = product.quantity;
                var product_id = product.product_id

                if (!(box_no in combined_boxes_data)) {
                    combined_boxes_data[box_no] = [];
                }

                var existing_product = $.grep(combined_boxes_data[box_no], function(p) {
                    return p.name === product_name;
                });

                if (existing_product.length > 0) {
                    existing_product[0].quantity += quantity;
                } else {
                    combined_boxes_data[box_no].push({ 'name': product_name, 'quantity': quantity, 'product_id': product_id});
                }
            });
            console.log("IIIIIIIII",combined_boxes_data)
            $('#Product_Box_Item_Data').html('')
            index=1
            $.each(combined_boxes_data, function(boxNumber, products) {
                console.log("boxNumber",index)
                console.log("products",products)
                var dataItem = $('<div class="dataItem" id="dataItem_' + index + '">');
                var dataHeading = $('<div class="dataHeading">');
                dataHeading.append('<div class="data sno">' + index + '.</div>');
                dataHeading.append('<div class="data box_name">Box ' + boxNumber + '</div>');
                dataHeading.append('<div class="data gross_weight"><input type="text" placeholder="Gross Weight"></div>');
                dataHeading.append('<div class="data net_weight"><input type="text" placeholder="Net Weight"></div>');
                dataHeading.append('<div class="data length"><input type="text" placeholder="Length"></div>');
                dataHeading.append('<div class="data width"><input type="text" placeholder="Width"></div>');
                dataHeading.append('<div class="data height"><input type="text" placeholder="Height"></div>');
                dataItem.append(dataHeading);

                $.each(products, function(index, product) {
                    var dataDesc = $('<div class="dataDesc">');
                    dataDesc.append('<div class="subData product_sno">' + (index+1) + '</div>');
                    dataDesc.append('<div class="subData product_name">' + product.name + '</div>');
                    dataDesc.append('<div class="subData product_quantity">' + product.quantity + '</div>');
                    dataDesc.append('<input class="datatable_checkbox" type="checkbox" id="'+product.product_id+'" name="product_checkbox" value="">');
                    dataItem.append(dataDesc);
                });

                $('#Product_Box_Item_Data').append(dataItem);
                pagination_setup();
                index+=1
                $('#Product_Box_Item_Data').on('change', 'input[name="product_checkbox"]', function () {
                    var checkboxId = $(this).attr('id');
                    if ($(this).prop('checked')) {
                        productselectedCheckboxIds.push(checkboxId);
                        alert(productselectedCheckboxIds)
                    } else {
                        productselectedCheckboxIds = productselectedCheckboxIds.filter(id => id !== checkboxId);
                    }
                });
                
    });
         $('#boxItem').addClass('show');
         $('#productList').removeClass('show');
        } else {
         $('#productList').addClass('show');
         $('#boxItem').removeClass('show');        
        }
     });
    });
}

function downloadFile(fileUrl,fileName) {
    // Replace 'your_file_url' with the actual URL of the file you want to download

    // Create a hidden link element
    var link = $('<a>', {
     href: fileUrl,
     download: fileName, // Specify the desired filename
     style: 'display: none;'
    });

    // Append the link to the body
    $('body').append(link);

    // Trigger a click on the link to initiate the download
    link[0].click();

    // Remove the link from the DOM
    link.remove();
}


function GetBoxItemData()
{
    var resultObject = {};

    $('.dataItem').each(function () {
        var boxNumber = $(this).find('.box_name').text().trim().replace('Box ', '');
        var grossWeight = $(this).find('.gross_weight input').val();
        var netWeight = $(this).find('.net_weight input').val();
        var length = $(this).find('.length input').val();
        var width = $(this).find('.width input').val();
        var height = $(this).find('.height input').val();

        var boxDetail = {
            "gross_weight": grossWeight,
            "net_weight": netWeight,
            "length": length,
            "width": width,
            "height": height
        };

        var itemDetails = [];
        $(this).find('.dataDesc').each(function () {
            var productName = $(this).find('.product_name').text().trim();
            var quantity = $(this).find('.product_quantity').text().trim();

            var item = {
                "name": productName,
                "quantity": quantity
            };

            itemDetails.push(item);
        });

        resultObject['Box ' + boxNumber] = {
            "box_detail": boxDetail,
            "item_detail": itemDetails
        };
    });
    console.log(resultObject);
    return resultObject;
    

}
