from django.http import HttpResponse
from bitrix24 import *
import psycopg2
import smtplib
from django.db import connection,connections
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def dictfetchall(cursor):
    "Returns all rows from a cursor as a dictionary."
    """
            Returns all rows from a cursor as a dictionary
            @param cursor:cursor object
            @return: dictionary contains the details fetch from the cursor object
            @rtype: dictionary
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]

def asyn_email(request):
    json_data = {}
    cr = connection.cursor()
    
    bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')

    bitrix = bx24.callMethod('lists.element.get',
                    IBLOCK_TYPE_ID='lists',
                    IBLOCK_ID = 128
    )
    print(bitrix)
    for item in bitrix:
        id=item['ID']
        module_name=item["NAME"]
        strsubject =item["PROPERTY_886"]["16626"]
        print("strsubject-----------", strsubject)
        subject = str(strsubject)
        strsender_name= item["PROPERTY_888"]["16628"]
        sender_name = str(strsender_name)
        strto_address = item["PROPERTY_890"]["16630"]
        to_address = str(strto_address)
        strfrom_address = item["PROPERTY_892"]["16632"]
        from_address = str(strfrom_address)
        strdeal_id = item["PROPERTY_900"]["16638"]
        deal_id = str(strdeal_id)
        strdeal_title=item["PROPERTY_902"]["16640"]
        deal_title = str(strdeal_title)
        strmail_content =item["PROPERTY_894"]["16634"]
        mail_content = str(strmail_content)
        strmail_status = item["PROPERTY_896"]["16636"]
        mail_status = str(strmail_status)
        created_by = item["CREATED_BY"]
        created_date =item["DATE_CREATE"]
        modified_by = item["MODIFIED_BY"]
        modified_date =item["TIMESTAMP_X"]
        

        print("entered")
        cr.execute("""INSERT INTO asyn_email(module_name,subject,sender_name, to_address, from_address, deal_id,deal_title, mail_content,
        mail_status,created_by,created_date,modified_by,modified_date)
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
        (module_name, subject,sender_name,to_address,from_address,deal_id,deal_title,mail_content,mail_status,created_by,created_date,modified_by,modified_date))
        result = dictfetchall(cr)[0]
        print("created success id", result)

        if result:
            json_data['msg'] = "Data Created Succesfully"

    return HttpResponse(json.dumps(json_data))


def get_asyn_mail(request):
    json_data = {}
    cr = connection.cursor()
    
    cr.execute("""select id,module_name,subject,sender_name, to_address, from_address, deal_id,deal_title, mail_content,
            mail_status,created_by,created_date,modified_by,modified_date from asyn_email where mail_status in ('Waiting') order by id desc LIMIT 30""")

    get_asyn_data = dictfetchall(cr)
    print("gggggg", get_asyn_data)

    for item in get_asyn_data:
        from_address = item['from_address']
        to_address = item['to_address']
        id = item['id']

        print("from address", from_address)
        print("tp address", to_address)

        sender_password = 'wrzvfdtllctyxlig'

        subject = 'Bitrix Data'

        message = MIMEMultipart()
        message['From'] = from_address
        message['To'] = to_address
        message['Subject'] = subject

        table_html = '<table style="border-collapse: collapse;"><tr style="background-color: #ddd; font-weight: bold;"><th style="padding: 5px; border: 1px solid #ccc;">Module Name</th><th style="padding: 5px; border: 1px solid #ccc;">Subject</th><th style="padding: 5px; border: 1px solid #ccc;">Sender Name</th><th style="padding: 5px; border: 1px solid #ccc;">Deal Title</th>'

        Module_name = item['module_name']
        Subject = item['subject']
        Sender_name = item['sender_name']
        Deal_Title = item['deal_title']
        # Mail_Content = item['sender_name']
        table_html += f'<tr style="border: 1px solid #ccc;"><td style="padding: 5px; border: 1px solid #ccc;">{Module_name}</td><td style="padding: 5px; border: 1px solid #ccc;">{Subject}</td><td style="padding: 5px; border: 1px solid #ccc;">{Sender_name}</td><td style="padding: 5px; border: 1px solid #ccc;">{Deal_Title}</td></tr>'
        table_html += '</table>'

        body = MIMEText(table_html, 'html')
        message.attach(body)

        server = smtplib.SMTP('smtp.gmail.com', 587)

        server.starttls()

        server.login(from_address, sender_password)

        server.sendmail(from_address, to_address, message.as_string())

        server.quit()

        mail_status = json_data['msg'] = "Mail Sent Successfully"

        if mail_status:
            cr.execute("""update asyn_email set mail_status='send' where id=%s returning id""",((id),))
            update_status = cr.fetchall()
            print("Success",update_status)

    return HttpResponse(json.dumps(json_data))
