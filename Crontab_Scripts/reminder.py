import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from psycopg2.extras import Json
from datetime import datetime, timezone
from fast_bitrix24 import Bitrix
from datetime import datetime
import pytz



# Getting mail id by user id
def getting_mail_ids(id):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    user_params = {'ID': id}
    user_data = bx24.get_all('user.get', user_params)
    email_list = []
    for data in user_data:
        email = data['EMAIL']
        email_list.append(email)
    return email_list


# getting ticket info 
def help_topic_info(topic_id):

    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    list_params = {
        'IBLOCK_TYPE_ID': 'lists',
        'IBLOCK_ID': 180,
        'ELEMENT_ID':topic_id
    }   
    list_data = bx24.get_all('lists.element.get',list_params)
    for data in list_data:
        id = data['ID']
        name = data['NAME']
        team = data['PROPERTY_1156']['70382']
        responsible_id = [v for k, v in data['PROPERTY_1154'].items()] 
        responsible_mail_list = getting_mail_ids(responsible_id)
        cc_id = [v for k, v in data['PROPERTY_1166'].items()] 
        cc_mail_list = getting_mail_ids(cc_id)
        external_mail_list = data['PROPERTY_1194']['70386'].split(', ')  # Split the string into a list

    return({"help_title":name,"team":team,"responsible_mail_list":responsible_mail_list,"cc_mail_list":cc_mail_list,"external_mail_list":external_mail_list})


def service_team():
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    current_datetime = datetime.now()
    formated_current_date = current_datetime.strftime("%Y-%m-%d")
    current_date = formated_current_date + ' ' + '00:00:00'
    ticket_params = {"entityTypeId": 133,
                    "filter": {"ufCrm94_1693286572": 21332,"stageId":"DT133_284:UC_57W83N"},
                    "select": ["title", "ufCrm94_1694254376554", "ufCrm94_1694583394392", "ufCrm94_1693470985532",
                                "ufCrm94_1693286652", "ufCrm94_1693286572", "ufCrm94_1698423590", "opened"]}
    ticket_data = bx24.get_all('crm.item.list', ticket_params)
    for data in ticket_data:
        service_call_no = data['title']
        reported_by = data['ufCrm94_1694254376554']
        issue_reported = data['ufCrm94_1693470985532']


        reported_date_time = data['ufCrm94_1694583394392']
        # Splitting date and time
        date_part, time_part = reported_date_time.split('T')
        date = datetime.strptime(date_part, '%Y-%m-%d')
        time = datetime.strptime(time_part[:-6], '%H:%M:%S')
        time_format = time.strftime('%I:%M %p')
        date_format = date.strftime('%d-%b-%Y')

        # calculating number of days
        reported_date_time = datetime.fromisoformat(reported_date_time)
        current_date_time = datetime.now(pytz.utc)
        time_difference = current_date_time - reported_date_time
        days = str(time_difference.days)
        if days == '1':
            days_difference = days +" Day"
            body_days_difference = days +" day"
        else:
            days_difference = days +" Days"
            body_days_difference = days +" days"
        
        priority_id = data['ufCrm94_1693286652']
        if priority_id == 1862:
            priority = "Critical"
        elif priority_id == 1836:
            priority = "High"
        elif priority_id == 1838:
            priority = "Medium"
        elif priority_id == 1840:
            priority = "Low"

        status_id = data['opened']
        if status_id == "N":
            status = "Open"
        else:
            status = "Close"

        help_topic_id= data['ufCrm94_1693286572']
        help_topic_data = help_topic_info(help_topic_id)
        help_topic = help_topic_data['help_title']
        assigned_team = help_topic_data['team']
        responsible_mails = help_topic_data['responsible_mail_list']
        cc_mails = help_topic_data['cc_mail_list']
        external_emails= help_topic_data['external_mail_list']
        
        html_body = f"""
                    <html>
                    <head>
                    </head>
                    <body style="font-family: sans-serif;">
                    <div style="background-color: #f6faff; width: 100%; padding: 25px;">
                        <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                            <table style="width: 100%; text-align: right;">
                                <tbody>
                                    <tr>
                                        <td class="table-data">
                                            <img width="250" src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/557c196f48d50c9bd9ea851585154466/showFile/?&token=b6czqvvcu0fr" style="margin-bottom: 20px;">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                                <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 42px;">
                                    <p style="margin-bottom: 5px; margin-top: 10px; font-weight: bold;">
                                        <b>Dear {assigned_team}</b>
                                    </p>
                                    <p>
                                        We’re following up on the overdue service ticket <b>{service_call_no}</b>, which has been open for {body_days_difference} requires your immediate attention.
                                    </p>
                                    <table style="text-align: left;border: 1px solid;" cellpaadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Service Call No.</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{service_call_no}</td>
                                            </tr>
                                            
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Reported On</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{date_format} {time_format}</td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Issue Reported</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{issue_reported}</td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Priority</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{priority}</td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Help Topic</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{help_topic}</td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Status</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{status}</td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid; padding: 3px !important;">Client Representative / Reported By / Contact</th>
                                                <td style="border: 1px solid; padding: 3px !important;">{reported_by}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    <p style="margin-top:31px; margin-bottom:0;padding-left:5px"><b>GREEN Service Team </b></p>

                     <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/557c196f48d50c9bd9ea851585154466/showFile/?&token=b6czqvvcu0fr" width="180" style="margin-bottom: 0px; margin-top:15px;padding-left:5px" />
                     <p style="margin-bottom:-8px; font-size:14px;padding-left:5px"><small>W: <a href = "https://greendigitall.com/">https://greendigitall.com/</a> </small></p>
                     <p style="margin-bottom:5px; font-size:14px;padding-left:5px"><small>M P: +91-94421 07432  E: <a href ="">services@greenmaestros.co.in </a> </small></p>
                    <p style="margin-bottom:5px; margin-top:5px;font-size:14px;padding-left:5px"><small>A: 403, Gurusamy Nagar, Thanneer Panthal</small></p>
			<p style="margin-bottom:5px; margin-top:5px;font-size:14px;padding-left:20px"><small>Peelamedu, Coimbatore</small></p>
			<p style="margin-bottom:5px; margin-top:5px;font-size:14px;padding-left:20px"><small>Tamil Nadu, India. </small></p>                   
                                    <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 0px;">
                                        <p style="font-weight: bold; margin-top: 10px; text-align: center;"><a href="https://greendigitall.com/" style="text-decoration: none; font-size: 14px; letter-spacing: 1px; color: #838383;" target="_blank">GREEN DigitALL</a></p>
                                    </div>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                    </body>
                    </html>
                """

        send_email(html_body, responsible_mails, cc_mails, external_emails,days_difference,service_call_no)


# sending mail functionality
def send_email(html_body, responsible_mails, cc_mails, external_emails, days_difference, service_call_no):

    sender_email = 'digitaladmin@green.com.pg'
    sender_password = 'WinGREEN2024*'

    #to_address = ['janet.james@nexttechnosolutions.co.in']
    #cc_address = ['juniorsolutiondeveloper2@greenmaestros.co.in']
    #bcc_address = ['juniorsolutiondeveloper2@greenmaestros.co.in', 'sandhiya.arjunan@nexttechnosolutions.co.in', "vijith.vijayan@nexttechnosolutions.co.in"]
      
    to_address = ['glen@xaasability.com','arun@xaasability.com','srinithin@xaasability.com','veerabagu@xaasability.com','suthan@xaasability.com']
    cc_address = ['bernard@green.com.pg','juniorsolutiondeveloper2@greenmaestros.co.in','janet.james@nexttechnosolutions.co.in']
    bcc_address = ['juniorsolutiondeveloper2@greenmaestros.co.in', 'sandhiya.arjunan@nexttechnosolutions.co.in', "vijith.vijayan@nexttechnosolutions.co.in"]
    subject = f'Service Desk - Service Ticket ({service_call_no}) - Open for {days_difference}'
    
    message = MIMEMultipart()
    message['From'] = "GREEN Service and Support"
    message['To'] = ", ".join(to_address)
    message['Cc'] = ", ".join(cc_address)
    message['Bcc'] = ", ".join(bcc_address)
    message['Subject'] = subject

    for bcc_email in bcc_address:
        message['Bcc'] = bcc_email

    # Send the email
    try:
        body = MIMEText(html_body, 'html')
        message.attach(body)
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print("Email could not be sent. Error:", str(e))

service_team()










