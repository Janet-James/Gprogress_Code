var globalRatingValue;
var entityTypeId;
var client_id;


$(document).ready(function(){
    $("#loading").hide();
    var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    entityTypeId= urlParts[6];
    client_id = urlParts[7];
    company_id = urlParts[8];
    project_id = urlParts[9];
    Get_Service_Desk()
})

function Get_Service_Desk(){
    $.ajax({
        url: "/client/message/reply/" + entityTypeId + "/" + client_id + "/" + company_id + "/" + project_id + "/",
        method: "get",
        data: { format: 'json' },
        dataType: 'json',
        success: function (data) {
        var replayedMessages = data.chat_history.paired_messages;
        console.log(replayedMessages)
        if(replayedMessages){
          var chatContainer = $('#chat-container');
          replayedMessages.forEach(function (replayedMessage) {
            var messageHTML = '<div class="message">';
            var client_message = replayedMessage.sent_message;
            var client_msg_date = replayedMessage.sent_date;
            var replayed_message = replayedMessage.replayed_message;
            var replayed_msg_date = replayedMessage.replayed_date;
            messageHTML += `
            <div class="row align-items-end">
            <div class="col-auto">
            <div class="green-icon">
            <div class="icon">
            <img src="/static/images/client-partner/user.png" />
            </div>
            </div>
            </div>
            <div class="col  green-chat">
            <div class="chat-single-data ">
            <p>${client_message}</p>
            <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${client_msg_date} </p>
            </div>
            </div>
            <div class="col-auto">
            <div class="user-icon">
            </div>
            </div>
            </div>`;
            if(replayed_message == '') {
              messageHTML += ``;
            }else{messageHTML += `
            <div class="row align-items-end">
            <div class="col-auto">
            <div class="green-icon">
            </div>
            </div>
            <div class="col user-chat">
            <div class="chat-single-data">
            <p>${replayed_message}</p>
            <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${replayed_msg_date} </p>
            </div>
            </div>
            <div class="col-auto">
            <div class="user-icon">
            <img src="/static/images/client-partner/green.png" />
            </div>
            </div>
            </div>`;
            }
            messageHTML += '</div>';
            chatContainer.append(messageHTML);
          });
        }
    }
})
}

  
// Function to format the time as 12-hour clock (AM/PM)
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


// --- Today's Date ---
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var currentTime = hours + ':' + minutes + ' ' + ampm;
  return currentTime;
}
// Update time
setInterval(function () {
  dynamicTime = getCurrentTime();
  var liveDate = `<p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime}</p>`;
  $('#live_chat_date_and_time').html(liveDate);
}, 1000);

function chatCurrentDateTime(){
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  customer_chat_date = now.toLocaleString('en-US', options).replace(/,/g, '');
}

function checkEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      SentMessage();
  }
}

// ---- Sent Customer Message ---- 
function SentMessage() {
  chatCurrentDateTime();
  customer_message = $('#customer_text_message').val();
  chat_append = `
  <div class="message">
  <div class="row align-items-end">
  <div class="col-auto">
  <div class="green-icon"></div>
  </div>
  <div class="col user-chat">
  <div class="chat-single-data">
  <p>${customer_message}</p>
  </div>
  <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime} </p>
  </div>
  <div class="col-auto">
  <div class="user-icon">
  <img src="/static/images/client-partner/user.png" />
  </div>
  </div>
  </div>
  </div>`;
  $('#chat-container').append(chat_append);
  $('#customer_text_message').val('');
  customer_id = client_id;
  client_company_id = company_id
  chat_date = customer_chat_date;
  source_of_message = 3398;
  project_id = project_id
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();

  $.ajax({
    url: '/crm_team/chat_box/',
    type: 'post',
    data: {
      'client_id': customer_id,
      'company_id': client_company_id,
      'customer_message': customer_message,
      'chat_date': chat_date,
      'source_of_message': source_of_message,
      "project_id": project_id,
      csrfmiddlewaretoken: csrf_data
    }
  }).done(function (json_data) {
    // Handle the response if needed
  });
}
