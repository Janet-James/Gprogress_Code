from bitrix24 import *
import psycopg2
import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

try:
    connection = psycopg2.connect(user="postgres",
                                 password="pgadmin",
                                 host="192.168.29.159",
                                 port="5432",
                                 database="Bitrix")

    bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')
    bitrix = bx24.callMethod('lists.element.get',
                             IBLOCK_TYPE_ID='lists',
                             IBLOCK_ID=128)
    cr = connection.cursor()

    for item in bitrix:
        id = item['ID']
        module_name = item["NAME"]
        strsubject = item["PROPERTY_886"]["16626"]
        subject = str(strsubject)
        strsender_name = item["PROPERTY_888"]["16628"]
        sender_name = str(strsender_name)
        strto_address = item["PROPERTY_890"]["16630"]
        to_address = str(strto_address)
        strfrom_address = item["PROPERTY_892"]["16632"]
        from_address = str(strfrom_address)
        strdeal_id = item["PROPERTY_900"]["16638"]
        deal_id = str(strdeal_id)
        strdeal_title = item["PROPERTY_902"]["16640"]
        deal_title = str(strdeal_title)
        strmail_content = item["PROPERTY_894"]["16634"]
        mail_content = str(strmail_content)
        strmail_status = item["PROPERTY_896"]["16636"]
        mail_status = str(strmail_status)
        created_by = item["CREATED_BY"]
        created_date = item["DATE_CREATE"]
        modified_by = item["MODIFIED_BY"]
        modified_date = item["TIMESTAMP_X"]

        cr.execute(
            """INSERT INTO asyn_email(module_name,subject,sender_name, to_address, from_address, deal_id,deal_title, mail_content,
            mail_status,created_by,created_date,modified_by,modified_date)
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
            (module_name, subject, sender_name, to_address, from_address, deal_id, deal_title, mail_content,
             mail_status, created_by, created_date, modified_by, modified_date))

        connection.commit()
        print("Records inserted........")

    cr.close()
    connection.close()

except Exception as e:
    print("Error:", e)