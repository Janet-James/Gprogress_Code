import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone, timedelta
from fast_bitrix24 import Bitrix
import pytz
from datetime import datetime



# current week
time_zone = pytz.timezone('Asia/Kolkata')
today = datetime.now(time_zone)
start_of_week = today - timedelta(days=today.weekday())
end_of_week = start_of_week + timedelta(days=6)
start_of_week = start_of_week.replace(hour=0, minute=0, second=0)
end_of_week = end_of_week.replace(hour=23, minute=59, second=59)
start_date_iso = start_of_week.isoformat()
end_date_iso = end_of_week.isoformat()
current_date = datetime.now()
current_week_number = current_date.isocalendar()[1]
current_year = current_date.year

print(start_date_iso, end_date_iso)

table_2 = ''
count = 1

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/60/05c1fk0f62jockiu/')

# cc mail
universal_list = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 188,
    "ELEMENT_ID": 14488
}
mail_recipient_response = bx24.get_all('lists.element.get', universal_list)    
cc_persons_email_list = []
for uni_list in mail_recipient_response:
    uni_list_recipient_persons = uni_list["PROPERTY_1162"]
    uni_list_cc_persons = uni_list["PROPERTY_1164"]
    for persons_id in uni_list_cc_persons.values():
        cc_person_user_id = int(persons_id)
        cc_users_list = bx24.get_all('user.get',{"ID": cc_person_user_id})
        cc_persons_email_id = cc_users_list[0]['EMAIL']
        cc_persons_email_list.append(cc_persons_email_id)

filter_user_params={"filter":{"ACTIVE":'true'}}

user_list = bx24.get_all('user.get',filter_user_params)

for users in user_list:
    user_id= users['ID']
    print("USERRRRRRRR",user_id)
    current_date = datetime.now()
    date = current_date.strftime("%d-%m-%Y")
    date_str= datetime.strptime(date, "%d-%m-%Y")
    date_format = date_str.strftime("%d-%b-%Y")
    comparative_date_format=date = current_date.strftime("%d-%m-%Y")

    filter_params = {
         "filter": {
             "RESPONSIBLE_ID": user_id,
             ">=CREATED_DATE": start_date_iso,
             "<=CREATED_DATE": end_date_iso
         },
        
     }
    comment_data_dict = {}
    task_created_id = bx24.get_all('tasks.task.list', filter_params)
    print("TASSSSSSSSSSss",task_created_id)
    for task in task_created_id:
        task_id = task['id']
        task_title = task['title']
        # print("task_id",task_id)
        status_name=int(task['status'])
        
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
            status_name = 'Deffered'
        elif status_name == 7:
            status_name = 'Declined'
            # print("status" , status_name)    
        
        if 'group' in task and 'name' in task['group'] and task['group']['name']:
            group_name = task['group']['name']
            # print("Group Name:", group_name)
            
        # elapsed_time=task['action']    
        print("TASK_ID--",task_id, task_title)
        params = {'taskId': task_id}
        comment_list = bx24.get_all('tasks.task.result.list', params)
        print("comment_list",comment_list)
       
        for comment_data in comment_list:
            print("********************")
            summary = comment_data['text']
            comment_created_date_str = str(comment_data['createdAt']).strip()
            created_date = datetime.strptime(comment_created_date_str, "%Y-%m-%dT%H:%M:%S%z")
            created_date = created_date.replace(tzinfo=timezone.utc)
            comment_created_date = created_date.isoformat()
            comment_created_date = datetime.fromisoformat(comment_created_date)
            comment_created_date = comment_created_date.strftime("%d-%m-%Y")
            comment_tuple = (summary, task_id,task_title,comment_created_date)

            if comment_created_date in comment_data_dict:
                comment_data_dict[comment_created_date].append(comment_tuple)
            else:
                comment_data_dict[comment_created_date] = [comment_tuple]
        # print("COMENT_DATA_DICT--------",comment_data_dict)
    if date in comment_data_dict:
        comments_on_date = comment_data_dict[date]
        for comment, task_id,task_title,comment_created_date in comments_on_date:
            text_summery = comment
            filtered_task_id = task_id
            summery_date = comment_created_date
            task_title_content = task_id
            filter_params = {
                "filter": {
                    "ID": filtered_task_id,
                },
                "select": ["TITLE","DEADLINE"]
            }
            
            task_title = bx24.get_all('tasks.task.list', filter_params)
            for title in task_title:
                task_title_ondate = title['title']
                task_deadline = title['deadline']
                if task_deadline is not None:
                    parsed_deadline = datetime.strptime(task_deadline, "%Y-%m-%dT%H:%M:%S%z")
                    formatted_deadline = parsed_deadline.strftime("%d-%b-%Y")
                else :
                    formatted_deadline= "None"


    # user name and mail id
    user_params={"id":user_id}
    user_details = bx24.get_all("user.get",user_params)
    print("DDDDDDDDDDDD",comment_data_dict)
    # print("UUUUUUUUUUUUUUUUUUUU", user_details)
    for user_detail in user_details:
        user_name = user_detail['NAME']
        user_last_name = user_detail['LAST_NAME']
        salutation = user_detail.get('UF_USR_1683028889607', '')
        user_email = user_detail['EMAIL']
        supervisor_email = user_detail.get('UF_USR_1704287967633', '')
        if date in comment_data_dict:
            # print("--userid--", user_id, "--taskId--", filtered_task_id, "---deadline---", formatted_deadline,
                #  "--date--", date_format, " ---> comment found on that date ! ", text_summery,"supervisor_email- ", supervisor_email)
            # print(' ')
            
            print("USER_COMMENT-----------",comment_data_dict) 

            if date == comparative_date_format:
                final_data=comment_data_dict.get(date)
                print("-0-----------",final_data)
                table_2=''
                for i in final_data:
                    print("FINALLLLLLLL",i)
                    table_2 += f"""
                        <tr style="background-color: #fff;">
                        <td style="text-align: center;">{count}</td>
                        <td style="text-align: center;">{group_name}</td>
                        <td style="text-align: center;">{i[2]}</td>
                        <td style="text-align: center;">{date_format}</td>
                        <td style="text-align: center;">{formatted_deadline}</td>
                        <td style="text-align: center;">{i[0]}</td>
                        <td style="text-align: center;">{status_name}</td>
                        </tr>"""
                    count += 1
            print("TABLEEEEEEEEEEEEEEEEEE",table_2)
            table_1 = f"""<body style="font-family: sans-serif;">
                <div style="background-color:#fff; width: 100%;padding: 25px">
                <div style="background-color:#F1F1F1; max-width:1000px; margin-left:auto; margin-right: auto; border-radius:15px;padding: 25px;">
                
                <h2> Dear {salutation}{user_name + " " + user_last_name}</h2>
                <p style="font-family: sans-serif; font-size: 14px; margin-top: 20px;margin-bottom: 20px;">Your today's task summary ({date_format })</p>
                <table style="width:100%; border-radius: 25px;" cellpadding="15" cellspacing="0">
                <tr style="background-color: #008f301c; color:#000; text-align: left;">
                <th style="border-top-left-radius: 10px;">S.No.</th>
                <th style="text-align: center;">Project Name</th>
                <th style="text-align: center;">Task Name</th>
                <th style="text-align: center;">Created Date</th>
                <th style="text-align: center;">Task Deadline</th>
                <th style="text-align: center;">Work Summary</th>
                <th style="text-align: center;">Task Status</th>
                </tr>"""
    
            mail_content = table_1 + table_2
            mail_content += '</table></div></div></body>'
            mail_content += """<p style="margin-bottom:5px;margin-top: 30px;">Thanks,</p>
                                <p style="font-weight: bolder;margin-top: 10px;">GREEN Limited</p>"""
    
            # sender_email = 'greendev@greentelemed.co.in'
            # sender_password = 'dpehudohmfsvqzgz'
            sender_email = 'digitaladmin@green.com.pg'
            sender_password = 'Win@dmin2022'
            # cc_address = cc_persons_email_list
            cc_address =[supervisor_email, "bernard@green.com.pg"]
            bcc_address = ["janet.james@nexttechnosolutions.co.in"]
            to_address = user_email
            subject = f"Your Daily Execution Status For {current_date.strftime('%d/%m/%Y')}, Week #{current_week_number}"
            message = MIMEMultipart()
            message['From'] = "GREEN GTODAY"
            message['To'] = to_address
            message['Cc'] = ",".join(cc_address)
            message['Bcc'] = ",".join(bcc_address)
            message['Subject'] = subject
    
            # try:
            body = MIMEText(mail_content, 'html')
            message.attach(body)
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password)
            text = message.as_string()
            recepient = [to_address]+cc_address + bcc_address
            # recepient='janet.james@nexttechnosolutions.co.in'
            server.sendmail(sender_email, recepient, text)
            server.quit()
            print("If Condition Email sent successfully!")
            mail_content = ''
            # except Exception as e:
                # print("Email could not be sent. Error:", str(e))
        else:
            # print("--userid--", user_id,"--date--" ,date_format , " ---> comment not found on that date !")
            # print(' ')
            mail_content1 = f"""<body style="font-family: sans-serif;">
                <div style="background-color: #008f301c; width: 100%;padding: 25px">
                <div style="background-color:#F1F1F1; max-width:1000px; margin-left:auto; margin-right: auto; border-radius:15px;padding: 25px;">
                <h1> Dear {salutation}{user_name +" "+ user_last_name }</h1>
                <h3> You Haven't Added Task Summary Today ({date_format})</h3>
                """
            mail_content1 += '</div></div></body></table>'
            mail_content1 += """<p style="margin-bottom:5px;margin-top: 30px;">Thanks,</p>
                            <p style="font-weight: bolder;margin-top: 10px;">GREEN Limited</p>"""

            sender_email = 'digitaladmin@green.com.pg'
            sender_password = 'Win@dmin2022'
            cc_address =[supervisor_email, "bernard@green.com.pg"]
            bcc_address = ["janet.james@nexttechnosolutions.co.in"]
            to_address = user_email
            subject = f"Your Daily Execution Status For {current_date.strftime('%d/%m/%Y')}, Week #{current_week_number}"
            message = MIMEMultipart()
            message['From'] = "GREEN GTODAY"
            message['To'] = to_address
            message['Cc'] = ",".join(cc_address)
            message['Bcc'] = ",".join(bcc_address)
            message['Subject'] = subject

            # try:
            body = MIMEText(mail_content1, 'html')
            message.attach(body)
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password)
            text = message.as_string()
            recepient = [to_address] +cc_address + bcc_address
            # recepient='janet.james@nexttechnosolutions.co.in'
            server.sendmail(sender_email, recepient, text)
            server.quit()
            print("Else Condition Email sent successfully!")
            mail_content1 = ''
            # except Exception as e:
            #     print("Email could not be sent. Error:", str(e))
        count=1