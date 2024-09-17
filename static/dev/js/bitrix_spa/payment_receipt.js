var entityTypeId;
var deal_id;
var PaymentReceipt_Files = '';

// --- Here To Start ---
$(document).ready(function(){
  $("#loading").hide();
  var currentURL = window.location.href;
  var urlParts = currentURL.split('/');
  entityTypeId= urlParts[4];
  deal_id = urlParts[5];
  GetInvoice_Details();
})

// --- Choosen File Functionality ---
const dropArea = document.querySelector(".drop_box");
const button = dropArea.querySelector("button");
const dragText = dropArea.querySelector("header");
const input = dropArea.querySelector("input");
let file;
var filename;
var fileCount = 0;

document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'choosenfile-btn') {
    input.click();
  }
});

input.addEventListener("change", function (e) {
  fileCount = e.target.files.length;
  var fileName = e.target.files[0].name;
  if (fileName.endsWith(".pdf")) {
    let filedata = `
      <form id="upload_form" action="" method="post">
        <div class="form">
          <h4 id="upload_file_name">${fileName}</h4>
          <button type="button" id="submit-btn" onclick="PaymentReceiptSubmit()" class="btn">Upload</button>
        </div>
      </form>`;
    dropArea.innerHTML = filedata;
  } else {
    input.value = "";
    dropArea.innerHTML = `
      <header>
        <h4>Upload Receipt here</h4>
      </header>
      <p>Files Supported: PDF</p>
      <input type="file" hidden accept=".pdf" id="payment_recipt" style="display:none;">
      <button id="choosenfile-btn" class="btn">Choose File</button>`;
    
    Lobibox.notify('warning', {
      position: 'top right',
      msg: 'Please Upload PDF File'
    });
  }
});


function GetInvoice_Details() {
  $.ajax({
      url: "/payment_receipt_upload/" + entityTypeId + "/" + deal_id + "/",
      method: "get",
      data: { format: 'json' },
      dataType: 'json',
      success: function (data) {
          var receipt_data = data;
          console.log("Invoice Data", receipt_data);
          var invoice_number = receipt_data.invoice_number;
          var company_name = receipt_data.company_name;
          var customer_contact = receipt_data.customer_contact;
          var customer_company = receipt_data.customer_company;
          var amount = receipt_data.amount;
          var invoice_date = receipt_data.invoice_date;
          var for_details = receipt_data.for_details;
          var company_logo = receipt_data.company_logo;
          var stage_id = receipt_data.stage_id;
          var allowed_stage_ids = [
              "DT144_142:UC_NE3TQB",
              "DT144_142:UC_BKXI09",
              "DT144_142:UC_TYW6QL",
              "DT144_142:UC_ICUD1H"
          ];
          var companylogoHTML = `<img src="${company_logo}" width="250" style="margin-bottom: 20px;" />`
          $('#company_logo').append(companylogoHTML)
          $('#invoice_number').val(invoice_number);
          $('#mycompany_name').val(company_name);
          $("#customer_contact").val(customer_contact);
          $('#customer_company').val(customer_company);
          $('#amount').val(amount);
          $('#invoice_date').val(invoice_date);
          $('#for_details').val(for_details);
          if (allowed_stage_ids.includes(stage_id)){
          } else {
              $('#choosenfile-btn').prop('disabled', true);
              $('#choosenfile-btn').css('cursor', 'not-allowed');
              Lobibox.notify('warning', {
                  position: 'top right',
                  msg: "Currently, You can't upload the receipt. Please check with our admin."
              });
          }
      }
  });
}

  
function PaymentReceiptSubmit() {
    $('#submit-btn').prop('disabled', true);
    $('#submit-btn').css('cursor', 'not-allowed');
    $.ajax({
        url: '/finac_pg/payment_receipt_file_upload/',
        type: 'post',
        data: {
            'entityTypeId': entityTypeId,
            'deal_id': deal_id,
            'payment_receipt_file': PaymentReceipt_Files
        }
    }).done(function(json_data) {
        var data = JSON.parse(json_data);
        console.log(data.Code);
        if (data.Code === "001") {
            Lobibox.notify('success', {
                position: 'top right',
                msg: 'Your Bank Receipt is Uploaded.'
            });
            $('#submit-btn').prop('disabled', true);
            $('#submit-btn').css('cursor', 'not-allowed');
        } else {
            Lobibox.notify('warning', {
                position: 'top right',
                msg: 'Upload Failed'
            });
        }
    });
}
