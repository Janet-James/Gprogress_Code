from bitrix24 import *
import psycopg2
import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]

try:
    connection = psycopg2.connect(user="postgres",
                                 password="pgadmin",
                                 host="192.168.29.159",
                                 port="5432",
                                 database="Bitrix"
                                 )

    bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')
    bitrix = bx24.callMethod('lists.element.get',
                             IBLOCK_TYPE_ID='lists',
                             IBLOCK_ID=128)
    cr = connection.cursor()

    cr.execute("""select id,module_name,subject,sender_name, to_address, from_address, deal_id,deal_title, mail_content,
        mail_status,created_by,created_date,modified_by,modified_date from asyn_email where mail_status in ('Waiting') order by id desc LIMIT 30""")
    get_asyn_data = dictfetchall(cr)
    print("gggggg", get_asyn_data)
    
    for item in get_asyn_data:
        from_address = item['from_address']
        to_address = item['to_address']
        id = item['id']
        subject_name = item['subject']
        
        print("from address", from_address)
        print("tp address", to_address)

        sender_password = 'wrzvfdtllctyxlig'

        cc_address = ["sandhiyavalli23@gmail.com", "vijith.vijayan@nexttechnosolutions.co.in"]

        subject = subject_name
        
        toaddr1 = ['sandhiyavalli23@gmail.com']
        message = MIMEMultipart()
        message['From'] = from_address
        message['To'] = to_address
        message['Cc'] = ",".join(cc_address)
        message['Subject'] = subject

        table_html = ''

        Module_name = item['module_name']
        Subject = item['subject']
        Sender_name = item['sender_name']
        Deal_Title = item['deal_title']
        Mail_Content = item['mail_content']
        table_html += f'<p>{Mail_Content}</p><p>Module name: {Module_name}</p><p>Deal Title: {Deal_Title}</p>'
        table_html += '</table>'

        body = MIMEText(table_html, 'html')
        message.attach(body)

        server = smtplib.SMTP('smtp.gmail.com', 587)

        server.starttls()

        server.login(from_address, sender_password)
        
        recepient = [from_address] + cc_address

        server.sendmail(from_address, recepient, message.as_string())

        server.quit()

        print("Mail Sent Successfully")

        if get_asyn_data:
            cr.execute("""update asyn_email set mail_status='send' where id=%s returning id""",((id),))
            update_status = cr.fetchall()
            print("Success",update_status)

        connection.commit()

    cr.close()
    connection.close()

except Exception as e:
    print("Error:", e)