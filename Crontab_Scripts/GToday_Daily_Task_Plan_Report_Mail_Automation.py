import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from fast_bitrix24 import Bitrix

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/60/05c1fk0f62jockiu/')

filter_user_params = {"filter": {"ACTIVE": 'true',"UF_USR_1704686449882":3432}}
user_list = bx24.get_all('user.get', filter_user_params)
print("filterrrrrrrrrrrr user",user_list)

for user in user_list:
    user_id = user['ID']
    print("user_id", user_id)

    current_date = datetime.now()
    end_date = (current_date + timedelta(days=30)).strftime("%Y-%m-%d")
    start_date = (current_date - timedelta(days=30)).strftime("%Y-%m-%d")
    current_week_number = current_date.isocalendar()[1]

    task_filter_params = {
        "filter": {
            "LOGIC": "AND",
            "RESPONSIBLE_ID": user_id,
            ">=DEADLINE": start_date,
            "<=DEADLINE": end_date,
            "!STATUS": [5],
        },
    }
    task_details = bx24.get_all('tasks.task.list', task_filter_params)
    table_2 = ""
    count = 1

    for tasks in task_details:
        task_id=tasks['id']
        task_title = tasks['title']
        created_date = tasks['createdDate']
        parsed_created_date = datetime.strptime(created_date, "%Y-%m-%dT%H:%M:%S%z")
        formatted_created_date = parsed_created_date.strftime("%d-%b-%Y")
        status_name = int(tasks['status'])
        if status_name == 1:
            status_name = 'New'
        elif status_name == 2:
            status_name = 'Pending'
        elif status_name == 3:
            status_name = 'In Progress'
        elif status_name == 4:
            status_name = 'Supposedly Completed'
        elif status_name == 5:
            status_name = 'Completed'
        elif status_name == 6:
            status_name = 'Deferred'
        elif status_name == 7:
            status_name = 'Declined'
        if 'group' in tasks and 'name' in tasks['group'] and tasks['group']['name']:
            group_name = tasks['group']['name']
        task_deadline = tasks['deadline']
        if task_deadline is not None:
            parsed_deadline = datetime.strptime(task_deadline, "%Y-%m-%dT%H:%M:%S%z")
            formatted_deadline = parsed_deadline.strftime("%d-%b-%Y")
        else:
            formatted_deadline = "None"

        print("TASK_ID--", task_id, task_title)

        table_2 += f"""
            <tr style="background-color: #fff;">
            <td style="text-align: center;">{count}</td>
            <td style="text-align: center;">{group_name}</td>
            <td style="text-align: center;">{task_title}</td>
            <td style="text-align: center;">{formatted_created_date}</td>
            <td style="text-align: center;">{formatted_deadline}</td>
            <td style="text-align: center;">{status_name}</td>
            </tr>"""
        count += 1

    user_params = {"id": user_id}
    user_details = bx24.get_all("user.get", user_params)

    for user_detail in user_details:
        user_name = user_detail['NAME']
        user_last_name = user_detail['LAST_NAME']
        salutation = user_detail.get('UF_USR_1683028889607', '')
        user_email = user_detail['EMAIL']
        supervisor_email = user_detail.get('UF_USR_1704287967633', '')
        if 'PERSONAL_PHOTO' in user_detail:
            profile_photo = user_detail['PERSONAL_PHOTO']
        else:
            profile_photo = ''

    if table_2:
        mail_content = f"""<body style="font-family: sans-serif;">
            <div style="background-color:#fff; width: 100%;padding: 25px">
            <div style="background-color:#F1F1F1; max-width:1000px; margin-left:auto; margin-right: auto; border-radius:15px;padding: 25px;">
            <table>
            <tr>
            <td>
            <img src="{profile_photo}" width="55" style="margin-right: 15px;"/>
            </td>
            <td>
            <h2> Dear {salutation}{user_name} {user_last_name}</h2>
            </td>
            </tr>
            </table>
            <p style="font-family: sans-serif; font-size: 14px; margin-top: 20px;margin-bottom: 20px;">Your Daily Execution Plan For {current_date.strftime('%d/%m/%Y')}, Week #{current_week_number}, encompassing tasks overdue from the past 30 days</p>
            <table style="width:100%; border-radius: 25px;" cellpadding="15" cellspacing="0">
            <tr style="background-color: #008f301c; color:#000; text-align: left;">
            <th style="border-top-left-radius: 10px;">S.No.</th>
            <th style="text-align: center;">Project Name</th>
            <th style="text-align: center;">Task Name</th>
            <th style="text-align: center;">Created Date</th>
            <th style="text-align: center;">Task Deadline</th>
            <th style="text-align: center;">Task Status</th>
            </tr>{table_2}</table></div></div></body>"""
    else:
        mail_content = f"""<body style="font-family: sans-serif;">
            <div style="background-color: #008f301c; width: 100%;padding: 25px">
            <div style="background-color:#F1F1F1; max-width:1000px; margin-left:auto; margin-right: auto; border-radius:15px;padding: 25px;">
            <table>
            <tr>
            <td>
            <img src="{profile_photo}" width="55" style="margin-right: 15px;"/>
            </td>
            <td>
            <h2> Dear {salutation}{user_name} {user_last_name}</h2>
            </td>
            </tr>
            </table>
            <h3>Tasks are not yet planned!</h3>
            </div></div></body>"""

    mail_content += """<p style="margin-bottom:5px;margin-top: 30px;">Thanks,</p>
                    <p style="font-weight: bolder;margin-top: 10px;">GREEN Limited</p>"""

    sender_email = 'digitaladmin@green.com.pg'
    sender_password = 'Win@dmin2022'
    cc_address =[supervisor_email, "bernard@green.com.pg"]
    bcc_address = ["janet.james@nexttechnosolutions.co.in"]
    to_address = user_email
    subject =  f"{salutation}{user_name} {user_last_name},Your Daily Execution Plan For {current_date.strftime('%d/%m/%Y')}, Week #{current_week_number}"
    message = MIMEMultipart()
    message['From'] = "GREEN GTODAY"
    message['To'] = to_address
    message['Cc'] = ",".join(cc_address)
    message['Bcc'] = ",".join(bcc_address)
    message['Subject'] = subject
    body = MIMEText(mail_content, 'html')
    message.attach(body)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    text = message.as_string()
    recepient = [to_address] +cc_address + bcc_address
    server.send_message(message)
    server.quit()
    print("Email sent successfully!")
    mail_content = ''
count=1